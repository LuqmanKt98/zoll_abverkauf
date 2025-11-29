import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface ProductHeaderProps {
  productId: string;
  productName: string;
  category: string;
  dateAdded: string;
  status: string;
  estimatedValue: string;
  className?: string;
}

const ProductHeader = ({
  productId,
  productName,
  category,
  dateAdded,
  status,
  estimatedValue,
  className = ''
}: ProductHeaderProps) => {
  // Provide defaults
  const displayStatus = status || 'Verfügbar';
  const displayCategory = category || 'Verschiedenes';

  const getStatusColor = (s: string) => {
    const normalized = s?.toLowerCase()?.trim() || '';
    switch (normalized) {
      case 'verfügbar':
      case 'available':
        return 'bg-success text-success-foreground';
      case 'reserviert':
      case 'reserved':
        return 'bg-warning text-warning-foreground';
      case 'verkauft':
      case 'sold':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-success text-success-foreground';
    }
  };

  // Build href for category
  const getCategoryHref = (cat: string) => {
    const normalized = cat?.toLowerCase() || '';
    if (normalized.includes('fahrzeug')) return '/vehicles-category';
    if (normalized.includes('edelmetall')) return '/precious-metals-category';
    if (normalized.includes('maschinen') || normalized.includes('bau') || normalized.includes('land')) return '/construction-agricultural-machinery-category';
    return '/miscellaneous-category';
  };

  return (
    <div className={`bg-white rounded-lg border border-border shadow-sm ${className}`}>
      <div className="p-4 sm:p-6">
        {/* Breadcrumb Navigation */}
        <nav className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs sm:text-sm mb-4 sm:mb-6">
          <Link href="/homepage" className="text-brand-primary hover:text-brand-primary/80 transition-colors flex items-center">
            <Icon name="HomeIcon" size={14} className="mr-1" />
            <span className="hidden sm:inline">Startseite</span>
          </Link>
          <Icon name="ChevronRightIcon" size={14} className="text-text-secondary" />
          <Link href={getCategoryHref(displayCategory)} className="text-brand-primary hover:text-brand-primary/80 transition-colors truncate max-w-[100px] sm:max-w-none">
            {displayCategory}
          </Link>
          <Icon name="ChevronRightIcon" size={14} className="text-text-secondary" />
          <span className="text-text-secondary">Produktdetails</span>
        </nav>

        {/* Product ID - Prominent Display */}
        <div className="bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 border-l-4 border-brand-primary rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <div className="text-[10px] sm:text-xs text-text-secondary font-medium uppercase tracking-wide mb-1">
                Offizielle Produkt-ID
              </div>
              <div className="text-base sm:text-2xl font-bold text-brand-primary font-mono tracking-wider break-all">
                {productId}
              </div>
            </div>
            <div className="flex-shrink-0 ml-2">
              <Icon name="IdentificationIcon" size={24} className="text-brand-primary sm:hidden" />
              <Icon name="IdentificationIcon" size={32} className="text-brand-primary hidden sm:block" />
            </div>
          </div>
        </div>

        {/* Product Title, Status and Price */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-2 sm:mb-3 leading-tight break-words">
              {productName}
            </h1>

            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              {/* Category Badge */}
              <div className="inline-flex items-center space-x-1 sm:space-x-2 bg-muted rounded-full px-2 sm:px-3 py-1">
                <Icon name="TagIcon" size={14} className="text-text-secondary" />
                <span className="text-xs sm:text-sm font-medium text-text-secondary">{displayCategory}</span>
              </div>

              {/* Status Badge */}
              <div className={`inline-flex items-center space-x-1 sm:space-x-2 rounded-full px-2 sm:px-3 py-1 ${getStatusColor(displayStatus)}`}>
                <Icon name="CheckCircleIcon" size={14} />
                <span className="text-xs sm:text-sm font-medium">{displayStatus}</span>
              </div>
            </div>
          </div>

          {/* Price Section */}
          {estimatedValue && (
            <div className="bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 border border-brand-primary/20 rounded-lg p-3 sm:p-4 sm:ml-4 sm:min-w-[160px] lg:min-w-[200px]">
              <div className="text-center">
                <div className="text-xs sm:text-sm text-text-secondary font-medium uppercase tracking-wide mb-1 sm:mb-2">
                  Sofortkauf
                </div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-brand-primary">
                  {estimatedValue}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-4 border-t border-border">
          <Link
            href={`#inquiry-form`}
            className="btn-primary flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm px-3 sm:px-4 py-2"
          >
            <Icon name="DocumentTextIcon" size={16} />
            <span>Details anfragen</span>
          </Link>

          <button
            type="button"
            className="btn-outline flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm px-2 sm:px-3 py-2"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: productName,
                  text: `Schauen Sie sich dieses Produkt an: ${productName}`,
                  url: window.location.href,
                });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('Link kopiert!');
              }
            }}
          >
            <Icon name="ShareIcon" size={16} />
            <span>Teilen</span>
          </button>

          <button
            type="button"
            className="btn-outline flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm px-2 sm:px-3 py-2"
            onClick={() => window.print()}
          >
            <Icon name="PrinterIcon" size={16} />
            <span>Drucken</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductHeader;