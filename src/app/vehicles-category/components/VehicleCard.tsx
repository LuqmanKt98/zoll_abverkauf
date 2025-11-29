import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

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

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  const getConditionColor = (condition: string) => {
    const normalizedCondition = condition?.toLowerCase()?.trim() || '';
    switch (normalizedCondition) {
      case 'excellent':
      case 'ausgezeichnet':
      case 'sehr gut':
        return 'bg-trust text-trust-foreground';
      case 'good':
      case 'gut':
        return 'bg-brand-secondary text-white';
      case 'fair':
      case 'befriedigend':
      case 'akzeptabel':
        return 'bg-warning text-warning-foreground';
      case 'needs_repair':
      case 'needs repair':
      case 'reparaturbedürftig':
        return 'bg-error text-error-foreground';
      default:
        // Default to good styling instead of muted/unknown
        return 'bg-brand-secondary text-white';
    }
  };

  const getConditionText = (condition: string) => {
    const normalizedCondition = condition?.toLowerCase()?.trim() || '';
    switch (normalizedCondition) {
      case 'excellent':
      case 'ausgezeichnet':
      case 'sehr gut':
        return 'Excellent';
      case 'good':
      case 'gut':
        return 'Good';
      case 'fair':
      case 'befriedigend':
      case 'akzeptabel':
        return 'Fair';
      case 'needs_repair':
      case 'needs repair':
      case 'reparaturbedürftig':
        return 'Needs Repair';
      default:
        // Default to 'Good' instead of 'Unknown' for better UX
        return 'Good';
    }
  };

  return (
    <div className="card p-0 overflow-hidden discovery-hover h-full flex flex-col">
      <div className="relative h-48 overflow-hidden shrink-0">
        <AppImage
          src={vehicle.image}
          alt={vehicle.alt}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded text-xs font-medium ${getConditionColor(vehicle.condition)}`}>
            {getConditionText(vehicle.condition)}
          </span>
        </div>
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <div className="relative group">
          <h3
            className="font-semibold text-text-primary mb-2 line-clamp-2 h-[4rem] leading-tight text-[clamp(1.125rem,2.4vw,1.375rem)]"
            title={vehicle.title}
            tabIndex={0}
            aria-label={vehicle.title}
          >
            {vehicle.title}
          </h3>
          <div className="pointer-events-none absolute left-0 top-full mt-1 hidden group-hover:block group-focus-within:block bg-black/80 text-white text-xs px-2 py-1 rounded shadow-md max-w-[20rem]">
            {vehicle.title}
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Year of construction:</span>
            <span className="text-text-primary">{vehicle.year}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Brand:</span>
            <span className="text-text-primary">{vehicle.make}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Model:</span>
            <span className="text-text-primary">{vehicle.model}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Mileage:</span>
            <span className="text-text-primary">{vehicle.mileage}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Fuel:</span>
            <span className="text-text-primary">{vehicle.fuelType}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Location:</span>
            <span className="text-text-primary">{vehicle.location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xs text-text-secondary">Buy it now</div>
            <div className="font-bold text-brand-primary">{vehicle.estimatedValue}</div>
          </div>
        </div>

        <div className="flex space-x-2 mt-auto">
          <Link
            href={`/product-detail?id=${vehicle.id}`}
            className="flex-1 btn-primary text-center text-sm hover:opacity-90 transition-opacity"
          >
            View details
          </Link>
          <Link
            href={`/contact?product=${vehicle.id}`}
            className="px-3 py-2 border border-border rounded-md hover:bg-muted transition-colors duration-300 flex items-center justify-center"
          >
            <Icon name="ChatBubbleLeftRightIcon" size={16} className="text-text-secondary" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
