'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import GmailSettings from './GmailSettings';
import { auth } from '@/lib/firebaseClient';
import {
  updatePassword,
  updateEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
  verifyBeforeUpdateEmail
} from 'firebase/auth';
import { toast } from 'sonner';

const AdminSettings: React.FC = () => {
  // Current user info
  const [currentEmail, setCurrentEmail] = useState('');

  // Email change state
  const [newEmail, setNewEmail] = useState('');
  const [emailPassword, setEmailPassword] = useState('');
  const [isChangingEmail, setIsChangingEmail] = useState(false);
  const [showEmailPassword, setShowEmailPassword] = useState(false);

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  useEffect(() => {
    if (auth.currentUser?.email) {
      setCurrentEmail(auth.currentUser.email);
    }
  }, []);

  // Email change handler
  const handleEmailChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newEmail || !newEmail.includes('@')) {
      toast.error('Bitte geben Sie eine gültige E-Mail-Adresse ein');
      return;
    }

    if (!emailPassword) {
      toast.error('Bitte geben Sie Ihr Passwort zur Bestätigung ein');
      return;
    }

    setIsChangingEmail(true);
    try {
      const user = auth.currentUser;
      if (!user || !user.email) {
        throw new Error('Benutzer nicht angemeldet');
      }

      // Re-authenticate user first
      const credential = EmailAuthProvider.credential(user.email, emailPassword);
      await reauthenticateWithCredential(user, credential);

      // Send verification email to new address first, then update
      await verifyBeforeUpdateEmail(user, newEmail);

      toast.success('Bestätigungs-E-Mail wurde an die neue Adresse gesendet. Bitte bestätigen Sie die Änderung.');
      setNewEmail('');
      setEmailPassword('');
    } catch (error: any) {
      console.error('Email change error:', error);
      if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        toast.error('Das Passwort ist falsch');
      } else if (error.code === 'auth/invalid-email') {
        toast.error('Die E-Mail-Adresse ist ungültig');
      } else if (error.code === 'auth/email-already-in-use') {
        toast.error('Diese E-Mail-Adresse wird bereits verwendet');
      } else if (error.code === 'auth/requires-recent-login') {
        toast.error('Bitte melden Sie sich erneut an und versuchen Sie es nochmal');
      } else {
        toast.error('Fehler beim Ändern der E-Mail-Adresse: ' + (error.message || 'Unbekannter Fehler'));
      }
    } finally {
      setIsChangingEmail(false);
    }
  };

  // Password change handler
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error('Neue Passwörter stimmen nicht überein');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('Das neue Passwort muss mindestens 6 Zeichen haben');
      return;
    }

    setIsChangingPassword(true);
    try {
      const user = auth.currentUser;
      if (!user || !user.email) {
        throw new Error('Benutzer nicht angemeldet');
      }

      // Re-authenticate user first
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);

      // Update password
      await updatePassword(user, newPassword);

      toast.success('Passwort erfolgreich geändert');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      console.error('Password change error:', error);
      if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        toast.error('Das aktuelle Passwort ist falsch');
      } else if (error.code === 'auth/weak-password') {
        toast.error('Das neue Passwort ist zu schwach');
      } else if (error.code === 'auth/requires-recent-login') {
        toast.error('Bitte melden Sie sich erneut an und versuchen Sie es nochmal');
      } else {
        toast.error('Fehler beim Ändern des Passworts: ' + (error.message || 'Unbekannter Fehler'));
      }
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Account Overview */}
      <div className="bg-gradient-to-r from-brand-primary to-brand-primary/80 rounded-lg p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <Icon name="UserCircleIcon" size={40} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Administrator-Konto</h2>
            <p className="text-white/80">{currentEmail}</p>
            <p className="text-sm text-white/60 mt-1">Angemeldet seit: {new Date().toLocaleDateString('de-DE')}</p>
          </div>
        </div>
      </div>

      {/* Email Change Section */}
      <div className="bg-white border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Icon name="EnvelopeIcon" size={20} className="text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-text-primary">E-Mail-Adresse ändern</h2>
            <p className="text-sm text-text-secondary">Aktuelle E-Mail: {currentEmail}</p>
          </div>
        </div>

        <form onSubmit={handleEmailChange} className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Neue E-Mail-Adresse
            </label>
            <div className="relative">
              <Icon name="EnvelopeIcon" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="neue-email@beispiel.de"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Passwort zur Bestätigung
            </label>
            <div className="relative">
              <Icon name="LockClosedIcon" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                type={showEmailPassword ? 'text' : 'password'}
                value={emailPassword}
                onChange={(e) => setEmailPassword(e.target.value)}
                required
                className="w-full pl-10 pr-10 py-2 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ihr aktuelles Passwort"
              />
              <button
                type="button"
                onClick={() => setShowEmailPassword(!showEmailPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary"
              >
                <Icon name={showEmailPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={18} />
              </button>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-3 flex items-start space-x-2">
            <Icon name="InformationCircleIcon" size={18} className="text-blue-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-blue-800">
              Nach der Änderung erhalten Sie eine Bestätigungs-E-Mail an die neue Adresse.
            </p>
          </div>

          <button
            type="submit"
            disabled={isChangingEmail}
            className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <Icon name="EnvelopeIcon" size={18} />
            <span>{isChangingEmail ? 'Wird geändert...' : 'E-Mail ändern'}</span>
          </button>
        </form>
      </div>

      {/* Password Change Section */}
      <div className="bg-white border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
            <Icon name="KeyIcon" size={20} className="text-amber-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-text-primary">Passwort ändern</h2>
            <p className="text-sm text-text-secondary">Verwenden Sie ein sicheres Passwort</p>
          </div>
        </div>

        <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Aktuelles Passwort
            </label>
            <div className="relative">
              <Icon name="LockClosedIcon" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className="w-full pl-10 pr-10 py-2 border border-border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary"
              >
                <Icon name={showCurrentPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={18} />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Neues Passwort
            </label>
            <div className="relative">
              <Icon name="KeyIcon" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={6}
                className="w-full pl-10 pr-10 py-2 border border-border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Mindestens 6 Zeichen"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary"
              >
                <Icon name={showNewPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={18} />
              </button>
            </div>
            {newPassword && (
              <div className="mt-2">
                <div className="flex items-center space-x-2">
                  <div className={`h-1 flex-1 rounded ${newPassword.length >= 6 ? 'bg-green-500' : 'bg-red-500'}`} />
                  <div className={`h-1 flex-1 rounded ${newPassword.length >= 8 ? 'bg-green-500' : 'bg-gray-200'}`} />
                  <div className={`h-1 flex-1 rounded ${newPassword.length >= 12 ? 'bg-green-500' : 'bg-gray-200'}`} />
                </div>
                <p className="text-xs text-text-secondary mt-1">
                  Stärke: {newPassword.length < 6 ? 'Zu kurz' : newPassword.length < 8 ? 'Schwach' : newPassword.length < 12 ? 'Mittel' : 'Stark'}
                </p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Neues Passwort bestätigen
            </label>
            <div className="relative">
              <Icon name="KeyIcon" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full pl-10 pr-10 py-2 border border-border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Passwort wiederholen"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary"
              >
                <Icon name={showConfirmPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={18} />
              </button>
            </div>
            {confirmPassword && newPassword !== confirmPassword && (
              <p className="text-xs text-red-500 mt-1 flex items-center space-x-1">
                <Icon name="XCircleIcon" size={14} />
                <span>Passwörter stimmen nicht überein</span>
              </p>
            )}
            {confirmPassword && newPassword === confirmPassword && (
              <p className="text-xs text-green-500 mt-1 flex items-center space-x-1">
                <Icon name="CheckCircleIcon" size={14} />
                <span>Passwörter stimmen überein</span>
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isChangingPassword || newPassword !== confirmPassword}
            className="flex items-center space-x-2 px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50"
          >
            <Icon name="KeyIcon" size={18} />
            <span>{isChangingPassword ? 'Wird gespeichert...' : 'Passwort ändern'}</span>
          </button>
        </form>
      </div>

      {/* Gmail Settings Section */}
      <div className="bg-white border border-border rounded-lg p-6">
        <GmailSettings />
      </div>

      {/* Security Tips */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-slate-200 rounded-lg flex items-center justify-center">
            <Icon name="ShieldCheckIcon" size={20} className="text-slate-600" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary">Sicherheitstipps</h3>
        </div>
        <ul className="space-y-2 text-sm text-text-secondary">
          <li className="flex items-start space-x-2">
            <Icon name="CheckIcon" size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
            <span>Verwenden Sie ein Passwort mit mindestens 12 Zeichen</span>
          </li>
          <li className="flex items-start space-x-2">
            <Icon name="CheckIcon" size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
            <span>Kombinieren Sie Groß-/Kleinbuchstaben, Zahlen und Sonderzeichen</span>
          </li>
          <li className="flex items-start space-x-2">
            <Icon name="CheckIcon" size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
            <span>Verwenden Sie nicht das gleiche Passwort für mehrere Konten</span>
          </li>
          <li className="flex items-start space-x-2">
            <Icon name="CheckIcon" size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
            <span>Ändern Sie Ihr Passwort regelmäßig (alle 3-6 Monate)</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSettings;

