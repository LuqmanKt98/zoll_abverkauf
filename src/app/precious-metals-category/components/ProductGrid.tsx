import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

	interface PreciousMetalProduct {
	  id: string;
	  name: string;
	  metalType: string;
	  purity: string;
	  weight: string;
	  assayInfo: string;
	  marketValue: string;
	  condition: string;
	  image: string;
	  alt: string;
	  certification: string;
	}

	interface ProductGridProps {
	  className?: string;
	  products: PreciousMetalProduct[];
	}

	const ProductGrid = ({ className = '', products }: ProductGridProps) => {
	  return (
    <div className={`${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-text-primary flex items-center space-x-2">
          <Icon name="CubeIcon" size={24} className="text-brand-primary" />
          <span>Verfügbare Edelmetalle</span>
        </h2>
        <div className="text-sm text-text-secondary">
          {products.length} Artikel verfügbar
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) =>
        <div key={product.id} className="card p-0 overflow-hidden discovery-hover">
            <div className="relative h-48 overflow-hidden">
              <AppImage
              src={product.image}
              alt={product.alt}
              className="w-full h-full object-cover" />

              <div className="absolute top-3 left-3">
                <span className="bg-brand-primary text-white text-xs font-medium px-2 py-1 rounded">
                  {product.metalType}
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-1">
                  <Icon name="ShieldCheckIcon" size={16} className="text-success" variant="solid" />
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-semibold text-text-primary text-sm leading-tight line-clamp-2 flex-1 min-w-0" title={product.name}>{product.name}</h3>
                <span className="text-xs text-text-muted font-mono bg-muted px-2 py-1 rounded shrink-0">
                  {product.id}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-xs">
                  <span className="text-text-secondary">Reinheit:</span>
                  <span className="text-text-primary">{product.purity}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-text-secondary">Gewicht:</span>
                  <span className="text-text-primary">{product.weight}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-text-secondary">Prüfung:</span>
                  <span className="text-success">{product.assayInfo}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-text-secondary">Sofortkauf:</span>
                  <span className="font-medium text-brand-primary">{product.marketValue}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-1">
                  <Icon name="CheckBadgeIcon" size={14} className="text-success" variant="solid" />
                  <span className="text-xs text-success">{product.certification}</span>
                </div>
                <span className="text-xs text-text-secondary bg-muted px-2 py-1 rounded">
                  {product.condition}
                </span>
              </div>

              <Link
              href={`/product-detail?id=${product.id}`}
              className="block w-full btn-primary text-center text-sm">

                Details & Anfrage
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 text-center">
        <div className="bg-muted rounded-lg p-4 inline-block">
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="InformationCircleIcon" size={16} className="text-brand-primary" />
            <span>Alle Preisangaben sind Richtwerte basierend auf aktuellen Marktpreisen</span>
          </div>
        </div>
      </div>
    </div>);

};

export default ProductGrid;