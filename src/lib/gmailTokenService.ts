import { db } from './firebaseClient';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export interface GmailTokens {
  access_token: string;
  refresh_token: string;
  expiry_date?: number;
  token_type?: string;
  scope?: string;
  updated_at: string;
}

const TOKENS_DOC_PATH = 'settings/gmail_tokens';

/**
 * Get Gmail OAuth tokens from Firestore
 */
export async function getGmailTokens(): Promise<GmailTokens | null> {
  try {
    const docRef = doc(db, 'settings', 'gmail_tokens');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as GmailTokens;
    }
    return null;
  } catch (error) {
    console.error('Error getting Gmail tokens:', error);
    return null;
  }
}

/**
 * Save Gmail OAuth tokens to Firestore
 */
export async function saveGmailTokens(tokens: GmailTokens): Promise<boolean> {
  try {
    const docRef = doc(db, 'settings', 'gmail_tokens');
    await setDoc(docRef, {
      ...tokens,
      updated_at: new Date().toISOString(),
    });
    return true;
  } catch (error) {
    console.error('Error saving Gmail tokens:', error);
    return false;
  }
}

/**
 * Check if Gmail is connected (tokens exist)
 */
export async function isGmailConnected(): Promise<boolean> {
  const tokens = await getGmailTokens();
  return tokens !== null && !!tokens.refresh_token;
}

/**
 * Delete Gmail tokens (disconnect)
 */
export async function disconnectGmail(): Promise<boolean> {
  try {
    const docRef = doc(db, 'settings', 'gmail_tokens');
    await setDoc(docRef, { disconnected: true, updated_at: new Date().toISOString() });
    return true;
  } catch (error) {
    console.error('Error disconnecting Gmail:', error);
    return false;
  }
}

