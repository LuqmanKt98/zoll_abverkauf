import React from 'react';
import MachineryCard from './MachineryCard';

interface MachineryItem {
  id: string;
  title: string;
  type: string;
  manufacturer: string;
  year: number;
  operatingHours: number;
  condition: 'excellent' | 'good' | 'fair' | 'needs_repair';
  image: string;
  alt: string;
  specifications: {
    power: string;
    weight: string;
    dimensions: string;
  };
  inspectionDate: string;
  estimatedValue: string;
  location: string;
}

interface MachineryGridProps {
  machineryItems: MachineryItem[];
}

const MachineryGrid = ({ machineryItems }: MachineryGridProps) => {
  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-text-primary mb-2">Verfügbare Maschinen</h2>
          <p className="text-text-secondary">
            {machineryItems.length} Bau- und Landmaschinen zur Verwertung verfügbar
          </p>
        </div>
        <div className="hidden md:flex items-center space-x-2 text-sm text-text-secondary">
          <span>Sortiert nach:</span>
          <span className="font-medium text-text-primary">Neueste zuerst</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {machineryItems.map((machinery) => (
          <MachineryCard key={machinery.id} machinery={machinery} />
        ))}
      </div>

      {machineryItems.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🏗️</span>
          </div>
          <h3 className="text-lg font-medium text-text-primary mb-2">Keine Maschinen verfügbar</h3>
          <p className="text-text-secondary">
            Derzeit sind keine Bau- und Landmaschinen zur Verwertung verfügbar. 
            Schauen Sie bald wieder vorbei.
          </p>
        </div>
      )}
    </section>
  );
};

export default MachineryGrid;