import { google } from 'googleapis';
import { db } from './firebaseClient';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';
const FROM_EMAIL = process.env.FROM_EMAIL || 'no-reply@zoll-abverkauf.local';

// Gmail API OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  process.env.GMAIL_REDIRECT_URI
);

interface GmailTokens {
  access_token: string;
  refresh_token: string;
  expiry_date?: number;
  token_type?: string;
  scope?: string;
}

/**
 * Get Gmail tokens from Firestore
 */
async function getGmailTokens(): Promise<GmailTokens | null> {
  try {
    const docRef = doc(db, 'settings', 'gmail_tokens');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data.refresh_token) {
        return data as GmailTokens;
      }
    }
    return null;
  } catch (error) {
    console.error('Error getting Gmail tokens:', error);
    return null;
  }
}

/**
 * Update tokens in Firestore after refresh
 */
async function updateGmailTokens(tokens: Partial<GmailTokens>): Promise<void> {
  try {
    const docRef = doc(db, 'settings', 'gmail_tokens');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await setDoc(docRef, {
        ...docSnap.data(),
        ...tokens,
        updated_at: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.error('Error updating Gmail tokens:', error);
  }
}

/**
 * Create email message in RFC 2822 format
 */
function createEmailMessage(to: string, subject: string, html: string, from: string): string {
  const messageParts = [
    `From: ${from}`,
    `To: ${to}`,
    `Subject: =?UTF-8?B?${Buffer.from(subject).toString('base64')}?=`,
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
    '',
    Buffer.from(html).toString('base64'),
  ];

  const message = messageParts.join('\r\n');
  // URL-safe base64 encoding
  return Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Send email using Gmail API
 */
async function sendEmailViaGmailAPI(to: string, subject: string, html: string): Promise<{ ok: boolean; messageId?: string; error?: string }> {
  try {
    const tokens = await getGmailTokens();
    if (!tokens) {
      return { ok: false, error: 'Gmail not connected. Please authorize Gmail in admin settings.' };
    }

    // Set credentials
    oauth2Client.setCredentials({
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expiry_date: tokens.expiry_date,
    });

    // Listen for token refresh events
    oauth2Client.on('tokens', async (newTokens) => {
      console.log('Gmail tokens refreshed');
      await updateGmailTokens({
        access_token: newTokens.access_token,
        expiry_date: newTokens.expiry_date,
      });
    });

    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    // Create the email message
    const rawMessage = createEmailMessage(to, subject, html, FROM_EMAIL);

    // Send the email
    const response = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: rawMessage,
      },
    });

    return { ok: true, messageId: response.data.id || undefined };
  } catch (error: any) {
    console.error('Gmail API error:', error);
    return { ok: false, error: error?.message || 'Failed to send email via Gmail API' };
  }
}

