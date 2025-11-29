import React from 'react';
import VehicleCard from './VehicleCard';

interface Vehicle {
  id: string;
  title: string;
  year: number;
  make: string;
  model: string;
  condition: 'excellent' | 'good' | 'fair' | 'needs_repair';
  mileage: string;
  fuelType: string;
  image: string;
  alt: string;
  estimatedValue: string;
  location: string;
}

interface VehicleGridProps {
  vehicles: Vehicle[];
  title: string;
}

const VehicleGrid = ({ vehicles, title }: VehicleGridProps) => {
  return (
    <section className="bg-white rounded-lg border border-border shadow-sm">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-semibold text-text-primary">{title}</h2>
        <p className="text-sm text-text-secondary mt-1">
          {vehicles.length} {vehicles.length === 1 ? 'vehicle' : 'vehicles'} available
        </p>
      </div>
      
      <div className="p-6">
        {vehicles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-text-secondary mb-2">No vehicles available at the moment</div>
            <div className="text-sm text-text-secondary">
              Please check back later or contact us for more information.
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default VehicleGrid;