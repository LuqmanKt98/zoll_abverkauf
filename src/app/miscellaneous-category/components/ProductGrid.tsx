import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Product {
  id: string;
  title: string;
  category: string;
  condition: 'Neu' | 'Sehr gut' | 'Gut' | 'Gebraucht';
  estimatedValue: string;
  image: string;
  alt: string;
  description: string;
  source: string;
  tags: string[];
}

interface ProductGridProps {
  products: Product[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'Neu':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Sehr gut':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Gut':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSourceIcon = (source: string) => {
    if (source.includes('Beschlagnahmt')) return 'ExclamationTriangleIcon';
    if (source.includes('Überschuss')) return 'ArchiveBoxIcon';
    return 'BuildingOfficeIcon';
  };

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
            <Icon name="Squares2X2Icon" size={18} className="text-white" variant="solid" />
          </div>
          <h2 className="text-xl font-semibold text-text-primary">Verfügbare Artikel</h2>
        </div>
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="FunnelIcon" size={16} />
          <span>{products.length} Artikel verfügbar</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="card p-0 overflow-hidden discovery-hover">
            {/* Product Image */}
            <div className="relative h-48 overflow-hidden">
              <AppImage
                src={product.image}
                alt={product.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getConditionColor(product.condition)}`}>
                  {product.condition}
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-1.5">
                  <Icon 
                    name={getSourceIcon(product.source) as any} 
                    size={14} 
                    className="text-brand-primary" 
                  />
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono text-text-muted">ID: {product.id}</span>
                  <span className="text-xs text-brand-secondary font-medium">{product.category}</span>
                </div>
                <h3 className="font-medium text-text-primary line-clamp-2 mb-2" title={product.title}>{product.title}</h3>
                <p className="text-sm text-text-secondary line-clamp-2 mb-3" title={product.description}>{product.description}</p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {product.tags.slice(0, 2).map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-muted text-xs text-text-secondary rounded">
                    {tag}
                  </span>
                ))}
                {product.tags.length > 2 && (
                  <span className="px-2 py-1 bg-muted text-xs text-text-secondary rounded">
                    +{product.tags.length - 2}
                  </span>
                )}
              </div>

              {/* Value and Source */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Sofortkauf:</span>
                  <span className="font-medium text-text-primary">{product.estimatedValue}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-text-muted">
                  <Icon name={getSourceIcon(product.source) as any} size={12} />
                  <span>{product.source}</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="space-y-2">
                <Link
                  href={`/product-detail?id=${product.id}`}
                  className="block w-full btn-primary text-center text-sm"
                >
                  Details ansehen
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Section */}
      <div className="mt-8 text-center">
        <button className="btn-secondary">
          <Icon name="ArrowDownIcon" size={16} className="mr-2" />
          Weitere Artikel laden
        </button>
        <p className="text-xs text-text-muted mt-2">Neue Artikel werden täglich hinzugefügt</p>
      </div>
    </section>
  );
};

export default ProductGrid;