import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface CategoryDescriptionProps {
  title: string;
  description: string;
  features: string[];
  statistics: {
    totalVehicles: number;
    averageValue: string;
    categories: number;
  };
}

const CategoryDescription = ({ title, description, features, statistics }: CategoryDescriptionProps) => {
  return (
    <section className="bg-white rounded-lg border border-border shadow-sm">
      <div className="p-6">
        <div className="flex items-start space-x-4 mb-6">
          <div className="w-12 h-12 bg-brand-primary rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="TruckIcon" size={24} className="text-white" variant="solid" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-text-primary mb-2">{title}</h2>
            <p className="text-text-secondary leading-relaxed">{description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-muted rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-brand-primary mb-1">
              {statistics.totalVehicles}
            </div>
            <div className="text-sm text-text-secondary">Verfügbare Fahrzeuge</div>
          </div>
          <div className="bg-muted rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-brand-primary mb-1">
              {statistics.averageValue}
            </div>
            <div className="text-sm text-text-secondary">Durchschnittswert</div>
          </div>
          <div className="bg-muted rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-brand-primary mb-1">
              {statistics.categories}
            </div>
            <div className="text-sm text-text-secondary">Fahrzeugkategorien</div>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-text-primary mb-3">Verfügbare Fahrzeugtypen:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Icon name="CheckCircleIcon" size={16} className="text-trust flex-shrink-0" variant="solid" />
                <span className="text-sm text-text-secondary">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryDescription;