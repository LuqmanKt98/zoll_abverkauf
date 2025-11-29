'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface ContactFormData {
  inquiryType: string;
  productId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  agreeToTerms: boolean;
}

interface ContactFormProps {
  className?: string;
}

const ContactForm = ({ className = '' }: ContactFormProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    inquiryType: '',
    productId: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    agreeToTerms: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const inquiryTypes = [
    { value: 'general', label: 'Allgemeine Anfrage' },
    { value: 'product', label: 'Produktanfrage' },
    { value: 'process', label: 'Verfahrensfragen' },
    { value: 'technical', label: 'Technischer Support' },
    { value: 'legal', label: 'Rechtliche Fragen' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isHydrated) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          inquiryType: formData.inquiryType,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');

        // Reset form after successful submission
        setFormData({
          inquiryType: '',
          productId: '',
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          company: '',
          subject: '',
          message: '',
          agreeToTerms: false
        });
      } else {
        setSubmitStatus('error');
        console.error('Form submission error:', data.error);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isHydrated) {
    return (
      <div className={`card p-8 ${className}`}>
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded mb-6"></div>
          <div className="space-y-4">
            <div className="h-10 bg-muted rounded"></div>
            <div className="h-10 bg-muted rounded"></div>
            <div className="h-10 bg-muted rounded"></div>
            <div className="h-32 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`card p-8 ${className}`}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-text-primary mb-2">Kontaktformular</h2>
        <p className="text-text-secondary">
          Nutzen Sie dieses Formular für Ihre Anfragen. Wir bearbeiten alle Eingaben gemäß den offiziellen Zollverfahren.
        </p>
      </div>

      {/* Important Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <Icon name="InformationCircleIcon" size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">Wichtiger Hinweis</h4>
            <p className="text-blue-800 text-sm leading-relaxed">
              Bitte beachten Sie: Eine persönliche Besichtigung oder Abholung der Artikel ist nicht möglich. 
              Alle Vermögenswerte befinden sich in zentralen Verwahrungs- und Zollstandorten, die für den 
              Publikumsverkehr nicht zugänglich sind. Diese Maßnahme dient der Sicherheit, der Versicherung 
              des Warenwerts und der ordnungsgemäßen Verwaltung der Bestände. Nach Zahlungseingang erfolgt 
              die Auslieferung ausschließlich über zugelassene, versicherte Logistik- oder Werttransportdienstleister.
            </p>
          </div>
        </div>
      </div>

      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-success/10 border border-success/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircleIcon" size={20} className="text-success" variant="solid" />
            <span className="text-success font-medium">
              Ihre Anfrage wurde erfolgreich übermittelt. Sie erhalten innerhalb von 2 Werktagen eine Antwort.
            </span>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="ExclamationCircleIcon" size={20} className="text-error" variant="solid" />
            <span className="text-error font-medium">
              Fehler beim Senden der Anfrage. Bitte versuchen Sie es erneut oder kontaktieren Sie uns telefonisch.
            </span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Inquiry Type */}
        <div>
          <label htmlFor="inquiryType" className="block text-sm font-medium text-text-primary mb-2">
            Art der Anfrage *
          </label>
          <select
            id="inquiryType"
            name="inquiryType"
            value={formData.inquiryType}
            onChange={handleInputChange}
            required
            className="input w-full official-form-input"
          >
            <option value="">Bitte wählen Sie eine Kategorie</option>
            {inquiryTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Product ID (conditional) */}
        {formData.inquiryType === 'product' && (
          <div>
            <label htmlFor="productId" className="block text-sm font-medium text-text-primary mb-2">
              Produkt-ID (optional)
            </label>
            <input
              type="text"
              id="productId"
              name="productId"
              value={formData.productId}
              onChange={handleInputChange}
              placeholder="z.B. ZA-2024-001234"
              className="input w-full official-form-input"
            />
            <p className="text-xs text-text-muted mt-1">
              Falls Sie sich für ein spezifisches Produkt interessieren, geben Sie hier die Produkt-ID an.
            </p>
          </div>
        )}

        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-text-primary mb-2">
              Vorname *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              className="input w-full official-form-input"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-text-primary mb-2">
              Nachname *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              className="input w-full official-form-input"
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
              E-Mail-Adresse *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="input w-full official-form-input"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-text-primary mb-2">
              Telefonnummer
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="input w-full official-form-input"
            />
          </div>
        </div>

        {/* Company (optional) */}
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-text-primary mb-2">
            Unternehmen (optional)
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            className="input w-full official-form-input"
          />
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-text-primary mb-2">
            Betreff *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            required
            className="input w-full official-form-input"
          />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-2">
            Nachricht *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            rows={6}
            className="input w-full official-form-input resize-none"
            placeholder="Beschreiben Sie Ihr Anliegen detailliert..."
          />
        </div>

        {/* Terms Agreement */}
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="agreeToTerms"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleInputChange}
            required
            className="mt-1 h-4 w-4 text-brand-primary border-border rounded focus:ring-brand-primary"
          />
          <label htmlFor="agreeToTerms" className="text-sm text-text-secondary">
            Ich stimme der Verarbeitung meiner Daten gemäß der{' '}
            <span className="text-brand-primary hover:underline cursor-pointer">Datenschutzerklärung</span>{' '}
            zu und bestätige, dass alle Angaben wahrheitsgemäß sind. *
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting || !formData.agreeToTerms}
            className="btn-primary w-full md:w-auto px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                <span>Wird gesendet...</span>
              </>
            ) : (
              <>
                <Icon name="PaperAirplaneIcon" size={16} />
                <span>Anfrage senden</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;