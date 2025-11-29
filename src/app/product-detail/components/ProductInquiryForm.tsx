'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface ProductInquiryFormProps {
  productId: string;
  productName: string;
}

interface FormData {
  quantityInterest: string;
  contactPreference: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

const ProductInquiryForm = ({ productId, productName }: ProductInquiryFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    quantityInterest: '',
    contactPreference: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          productId,
          productName,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');

        // Reset form after successful submission
        setTimeout(() => {
          setSubmitStatus('idle');
          setFormData({
            quantityInterest: '',
            contactPreference: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            company: '',
            message: '',
          });
        }, 3000);
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

  if (submitStatus === 'success') {
    return (
      <div className="card p-8 text-center">
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircleIcon" size={32} className="text-success" variant="solid" />
        </div>
        <h3 className="text-xl font-semibold text-text-primary mb-2">Anfrage erfolgreich gesendet</h3>
        <p className="text-text-secondary mb-4">
          Ihre Anfrage für Artikel {productId} wurde an das zuständige Zollamt weitergeleitet. 
          Sie erhalten innerhalb von 2-3 Werktagen eine Antwort.
        </p>
        <p className="text-sm text-muted-foreground">
          Referenznummer: ZA-{productId}-{Date.now().toString().slice(-6)}
        </p>
      </div>
    );
  }

  return (
    <div className="card p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="DocumentPlusIcon" size={24} className="text-brand-primary" />
        <h3 className="text-xl font-semibold text-text-primary">Offizielle Anfrage stellen</h3>
      </div>

      {/* Important Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <Icon name="InformationCircleIcon" size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">Wichtiger Hinweis zur Lagerung und Auslieferung</h4>
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

      {/* Product Information */}
      <div className="official-id p-4 rounded-lg mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="HashtagIcon" size={16} className="text-brand-primary" />
          <span className="text-sm font-medium text-text-secondary">Artikel-ID:</span>
          <span className="font-mono text-brand-primary font-semibold">{productId}</span>
        </div>
        <p className="text-sm text-text-secondary">{productName}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h4 className="font-semibold text-text-primary flex items-center space-x-2">
            <Icon name="UserIcon" size={20} className="text-brand-primary" />
            <span>Persönliche Daten</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Vorname *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className="input official-form-input"
                placeholder="Ihr Vorname"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Nachname *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className="input official-form-input"
                placeholder="Ihr Nachname"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Unternehmen (optional)
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              className="input official-form-input"
              placeholder="Firmenname"
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <h4 className="font-semibold text-text-primary flex items-center space-x-2">
            <Icon name="PhoneIcon" size={20} className="text-brand-primary" />
            <span>Kontaktdaten</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                E-Mail-Adresse *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="input official-form-input"
                placeholder="ihre.email@beispiel.de"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Telefonnummer
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="input official-form-input"
                placeholder="+49 123 456789"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Bevorzugte Kontaktart *
            </label>
            <select
              name="contactPreference"
              value={formData.contactPreference}
              onChange={handleInputChange}
              required
              className="input official-form-input"
            >
              <option value="">Bitte wählen</option>
              <option value="email">E-Mail</option>
              <option value="phone">Telefon</option>
              <option value="both">E-Mail und Telefon</option>
            </select>
          </div>
        </div>

        {/* Purchase Details */}
        <div className="space-y-4">
          <h4 className="font-semibold text-text-primary flex items-center space-x-2">
            <Icon name="ShoppingCartIcon" size={20} className="text-brand-primary" />
            <span>Kaufinteresse</span>
          </h4>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Mengeninteresse
            </label>
            <select
              name="quantityInterest"
              value={formData.quantityInterest}
              onChange={handleInputChange}
              className="input official-form-input"
            >
              <option value="">Bitte wählen</option>
              <option value="single">Einzelstück</option>
              <option value="multiple">Mehrere Stücke</option>
              <option value="bulk">Großabnahme</option>
              <option value="negotiable">Verhandelbar</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Nachricht
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              className="input official-form-input resize-none"
              placeholder="Zusätzliche Informationen, Fragen oder spezielle Anforderungen..."
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-border">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Anfrage wird gesendet...</span>
              </>
            ) : (
              <>
                <Icon name="PaperAirplaneIcon" size={20} />
                <span>Offizielle Anfrage senden</span>
              </>
            )}
          </button>

          <p className="text-xs text-muted-foreground mt-3 text-center">
            Durch das Absenden bestätigen Sie, dass alle Angaben wahrheitsgemäß sind und 
            Sie die Datenschutzbestimmungen des Zollamts akzeptieren.
          </p>
        </div>
      </form>

      {submitStatus === 'error' && (
        <div className="mt-4 p-4 bg-error/10 border border-error/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="ExclamationTriangleIcon" size={20} className="text-error" />
            <p className="text-error font-medium">
              Fehler beim Senden der Anfrage. Bitte versuchen Sie es erneut.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductInquiryForm;