'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { adminAuth } from '@/lib/firebaseAuth';

interface AdminLoginProps {
  onLogin: (email: string, password: string) => Promise<boolean>;
}

const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await onLogin(email, password);
      if (!success) {
        setError('Ungültige Anmeldedaten. Bitte versuchen Sie es erneut.');
      }
    } catch (err: any) {
      setError(err.message || 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="pt-32 pb-16 w-full max-w-md mx-auto px-6">
        <div className="bg-white rounded-lg border border-border shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="ShieldCheckIcon" size={32} className="text-white" variant="solid" />
            </div>
            <h1 className="text-2xl font-bold text-text-primary">Admin-Bereich</h1>
            <p className="text-text-secondary mt-2">
              Geschützter Zugang für Produkt-Upload
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                E-Mail-Adresse
              </label>
              <div className="relative">
                <Icon
                  name="EnvelopeIcon"
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
                />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                  placeholder="admin@zoll-abverkauf.de"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
                Passwort
              </label>
              <div className="relative">
                <Icon 
                  name="LockClosedIcon" 
                  size={20} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-12 py-3 border border-border rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                  placeholder="Geben Sie Ihr Passwort ein"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors"
                >
                  <Icon 
                    name={showPassword ? "EyeSlashIcon" : "EyeIcon"} 
                    size={20} 
                  />
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <Icon name="ExclamationCircleIcon" size={16} className="text-red-600" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !email || !password}
              className="w-full bg-brand-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-brand-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Anmeldung läuft...</span>
                </>
              ) : (
                <>
                  <Icon name="ArrowRightOnRectangleIcon" size={20} />
                  <span>Login</span>
                </>
              )}
            </button>
          </form>

          {/* Security Info */}
          <div className="mt-8 pt-6 border-t border-border">
            <div className="flex items-center justify-center space-x-4 text-xs text-text-secondary">
              <div className="flex items-center space-x-1">
                <Icon name="ShieldCheckIcon" size={14} className="text-trust" variant="solid" />
                <span>Sicher</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="LockClosedIcon" size={14} className="text-trust" variant="solid" />
                <span>Verschlüsselt</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="FirebaseIcon" size={14} className="text-trust" />
                <span>Firebase Auth</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;