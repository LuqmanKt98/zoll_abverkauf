'use client';

import React from 'react';
import ContactForm from './ContactForm';
import TrustSection from './TrustSection';
import ContactInfo from './ContactInfo';
import ProcessInformation from './ProcessInformation';
import Icon from '@/components/ui/AppIcon';

interface ContactInteractiveProps {
  className?: string;
}

const ContactInteractive = ({ className = '' }: ContactInteractiveProps) => {
  return (
    <div className={`min-h-screen bg-background ${className}`}>
      {/* Friendly Header Section */}
      <div className="bg-white border-b border-border mb-8 md:mb-12">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Wir helfen Ihnen gerne weiter
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Haben Sie Fragen zu unseren Angeboten oder dem Ablauf? <br className="hidden md:inline" />
            Wir sind für Sie da – telefonisch, per E-Mail oder direkt über unser Formular.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-12">
        {/* Helpful Tip Section (formerly Important Notice) */}
        <div className="mb-10 bg-blue-50/80 border border-blue-200 rounded-xl p-6 md:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row gap-5 items-start">
            <div className="flex-shrink-0 p-3 bg-white rounded-full shadow-sm text-blue-600 border border-blue-100">
              <Icon name="LightBulbIcon" size={28} variant="solid" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">Gut zu wissen</h3>
              <p className="text-blue-800 text-base md:text-lg leading-relaxed">
                Unsere Fahrzeuge und Waren lagern sicher in zentralen Depots.
                Eine persönliche Abholung ist daher nicht möglich – aber keine Sorge:
                Wir liefern alles versichert direkt zu Ihnen.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main Inquiry Form - Center Stage */}
          <div className="lg:col-span-8 order-2 lg:order-1">
            <ContactForm />
          </div>

          {/* Quick Help Sidebar */}
          <div className="lg:col-span-4 order-1 lg:order-2 space-y-6">
            {/* Direct Contact Card */}
            <div className="bg-brand-primary text-white rounded-xl shadow-md p-6 md:p-8 transform transition-transform hover:scale-[1.02]">
              <h3 className="text-xl font-bold mb-6">Direkter Kontakt</h3>
              <ul className="space-y-6">
                <li>
                  <a href="tel:+4930123456789" className="flex items-center space-x-4 group">
                    <div className="p-3 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                      <Icon name="PhoneIcon" size={24} className="text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-blue-100 mb-1">Telefonischer Support</div>
                      <div className="text-xl font-bold font-mono tracking-wide">030 / 123 456 789</div>
                      <div className="text-sm text-blue-200 mt-1">Mo-Fr, 08:00 - 16:00 Uhr</div>
                    </div>
                  </a>
                </li>
                <li className="border-t border-white/10 pt-6">
                  <a href="mailto:support@zoll-abverkauf.de" className="flex items-center space-x-4 group">
                    <div className="p-3 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                      <Icon name="EnvelopeIcon" size={24} className="text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-blue-100 mb-1">E-Mail schreiben</div>
                      <div className="text-lg font-medium break-all">support@zoll-abverkauf.de</div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>

            {/* Simple FAQ Links */}
            <div className="bg-white border border-border shadow-sm rounded-xl p-6">
              <h3 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
                <Icon name="QuestionMarkCircleIcon" size={22} className="text-brand-secondary" />
                Häufige Fragen
              </h3>
              <nav className="space-y-2">
                <a href="/vehicles-category" className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors group">
                  <span className="text-text-secondary group-hover:text-text-primary font-medium">Fragen zu Fahrzeugen</span>
                  <Icon name="ChevronRightIcon" size={16} className="text-gray-400 group-hover:text-brand-primary" />
                </a>
                <a href="/precious-metals-category" className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors group">
                  <span className="text-text-secondary group-hover:text-text-primary font-medium">Fragen zu Edelmetallen</span>
                  <Icon name="ChevronRightIcon" size={16} className="text-gray-400 group-hover:text-brand-primary" />
                </a>
                <a href="/construction-agricultural-machinery-category" className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors group">
                  <span className="text-text-secondary group-hover:text-text-primary font-medium">Fragen zu Maschinen</span>
                  <Icon name="ChevronRightIcon" size={16} className="text-gray-400 group-hover:text-brand-primary" />
                </a>
              </nav>
            </div>
          </div>
        </div>

        {/* Trust & Location Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:col-span-2">
            <TrustSection />
          </div>
        </div>

        {/* Simplified Location Info */}
        <div className="mt-12 text-center text-text-secondary">
          <p className="flex items-center justify-center gap-2">
            <Icon name="MapPinIcon" size={18} />
            <span>Haupzollamt Berlin &bull; Packhofstraße 2-6 &bull; 10178 Berlin</span>
          </p>
        </div>

      </div>
    </div>
  );
};

export default ContactInteractive;


