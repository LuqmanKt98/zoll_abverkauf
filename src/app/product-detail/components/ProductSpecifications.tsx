import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface Specification {
  label: string;
  value: string;
  icon?: string;
}

interface ProductSpecificationsProps {
  specifications: Specification[];
  condition: string;
  legalStatus: string;
  provenance: string;
}

const ProductSpecifications = ({
  specifications,
  condition,
  legalStatus,
  provenance
}: ProductSpecificationsProps) => {
  // Provide defaults for empty values
  const displayCondition = condition || 'Gut';
  const displayLegalStatus = legalStatus || 'Freigegeben';
  const displayProvenance = provenance || 'Deutschland';

  const getConditionColor = (cond: string) => {
    const normalized = cond?.toLowerCase()?.trim() || '';
    switch (normalized) {
      case 'neu':
      case 'sehr gut':
      case 'excellent':
      case 'ausgezeichnet':
        return 'text-success bg-success/10';
      case 'gut':
      case 'good':
        return 'text-blue-600 bg-blue-100';
      case 'befriedigend':
      case 'fair':
      case 'gebraucht':
        return 'text-warning bg-warning/10';
      case 'beschädigt':
      case 'reparaturbedürftig':
      case 'needs_repair':
        return 'text-error bg-error/10';
      default:
        return 'text-blue-600 bg-blue-100';
    }
  };

  const getLegalStatusColor = (status: string) => {
    const normalized = status?.toLowerCase()?.trim() || '';
    switch (normalized) {
      case 'freigegeben':
      case 'verkaufsfähig':
      case 'available':
        return 'text-success bg-success/10';
      case 'prüfung':
      case 'pending':
        return 'text-warning bg-warning/10';
      default:
        return 'text-success bg-success/10';
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Status Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="card p-3 sm:p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="ClipboardDocumentCheckIcon" size={18} className="text-brand-primary flex-shrink-0" />
            <h4 className="font-semibold text-text-primary text-sm sm:text-base">Zustand</h4>
          </div>
          <span className={`inline-block px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getConditionColor(displayCondition)}`}>
            {displayCondition}
          </span>
        </div>

        <div className="card p-3 sm:p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="ScaleIcon" size={18} className="text-brand-primary flex-shrink-0" />
            <h4 className="font-semibold text-text-primary text-sm sm:text-base">Rechtsstatus</h4>
          </div>
          <span className={`inline-block px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getLegalStatusColor(displayLegalStatus)}`}>
            {displayLegalStatus}
          </span>
        </div>

        <div className="card p-3 sm:p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="MapPinIcon" size={18} className="text-brand-primary flex-shrink-0" />
            <h4 className="font-semibold text-text-primary text-sm sm:text-base">Herkunft</h4>
          </div>
          <p className="text-xs sm:text-sm text-text-secondary">{displayProvenance}</p>
        </div>
      </div>

      {/* Detailed Specifications */}
      {specifications.length > 0 && (
        <div className="card p-4 sm:p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="DocumentTextIcon" size={18} className="text-brand-primary flex-shrink-0" />
            <h3 className="text-base sm:text-lg font-semibold text-text-primary">Technische Daten</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
            {specifications.map((spec, index) => (
              <div key={index} className="flex justify-between items-center py-2 sm:py-3 border-b border-border last:border-b-0">
                <div className="flex items-center space-x-2 min-w-0">
                  {spec.icon && (
                    <Icon
                      name={spec.icon as any}
                      size={14}
                      className="text-muted-foreground flex-shrink-0"
                    />
                  )}
                  <span className="text-text-secondary text-xs sm:text-sm truncate">{spec.label}:</span>
                </div>
                <span className="text-text-primary text-xs sm:text-sm font-medium text-right ml-2">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Official Documentation */}
      <div className="card p-4 sm:p-6 bg-muted/50">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="ShieldCheckIcon" size={18} className="text-trust flex-shrink-0" variant="solid" />
          <h3 className="text-base sm:text-lg font-semibold text-text-primary">Offizielle Dokumentation</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="flex items-center space-x-3 p-3 bg-white rounded border">
            <Icon name="DocumentCheckIcon" size={18} className="text-trust flex-shrink-0" />
            <div className="min-w-0">
              <p className="font-medium text-text-primary text-sm sm:text-base">Authentizitätszertifikat</p>
              <p className="text-xs sm:text-sm text-text-secondary">Verfügbar bei Anfrage</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-white rounded border">
            <Icon name="LockClosedIcon" size={18} className="text-trust flex-shrink-0" />
            <div className="min-w-0">
              <p className="font-medium text-text-primary text-sm sm:text-base">Rechtssichere Übertragung</p>
              <p className="text-xs sm:text-sm text-text-secondary">Garantiert durch Zollamt</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSpecifications;