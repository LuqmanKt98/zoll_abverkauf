import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  process.env.GMAIL_REDIRECT_URI
);

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    console.error('OAuth error:', error);
    return NextResponse.redirect(
      new URL('/admin?error=oauth_denied', request.url)
    );
  }

  if (!code) {
    return NextResponse.redirect(
      new URL('/admin?error=no_code', request.url)
    );
  }

  try {
    // Exchange authorization code for tokens
    const { tokens } = await oauth2Client.getToken(code);

    if (!tokens.access_token || !tokens.refresh_token) {
      throw new Error('Failed to get tokens');
    }

    // Encode tokens in URL to be stored client-side
    // This is a workaround since we can't use Firebase Admin SDK without service account
    const tokenData = encodeURIComponent(JSON.stringify({
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expiry_date: tokens.expiry_date,
      token_type: tokens.token_type,
      scope: tokens.scope,
    }));

    console.log('Gmail tokens obtained successfully');

    // Redirect to admin with tokens to be stored client-side
    return NextResponse.redirect(
      new URL(`/admin?gmail_tokens=${tokenData}`, request.url)
    );
  } catch (err) {
    console.error('Error exchanging code for tokens:', err);
    return NextResponse.redirect(
      new URL('/admin?error=token_exchange_failed', request.url)
    );
  }
}