interface ContactInquiry {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

interface ProductInquiry extends ContactInquiry {
  productId: string;
  productName: string;
}

/**
 * Send email notification for contact form submission
 */
export async function sendContactInquiryEmail(inquiry: ContactInquiry): Promise<boolean> {
  try {
    const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #003366; color: white; padding: 20px; text-align: center; }
              .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
              .field { margin-bottom: 15px; }
              .label { font-weight: bold; color: #003366; }
              .value { margin-top: 5px; padding: 10px; background-color: white; border-left: 3px solid #003366; }
              .footer { margin-top: 20px; padding: 15px; background-color: #f0f0f0; text-align: center; font-size: 12px; color: #666; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Neue Kontaktanfrage</h1>
                <p>Zoll-Abverkauf Deutschland</p>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Name:</div>
                  <div class="value">${inquiry.name}</div>
                </div>
                <div class="field">
                  <div class="label">E-Mail:</div>
                  <div class="value"><a href="mailto:${inquiry.email}">${inquiry.email}</a></div>
                </div>
                ${inquiry.phone ? `
                <div class="field">
                  <div class="label">Telefon:</div>
                  <div class="value">${inquiry.phone}</div>
                </div>
                ` : ''}
                <div class="field">
                  <div class="label">Nachricht:</div>
                  <div class="value">${inquiry.message.replace(/\n/g, '<br>')}</div>
                </div>
                <div class="field">
                  <div class="label">Eingegangen am:</div>
                  <div class="value">${new Date().toLocaleString('de-DE')}</div>
                </div>
              </div>
              <div class="footer">
                <p>Diese E-Mail wurde automatisch vom Zoll-Abverkauf Kontaktformular gesendet.</p>
              </div>
            </div>
          </body>
        </html>
      `;

    const result = await sendEmailViaGmailAPI(
      ADMIN_EMAIL,
      `Neue Kontaktanfrage von ${inquiry.name}`,
      html
    );

    if (!result.ok) {
      console.error('Error sending contact inquiry email:', result.error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Failed to send contact inquiry email:', error);
    return false;
  }
}

/**
 * Send email notification for product inquiry submission
 */
export async function sendProductInquiryEmail(inquiry: ProductInquiry): Promise<boolean> {
  try {
    const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #003366; color: white; padding: 20px; text-align: center; }
              .product-badge { background-color: #FFD700; color: #003366; padding: 5px 15px; border-radius: 20px; display: inline-block; margin-top: 10px; font-weight: bold; }
              .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
              .field { margin-bottom: 15px; }
              .label { font-weight: bold; color: #003366; }
              .value { margin-top: 5px; padding: 10px; background-color: white; border-left: 3px solid #003366; }
              .footer { margin-top: 20px; padding: 15px; background-color: #f0f0f0; text-align: center; font-size: 12px; color: #666; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Neue Produktanfrage</h1>
                <p>Zoll-Abverkauf Deutschland</p>
                <div class="product-badge">Produkt: ${inquiry.productName}</div>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Produkt-ID:</div>
                  <div class="value">${inquiry.productId}</div>
                </div>
                <div class="field">
                  <div class="label">Produktname:</div>
                  <div class="value">${inquiry.productName}</div>
                </div>
                <hr style="margin: 20px 0; border: none; border-top: 2px solid #ddd;">
                <div class="field">
                  <div class="label">Name:</div>
                  <div class="value">${inquiry.name}</div>
                </div>
                <div class="field">
                  <div class="label">E-Mail:</div>
                  <div class="value"><a href="mailto:${inquiry.email}">${inquiry.email}</a></div>
                </div>
                ${inquiry.phone ? `
                <div class="field">
                  <div class="label">Telefon:</div>
                  <div class="value">${inquiry.phone}</div>
                </div>
                ` : ''}
                <div class="field">
                  <div class="label">Nachricht:</div>
                  <div class="value">${inquiry.message.replace(/\n/g, '<br>')}</div>
                </div>
                <div class="field">
                  <div class="label">Eingegangen am:</div>
                  <div class="value">${new Date().toLocaleString('de-DE')}</div>
                </div>
              </div>
              <div class="footer">
                <p>Diese E-Mail wurde automatisch vom Zoll-Abverkauf Produktanfrage-Formular gesendet.</p>
              </div>
            </div>
          </body>
        </html>
      `;

    const result = await sendEmailViaGmailAPI(
      ADMIN_EMAIL,
      `Neue Produktanfrage: ${inquiry.productName}`,
      html
    );

    if (!result.ok) {
      console.error('Error sending product inquiry email:', result.error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Failed to send product inquiry email:', error);
    return false;
  }
}

export async function sendAdminResponseEmail(to: string, subject: string, html: string): Promise<{ ok: boolean; provider?: 'gmail'; meta?: any; error?: string }>
{
  try {
    const result = await sendEmailViaGmailAPI(to, subject, html);

    if (!result.ok) {
      return { ok: false, error: result.error };
    }

    return {
      ok: true,
      provider: 'gmail',
      meta: {
        messageId: result.messageId,
        sentAt: new Date().toISOString()
      }
    };
  } catch (e: any) {
    return { ok: false, error: e?.message || 'Unknown error' };
  }
}

/**
 * Check if Gmail is connected and ready to send emails
 */
export async function isGmailReady(): Promise<boolean> {
  const tokens = await getGmailTokens();
  return tokens !== null && !!tokens.refresh_token;
}
