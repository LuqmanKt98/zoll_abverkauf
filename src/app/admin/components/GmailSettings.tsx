'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import { db } from '@/lib/firebaseClient';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';

interface GmailStatus {
  connected: boolean;
  email?: string;
  lastUpdated?: string;
}

const GmailSettings: React.FC = () => {
  const [status, setStatus] = useState<GmailStatus>({ connected: false });
  const [loading, setLoading] = useState(true);
  const [disconnecting, setDisconnecting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    const handleUrlParams = async () => {
      const params = new URLSearchParams(window.location.search);

      // Check for tokens from OAuth callback
      const tokensParam = params.get('gmail_tokens');
      if (tokensParam) {
        try {
          const tokens = JSON.parse(decodeURIComponent(tokensParam));
          // Store tokens in Firestore
          const docRef = doc(db, 'settings', 'gmail_tokens');
          const { setDoc } = await import('firebase/firestore');
          await setDoc(docRef, {
            ...tokens,
            updated_at: new Date().toISOString(),
          });
          setMessage({ type: 'success', text: 'Gmail erfolgreich verbunden!' });
          checkGmailStatus();
        } catch (e) {
          console.error('Error storing tokens:', e);
          setMessage({ type: 'error', text: 'Fehler beim Speichern der Tokens' });
        }
        // Clean URL
        window.history.replaceState({}, '', '/admin');
        return;
      }

      // Check for error from OAuth callback
      if (params.get('error')) {
        const error = params.get('error');
        let errorText = 'Fehler bei der Gmail-Verbindung';
        if (error === 'oauth_denied') errorText = 'Gmail-Autorisierung wurde abgelehnt';
        if (error === 'token_exchange_failed') errorText = 'Token-Austausch fehlgeschlagen';
        setMessage({ type: 'error', text: errorText });
        window.history.replaceState({}, '', '/admin');
      }
    };

    checkGmailStatus();
    handleUrlParams();
  }, []);

  const checkGmailStatus = async () => {
    try {
      const docRef = doc(db, 'settings', 'gmail_tokens');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.refresh_token && !data.disconnected) {
          setStatus({
            connected: true,
            lastUpdated: data.updated_at,
          });
        } else {
          setStatus({ connected: false });
        }
      } else {
        setStatus({ connected: false });
      }
    } catch (error) {
      console.error('Error checking Gmail status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = () => {
    // Redirect to Gmail authorization endpoint
    window.location.href = '/api/auth/gmail/authorize';
  };

  const handleDisconnect = async () => {
    if (!confirm('Möchten Sie Gmail wirklich trennen? E-Mail-Versand wird nicht mehr funktionieren.')) {
      return;
    }
    
    setDisconnecting(true);
    try {
      const docRef = doc(db, 'settings', 'gmail_tokens');
      await deleteDoc(docRef);
      setStatus({ connected: false });
      setMessage({ type: 'success', text: 'Gmail wurde getrennt' });
    } catch (error) {
      console.error('Error disconnecting Gmail:', error);
      setMessage({ type: 'error', text: 'Fehler beim Trennen von Gmail' });
    } finally {
      setDisconnecting(false);
    }
  };

  const handleTestEmail = async () => {
    setMessage(null);
    try {
      const response = await fetch('/api/email-dispatch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'luqman.haider01@gmail.com',
          subject: 'Test E-Mail von Zoll-Abverkauf',
          html: `<h1>Test E-Mail</h1><p>Diese E-Mail wurde am ${new Date().toLocaleString('de-DE')} gesendet.</p>`,
        }),
      });
      
      const data = await response.json();
      if (data.ok) {
        setMessage({ type: 'success', text: 'Test-E-Mail erfolgreich gesendet!' });
      } else {
        setMessage({ type: 'error', text: data.error || 'Fehler beim Senden der Test-E-Mail' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Netzwerkfehler beim Senden der Test-E-Mail' });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-text-primary">Gmail-Einstellungen</h2>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
          status.connected 
            ? 'bg-green-100 text-green-800' 
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {status.connected ? 'Verbunden' : 'Nicht verbunden'}
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-lg ${
          message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          <div className="flex items-center space-x-2">
            <Icon name={message.type === 'success' ? 'CheckCircleIcon' : 'XCircleIcon'} size={20} />
            <span>{message.text}</span>
          </div>
        </div>
      )}

      <div className="bg-muted rounded-lg p-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
            <Icon name="EnvelopeIcon" size={24} className="text-brand-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-text-primary">Gmail API Integration</h3>
            <p className="text-sm text-text-secondary mt-1">
              Verbinden Sie Ihr Gmail-Konto, um E-Mails an Kunden zu senden.
            </p>
            {status.connected && status.lastUpdated && (
              <p className="text-xs text-text-secondary mt-2">
                Zuletzt aktualisiert: {new Date(status.lastUpdated).toLocaleString('de-DE')}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        {!status.connected ? (
          <button
            onClick={handleConnect}
            className="flex items-center space-x-2 px-6 py-3 bg-brand-primary text-white rounded-lg hover:bg-brand-primary/90 transition-colors"
          >
            <Icon name="LinkIcon" size={20} />
            <span>Gmail verbinden</span>
          </button>
        ) : (
          <>
            <button
              onClick={handleTestEmail}
              className="flex items-center space-x-2 px-6 py-3 bg-brand-primary text-white rounded-lg hover:bg-brand-primary/90 transition-colors"
            >
              <Icon name="PaperAirplaneIcon" size={20} />
              <span>Test-E-Mail senden</span>
            </button>
            <button
              onClick={handleDisconnect}
              disabled={disconnecting}
              className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              <Icon name="XMarkIcon" size={20} />
              <span>{disconnecting ? 'Trennen...' : 'Gmail trennen'}</span>
            </button>
          </>
        )}
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="InformationCircleIcon" size={20} className="text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-medium">Hinweis zur Gmail-Verbindung:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Sie werden zu Google weitergeleitet, um die Berechtigung zu erteilen</li>
              <li>Die App benötigt Zugriff zum Senden von E-Mails</li>
              <li>Ihre Anmeldedaten werden sicher in Firebase gespeichert</li>
              <li>Sie können die Verbindung jederzeit trennen</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GmailSettings;

