import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface RelatedProduct {
  id: string;
  name: string;
  category: string;
  image: string;
  alt: string;
  status: string;
}

interface RelatedProductsProps {
  products: RelatedProduct[];
  currentProductId: string;
}

const RelatedProducts = ({ products, currentProductId }: RelatedProductsProps) => {
  // Filter out current product and limit to 4 items
  const filteredProducts = products
    .filter(product => product.id !== currentProductId)
    .slice(0, 4);

  if (filteredProducts.length === 0) {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'verfügbar':
        return 'text-success bg-success/10';
      case 'reserviert':
        return 'text-warning bg-warning/10';
      case 'verkauft':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Icon name="SparklesIcon" size={24} className="text-brand-primary" />
        <h3 className="text-xl font-semibold text-text-primary">Ähnliche Artikel</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Link
            key={product.id}
            href={`/product-detail?id=${product.id}`}
            className="card p-4 discovery-hover group"
          >
            <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-4">
              <AppImage
                src={product.image}
                alt={product.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-secondary font-mono">
                  ID: {product.id}
                </span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(product.status)}`}>
                  {product.status}
                </span>
              </div>

              <h4 className="font-semibold text-text-primary line-clamp-2 group-hover:text-brand-primary transition-colors duration-300">
                {product.name}
              </h4>

              <p className="text-sm text-text-secondary">
                {product.category}
              </p>

              <div className="flex items-center space-x-1 text-brand-primary">
                <span className="text-sm font-medium">Details ansehen</span>
                <Icon name="ArrowRightIcon" size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center">
        <Link
          href="/homepage"
          className="inline-flex items-center space-x-2 text-brand-primary hover:text-brand-secondary transition-colors duration-300"
        >
          <span>Alle Kategorien durchsuchen</span>
          <Icon name="ArrowRightIcon" size={16} />
        </Link>
      </div>
    </div>
  );
};

export default RelatedProducts;