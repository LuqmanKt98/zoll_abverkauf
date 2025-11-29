import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface CategoryDescriptionProps {
  className?: string;
}

const CategoryDescription = ({ className = '' }: CategoryDescriptionProps) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-border p-6 ${className}`}>
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-warning/10 rounded-full flex items-center justify-center">
          <Icon name="SparklesIcon" size={24} className="text-warning" variant="solid" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary">Edelmetalle - Zertifizierte Authentizität</h2>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <p className="text-text-secondary mb-4 leading-relaxed">
            Unsere Edelmetall-Kollektion umfasst beschlagnahmte und eingezogene Wertgegenstände aus Gold, Silber, Platin und anderen Edelmetallen. Jedes Stück wird durch staatlich anerkannte Prüfverfahren authentifiziert und mit amtlichen Zertifikaten versehen.
          </p>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircleIcon" size={16} className="text-success" variant="solid" />
              <span className="text-sm text-text-secondary">Staatliche Authentifizierung durch XRF-Analyse</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircleIcon" size={16} className="text-success" variant="solid" />
              <span className="text-sm text-text-secondary">Präzise Gewichts- und Reinheitsbestimmung</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircleIcon" size={16} className="text-success" variant="solid" />
              <span className="text-sm text-text-secondary">Vollständige Herkunftsdokumentation</span>
            </div>
          </div>
        </div>
        
        <div className="bg-muted rounded-lg p-4">
          <h3 className="font-semibold text-text-primary mb-3 flex items-center space-x-2">
            <Icon name="InformationCircleIcon" size={18} className="text-brand-primary" />
            <span>Verfügbare Kategorien</span>
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">Gold (Au)</span>
              <span className="font-medium text-warning">333 - 999 Feingehalt</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Silber (Ag)</span>
              <span className="font-medium text-text-primary">800 - 999 Feingehalt</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Platin (Pt)</span>
              <span className="font-medium text-text-primary">950 - 999 Feingehalt</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Palladium (Pd)</span>
              <span className="font-medium text-text-primary">500 - 999 Feingehalt</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDescription;