import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface FooterProps {
  className?: string;
}

const Footer = ({ className = '' }: FooterProps) => {
  return (
    <footer className={`bg-muted border-t border-border mt-auto ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2 mb-3 sm:mb-4">
              <div className="w-8 h-8 bg-brand-primary rounded flex items-center justify-center transition-transform hover:scale-110">
                <Icon name="ShieldCheckIcon" size={20} className="text-white" variant="solid" />
              </div>
              <span className="text-base sm:text-lg font-bold text-text-primary">Zoll-Abverkauf</span>
            </div>
            <p className="text-sm text-text-secondary mb-3 sm:mb-4 leading-relaxed">
              Offizielle deutsche Zoll-Liquidationsplattform für beschlagnahmte Güter.
              Nur Anfrage-Plattform - kein direkter Verkauf oder Abholung.
            </p>
            <div className="flex items-center space-x-2 text-xs text-text-secondary">
              <Icon name="InformationCircleIcon" size={16} className="flex-shrink-0" />
              <span>Staatlich zertifiziert und kontrolliert</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-3 sm:mb-4 uppercase tracking-wide">
              Kategorien
            </h3>
            <ul className="space-y-2 sm:space-y-2.5">
              <li>
                <Link
                  href="/vehicles-category"
                  className="text-sm text-text-secondary hover:text-brand-primary transition-all duration-200 hover:translate-x-1 inline-block"
                >
                  Fahrzeuge
                </Link>
              </li>
              <li>
                <Link
                  href="/precious-metals-category"
                  className="text-sm text-text-secondary hover:text-brand-primary transition-all duration-200 hover:translate-x-1 inline-block"
                >
                  Edelmetalle
                </Link>
              </li>
              <li>
                <Link
                  href="/construction-agricultural-machinery-category"
                  className="text-sm text-text-secondary hover:text-brand-primary transition-all duration-200 hover:translate-x-1 inline-block"
                >
                  Bau-/Landmaschinen
                </Link>
              </li>
              <li>
                <Link
                  href="/miscellaneous-category"
                  className="text-sm text-text-secondary hover:text-brand-primary transition-all duration-200 hover:translate-x-1 inline-block"
                >
                  Verschiedenes
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wide">
              Kontakt & Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-text-secondary hover:text-brand-primary transition-colors"
                >
                  Über uns
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-text-secondary hover:text-brand-primary transition-colors"
                >
                  Kontaktformular
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <Icon name="PhoneIcon" size={14} className="text-text-secondary" />
                <span className="text-sm text-text-secondary">+49 (0) 30 123456-0</span>
              </li>
              <li className="flex items-center space-x-2">
                <Icon name="EnvelopeIcon" size={14} className="text-text-secondary" />
                <span className="text-sm text-text-secondary">info@zoll-abverkauf.de</span>
              </li>
              <li className="flex items-center space-x-2">
                <Icon name="ClockIcon" size={14} className="text-text-secondary" />
                <span className="text-sm text-text-secondary">Mo-Fr: 9:00-17:00 Uhr</span>
              </li>
            </ul>
          </div>

          {/* Trust & Legal */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wide">
              Warum uns vertrauen?
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <Icon name="ShieldCheckIcon" size={16} className="text-success flex-shrink-0 mt-0.5" />
                <span className="text-sm text-text-secondary">Staatliche Kontrolle und Zertifizierung</span>
              </li>
              <li className="flex items-start space-x-2">
                <Icon name="DocumentCheckIcon" size={16} className="text-success flex-shrink-0 mt-0.5" />
                <span className="text-sm text-text-secondary">Vollständige Dokumentation aller Artikel</span>
              </li>
              <li className="flex items-start space-x-2">
                <Icon name="LockClosedIcon" size={16} className="text-success flex-shrink-0 mt-0.5" />
                <span className="text-sm text-text-secondary">Sichere und transparente Abwicklung</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-4 text-sm text-text-secondary">
              <span>© 2024 Zoll-Abverkauf Deutschland. Alle Rechte vorbehalten.</span>
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-6">
              <Link
                href="/impressum"
                className="text-sm text-text-secondary hover:text-brand-primary transition-colors"
              >
                Impressum
              </Link>
              <Link
                href="/datenschutz"
                className="text-sm text-text-secondary hover:text-brand-primary transition-colors"
              >
                Datenschutz
              </Link>
              <Link
                href="/agb"
                className="text-sm text-text-secondary hover:text-brand-primary transition-colors"
              >
                AGB
              </Link>
            </div>
          </div>

          {/* Government Notice */}
          <div className="mt-6 p-4 bg-brand-primary/5 rounded-lg border border-brand-primary/20">
            <div className="flex items-start space-x-3">
              <Icon name="ExclamationTriangleIcon" size={20} className="text-brand-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-text-primary mb-1">
                  Wichtiger Hinweis
                </p>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Dies ist eine offizielle Anfrage-Plattform für beschlagnahmte Güter der deutschen Zollverwaltung.
                  Kein direkter Verkauf oder Abholung möglich. Alle Transaktionen erfolgen ausschließlich über
                  autorisierte Behörden nach erfolgreichem Antragsverfahren.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;