import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

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

interface MachineryCardProps {
  machinery: MachineryItem;
}

const MachineryCard = ({ machinery }: MachineryCardProps) => {
  const getConditionColor = (condition: string) => {
    const normalizedCondition = condition?.toLowerCase()?.trim() || '';
    switch (normalizedCondition) {
      case 'excellent':
      case 'ausgezeichnet':
      case 'sehr gut':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'good':
      case 'gut':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'fair':
      case 'befriedigend':
      case 'akzeptabel':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'needs_repair':
      case 'needs repair':
      case 'reparaturbedürftig':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        // Default to good styling
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getConditionText = (condition: string) => {
    const normalizedCondition = condition?.toLowerCase()?.trim() || '';
    switch (normalizedCondition) {
      case 'excellent':
      case 'ausgezeichnet':
      case 'sehr gut':
        return 'Ausgezeichnet';
      case 'good':
      case 'gut':
        return 'Gut';
      case 'fair':
      case 'befriedigend':
      case 'akzeptabel':
        return 'Befriedigend';
      case 'needs_repair':
      case 'needs repair':
      case 'reparaturbedürftig':
        return 'Reparaturbedürftig';
      default:
        // Default to 'Gut' instead of 'Unknown/Unbekannt'
        return 'Gut';
    }
  };

  return (
    <div className="card p-0 overflow-hidden discovery-hover">
      <div className="relative h-48 overflow-hidden">
        <AppImage
          src={machinery.image}
          alt={machinery.alt}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className="official-id px-2 py-1 text-xs font-mono font-medium text-brand-primary rounded">
            ID: {machinery.id}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 text-xs font-medium rounded border ${getConditionColor(machinery.condition)}`}>
            {getConditionText(machinery.condition)}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-3">
          <h3 className="font-semibold text-text-primary mb-1 line-clamp-2" title={machinery.title}>{machinery.title}</h3>
          <div className="flex items-center space-x-2 text-sm text-text-secondary flex-wrap">
            <span className="font-medium">{machinery.manufacturer}</span>
            <span>•</span>
            <span>{machinery.year}</span>
            <span>•</span>
            <span className="text-brand-primary font-medium">{machinery.type}</span>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1 text-text-secondary">
              <Icon name="ClockIcon" size={14} />
              <span>Betriebsstunden:</span>
            </div>
            <span className="text-text-primary">{machinery.operatingHours.toLocaleString('de-DE')} h</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1 text-text-secondary">
              <Icon name="BoltIcon" size={14} />
              <span>Leistung:</span>
            </div>
            <span className="text-text-primary">{machinery.specifications.power}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1 text-text-secondary">
              <Icon name="ScaleIcon" size={14} />
              <span>Gewicht:</span>
            </div>
            <span className="text-text-primary">{machinery.specifications.weight}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1 text-text-secondary">
              <Icon name="MapPinIcon" size={14} />
              <span>Standort:</span>
            </div>
            <span className="text-text-primary">{machinery.location}</span>
          </div>
        </div>

        <div className="border-t border-border pt-3 mb-4">
          <div className="flex items-center justify-between text-sm mt-1">
            <div className="flex items-center space-x-1 text-text-secondary">
              <Icon name="CurrencyEuroIcon" size={14} />
              <span>Sofortkauf:</span>
            </div>
            <span className="font-semibold text-brand-primary">{machinery.estimatedValue}</span>
          </div>
        </div>

        <div className="space-y-2">
          <Link
            href={`/product-detail?id=${machinery.id}`}
            className="block w-full btn-primary text-center text-sm"
          >
            Details ansehen
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MachineryCard;