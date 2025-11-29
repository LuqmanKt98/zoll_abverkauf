import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface TrustFeature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

interface TrustSectionProps {
  className?: string;
}

const TrustSection = ({ className = '' }: TrustSectionProps) => {
  const trustFeatures: TrustFeature[] = [
    {
      id: '1',
      icon: 'ShieldCheckIcon',
      title: 'Staatliche Autorisierung',
      description: 'Offiziell vom Deutschen Zollamt autorisierte Verkaufsplattform mit vollständiger rechtlicher Absicherung.'
    },
    {
      id: '2',
      icon: 'DocumentCheckIcon',
      title: 'Authentizität garantiert',
      description: 'Jeder Artikel wird mit offizieller Dokumentation und Echtheitszertifikat geliefert.'
    },
    {
      id: '3',
      icon: 'LockClosedIcon',
      title: 'Sichere Abwicklung',
      description: 'Rechtssichere Transaktionen nach deutschen Gesetzen mit vollständiger Transparenz.'
    },
    {
      id: '4',
      icon: 'ClipboardDocumentCheckIcon',
      title: 'Vollständige Dokumentation',
      description: 'Lückenlose Herkunftsnachweise und offizielle Beschlagnahmungsdokumentation.'
    },
    {
      id: '5',
      icon: 'UserGroupIcon',
      title: 'Professionelle Beratung',
      description: 'Erfahrene Zollexperten stehen für Fragen zur Verfügung und unterstützen beim Kaufprozess.'
    },
    {
      id: '6',
      icon: 'CurrencyEuroIcon',
      title: 'Faire Bewertung',
      description: 'Professionelle Wertermittlung durch zertifizierte Sachverständige für transparente Preisgestaltung.'
    }
  ];

  return (
    <section className={`py-20 bg-background ${className}`}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-trust/10 rounded-full px-4 py-2 mb-4">
            <Icon name="ShieldCheckIcon" size={20} className="text-trust" variant="solid" />
            <span className="text-trust font-medium text-sm">Vertrauen & Sicherheit</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Warum Zoll-Abverkauf?
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Als offiziell autorisierte Plattform des Deutschen Zollamts bieten wir Ihnen höchste Sicherheit, 
            Authentizität und Transparenz bei allen Transaktionen.
          </p>
        </div>

        {/* Trust Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trustFeatures.map((feature) => (
            <div key={feature.id} className="text-center group">
              {/* Icon Container */}
              <div className="w-16 h-16 bg-trust/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-trust/20 transition-colors duration-300">
                <Icon 
                  name={feature.icon as any} 
                  size={32} 
                  className="text-trust" 
                  variant="solid" 
                />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-text-primary mb-3">
                {feature.title}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Official Certification */}
        <div className="mt-16 bg-gradient-to-r from-brand-primary/5 to-brand-secondary/5 rounded-2xl p-8 lg:p-12">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0 lg:space-x-8">
            <div className="flex-1 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start space-x-3 mb-4">
                <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center official-badge">
                  <Icon name="BuildingOffice2Icon" size={24} className="text-white" variant="solid" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary">Deutsches Zollamt</h3>
                  <p className="text-sm text-text-secondary">Offiziell autorisiert</p>
                </div>
              </div>
              <p className="text-text-secondary leading-relaxed">
                Diese Plattform wird vom Deutschen Zollamt betrieben und unterliegt strengen 
                staatlichen Kontrollen. Alle Transaktionen sind rechtssicher und vollständig dokumentiert.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="text-center bg-white rounded-lg px-6 py-4 shadow-sm">
                <div className="text-2xl font-bold text-brand-primary">500+</div>
                <div className="text-sm text-text-secondary">Erfolgreiche Verkäufe</div>
              </div>
              <div className="text-center bg-white rounded-lg px-6 py-4 shadow-sm">
                <div className="text-2xl font-bold text-brand-primary">€2.5M+</div>
                <div className="text-sm text-text-secondary">Gesamtvolumen</div>
              </div>
              <div className="text-center bg-white rounded-lg px-6 py-4 shadow-sm">
                <div className="text-2xl font-bold text-brand-primary">100%</div>
                <div className="text-sm text-text-secondary">Rechtssicher</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;