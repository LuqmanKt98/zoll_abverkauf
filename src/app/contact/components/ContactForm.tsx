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
          company: formData.company,
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
    <div className={`card p-6 md:p-8 bg-white border border-border shadow-sm rounded-xl ${className}`}>
      <div className="mb-8 border-b border-border pb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
          Kontaktformular
        </h2>
        <p className="text-base md:text-lg text-text-secondary leading-relaxed">
          Bitte füllen Sie die Felder unten aus. Felder mit einem <span className="text-brand-primary font-bold">*</span> sind Pflichtfelder.
        </p>
      </div>

      {submitStatus === 'success' && (
        <div className="mb-8 p-6 bg-green-50 border-2 border-green-200 rounded-xl animate-fade-in flex items-start gap-4 shadow-sm">
          <div className="flex-shrink-0 p-1 bg-green-100 rounded-full text-green-700">
            <Icon name="CheckCircleIcon" size={32} variant="solid" />
          </div>
          <div>
            <h3 className="font-bold text-green-900 text-xl mb-2">Gesendet!</h3>
            <p className="text-green-800 text-lg">
              Wir haben Ihre Nachricht erhalten. Unser Team meldet sich in Kürze bei Ihnen.
            </p>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-8 p-6 bg-red-50 border-2 border-red-200 rounded-xl animate-fade-in flex items-start gap-4">
          <Icon name="ExclamationCircleIcon" size={32} className="text-red-600 flex-shrink-0" variant="solid" />
          <div>
            <h3 className="font-bold text-red-900 text-xl mb-2">Ein Fehler ist aufgetreten</h3>
            <p className="text-red-800 text-lg">
              Das hat leider nicht geklappt. Bitte rufen Sie uns an oder versuchen Sie es später noch einmal.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* Topic Selection */}
        <div className="space-y-3">
          <label htmlFor="inquiryType" className="block text-lg font-bold text-gray-900">
            Worum geht es? <span className="text-brand-primary">*</span>
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
              <Icon name="InformationCircleIcon" size={24} />
            </div>
            <select
              id="inquiryType"
              name="inquiryType"
              value={formData.inquiryType}
              onChange={handleInputChange}
              required
              className="w-full appearance-none bg-gray-50 border-2 border-gray-200 hover:border-brand-primary/50 focus:border-brand-primary rounded-xl pl-14 pr-12 py-4 text-lg text-gray-900 focus:ring-4 focus:ring-brand-primary/20 outline-none transition-all cursor-pointer"
            >
              <option value="">Bitte auswählen...</option>
              {inquiryTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
              <Icon name="ChevronDownIcon" size={24} />
            </div>
          </div>
        </div>

        {/* Product ID (conditional) */}
        <div className={`transition-all duration-300 overflow-hidden ${formData.inquiryType === 'product' ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="space-y-3 p-4 bg-muted/30 rounded-xl border border-border/50">
            <label htmlFor="productId" className="block text-lg font-bold text-gray-900">
              Produkt-ID / Nummer
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                <Icon name="HashtagIcon" size={20} />
              </div>
              <input
                type="text"
                id="productId"
                name="productId"
                value={formData.productId}
                onChange={handleInputChange}
                placeholder="z.B. 12345"
                className="w-full bg-white border-2 border-gray-200 rounded-lg pl-12 pr-4 py-3 text-lg focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/20 outline-none"
              />
            </div>
            <p className="text-sm text-gray-600">Die Nummer finden Sie im Titel des Angebots.</p>
          </div>
        </div>

        {/* Personal Details Section */}
        <div className="space-y-6 pt-4">
          <h3 className="text-xl font-bold text-brand-primary border-b border-border pb-2">Ihre Kontaktdaten</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label htmlFor="firstName" className="block text-lg font-bold text-gray-900">
                Vorname <span className="text-brand-primary">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Icon name="UserIcon" size={24} />
                </div>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-50 border-2 border-gray-200 hover:border-gray-300 focus:border-brand-primary rounded-xl pl-14 pr-4 py-4 text-lg text-gray-900 focus:ring-4 focus:ring-brand-primary/20 outline-none transition-all placeholder:text-gray-400"
                  placeholder="Max"
                />
              </div>
            </div>
            <div className="space-y-3">
              <label htmlFor="lastName" className="block text-lg font-bold text-gray-900">
                Nachname <span className="text-brand-primary">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Icon name="UserIcon" size={24} />
                </div>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-50 border-2 border-gray-200 hover:border-gray-300 focus:border-brand-primary rounded-xl pl-14 pr-4 py-4 text-lg text-gray-900 focus:ring-4 focus:ring-brand-primary/20 outline-none transition-all placeholder:text-gray-400"
                  placeholder="Mustermann"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label htmlFor="email" className="block text-lg font-bold text-gray-900">
                E-Mail-Adresse <span className="text-brand-primary">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Icon name="EnvelopeIcon" size={24} />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-50 border-2 border-gray-200 hover:border-gray-300 focus:border-brand-primary rounded-xl pl-14 pr-4 py-4 text-lg text-gray-900 focus:ring-4 focus:ring-brand-primary/20 outline-none transition-all placeholder:text-gray-400"
                  placeholder="name@beispiel.de"
                />
              </div>
            </div>
            <div className="space-y-3">
              <label htmlFor="phone" className="block text-lg font-bold text-gray-900">
                Telefonnummer <span className="text-sm font-normal text-gray-500">(Optional)</span>
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Icon name="PhoneIcon" size={24} />
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-gray-50 border-2 border-gray-200 hover:border-gray-300 focus:border-brand-primary rounded-xl pl-14 pr-4 py-4 text-lg text-gray-900 focus:ring-4 focus:ring-brand-primary/20 outline-none transition-all placeholder:text-gray-400"
                  placeholder="0170 1234567"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Message Section */}
        <div className="space-y-6 pt-4">
          <h3 className="text-xl font-bold text-brand-primary border-b border-border pb-2">Ihre Nachricht</h3>

          <div className="space-y-3">
            <label htmlFor="subject" className="block text-lg font-bold text-gray-900">
              Betreff <span className="text-brand-primary">*</span>
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
              className="w-full bg-gray-50 border-2 border-gray-200 hover:border-gray-300 focus:border-brand-primary rounded-xl px-4 py-4 text-lg text-gray-900 focus:ring-4 focus:ring-brand-primary/20 outline-none transition-all"
              placeholder="Kurze Zusammenfassung"
            />
          </div>

          <div className="space-y-3">
            <label htmlFor="message" className="block text-lg font-bold text-gray-900">
              Nachricht <span className="text-brand-primary">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={6}
              className="w-full bg-gray-50 border-2 border-gray-200 hover:border-gray-300 focus:border-brand-primary rounded-xl px-4 py-4 text-lg text-gray-900 focus:ring-4 focus:ring-brand-primary/20 outline-none transition-all resize-y min-h-[150px]"
              placeholder="Schreiben Sie hier Ihre Frage..."
            />
          </div>
        </div>

        {/* Terms Agreement */}
        <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100">
          <div className="flex items-start space-x-4">
            <div className="flex items-center h-8">
              <input
                type="checkbox"
                id="agreeToTerms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                required
                className="w-6 h-6 text-brand-primary border-2 border-gray-300 rounded focus:ring-brand-primary cursor-pointer"
              />
            </div>
            <label htmlFor="agreeToTerms" className="text-lg text-gray-700 cursor-pointer select-none leading-relaxed">
              Ich stimme zu, dass meine Daten zur Bearbeitung meiner Anfrage gespeichert werden. <span className="text-brand-primary font-bold">*</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting || !formData.agreeToTerms}
            className="w-full bg-brand-primary hover:bg-brand-secondary text-white font-bold text-xl py-5 px-8 rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center space-x-3"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-3 border-white border-t-transparent"></div>
                <span>Wird gesendet...</span>
              </>
            ) : (
              <>
                <Icon name="PaperAirplaneIcon" size={24} />
                <span>Nachricht absenden</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;