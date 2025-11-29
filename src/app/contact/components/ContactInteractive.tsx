'use client';

import React from 'react';
import ContactForm from './ContactForm';
import TrustSection from './TrustSection';
import ContactInfo from './ContactInfo';
import ProcessInformation from './ProcessInformation';

interface ContactInteractiveProps {
  className?: string;
}

const ContactInteractive = ({ className = '' }: ContactInteractiveProps) => {
  return (
    <div className={`min-h-screen bg-background ${className}`}>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-text-primary mb-4">Kontakt & Support</h1>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Nehmen Sie Kontakt mit dem offiziellen Zoll-Abverkauf auf. Wir stehen Ihnen für alle Fragen 
            rund um unsere Liquidationsverfahren und verfügbaren Produkte zur Verfügung.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Contact Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          {/* Right Column - Contact Info */}
          <div className="lg:col-span-1">
            <ContactInfo />
          </div>
        </div>

        {/* Trust Section */}
        <div className="mt-12">
          <TrustSection />
        </div>

        {/* Process Information */}
        <div className="mt-12">
          <ProcessInformation />
        </div>

        {/* Additional Information */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Location Map */}
          <div className="card p-6">
            <h3 className="text-lg font-bold text-text-primary mb-4">Standort Berlin</h3>
            <div className="w-full h-64 rounded-lg overflow-hidden border border-border">
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                title="Hauptzollamt Berlin"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=52.5200,13.4050&z=14&output=embed"
                className="border-0">
              </iframe>
            </div>
            <div className="mt-4 text-sm text-text-secondary">
              <p className="font-medium text-text-primary">Hauptzollamt Berlin</p>
              <p>Packhofstraße 2-6</p>
              <p>10178 Berlin, Deutschland</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="card p-6">
            <h3 className="text-lg font-bold text-text-primary mb-4">Schnellzugriff</h3>
            <div className="space-y-3">
              <a 
                href="/homepage" 
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors duration-200"
              >
                <div className="font-medium text-text-primary">Zur Startseite</div>
                <div className="text-sm text-text-secondary">Übersicht aller Kategorien</div>
              </a>
              <a 
                href="/vehicles-category" 
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors duration-200"
              >
                <div className="font-medium text-text-primary">Fahrzeuge</div>
                <div className="text-sm text-text-secondary">PKW, LKW und Motorräder</div>
              </a>
              <a 
                href="/precious-metals-category" 
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors duration-200"
              >
                <div className="font-medium text-text-primary">Edelmetalle</div>
                <div className="text-sm text-text-secondary">Gold, Silber und Schmuck</div>
              </a>
              <a 
                href="/construction-agricultural-machinery-category" 
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors duration-200"
              >
                <div className="font-medium text-text-primary">Maschinen</div>
                <div className="text-sm text-text-secondary">Bau- und Landmaschinen</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInteractive;
