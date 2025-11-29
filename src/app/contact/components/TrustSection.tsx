import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface TrustSectionProps {
  className?: string;
}

const TrustSection = ({ className = '' }: TrustSectionProps) => {
  const trustFeatures = [
    {
      icon: 'ShieldCheckIcon' as const,
      title: 'Staatliche Autorisierung',
      description: 'Offiziell autorisierte Verkaufsstelle des Deutschen Zollamts mit vollständiger rechtlicher Legitimation.'
    },
    {
      icon: 'DocumentCheckIcon' as const,
      title: 'Rechtssichere Abwicklung',
      description: 'Alle Transaktionen erfolgen nach geltendem deutschen Recht mit vollständiger Dokumentation.'
    },
    {
      icon: 'LockClosedIcon' as const,
      title: 'Datenschutz garantiert',
      description: 'Ihre persönlichen Daten werden gemäß DSGVO und höchsten Sicherheitsstandards behandelt.'
    },
    {
      icon: 'ClockIcon' as const,
      title: 'Zuverlässige Bearbeitung',
      description: 'Garantierte Antwortzeit von maximal 2 Werktagen für alle eingehenden Anfragen.'
    }
  ];

  return (
    <div className={`card p-8 ${className}`}>
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-primary/10 rounded-full mb-4">
          <Icon name="ShieldCheckIcon" size={32} className="text-brand-primary" variant="solid" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">Vertrauen Sie der offiziellen Quelle</h2>
        <p className="text-text-secondary max-w-2xl mx-auto">
          Als autorisierte Verkaufsstelle des Deutschen Zollamts garantieren wir Ihnen höchste Standards 
          in Sicherheit, Rechtssicherheit und Kundenservice.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {trustFeatures.map((feature, index) => (
          <div key={index} className="flex items-start space-x-4 p-4 bg-muted/50 rounded-lg">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-trust/10 rounded-full flex items-center justify-center">
                <Icon name={feature.icon} size={20} className="text-trust" variant="solid" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-text-primary mb-1">{feature.title}</h3>
              <p className="text-sm text-text-secondary">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-brand-primary/5 border border-brand-primary/20 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="InformationCircleIcon" size={20} className="text-brand-primary mt-0.5" />
          <div>
            <h4 className="font-semibold text-brand-primary mb-2">Wichtiger Hinweis</h4>
            <p className="text-sm text-text-secondary">
              Alle über dieses Kontaktformular übermittelten Anfragen werden direkt an das zuständige 
              Hauptzollamt weitergeleitet und gemäß den offiziellen Verfahrensrichtlinien bearbeitet. 
              Ihre Daten werden ausschließlich für die Bearbeitung Ihrer Anfrage verwendet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSection;