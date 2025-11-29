"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { getFeaturedProducts } from '@/lib/firestoreQueries';
import type { FeaturedProductDocument } from '@/lib/firestoreTypes';

interface FeaturedLiquidationsProps {
  className?: string;
}

const FeaturedLiquidations = ({ className = '' }: FeaturedLiquidationsProps) => {
	  const [featuredItems, setFeaturedItems] = useState<FeaturedProductDocument[]>([]);
	  const [loading, setLoading] = useState(true);
	  const [error, setError] = useState<string | null>(null);

	  useEffect(() => {
	    let isMounted = true;
	    const load = async () => {
	      try {
	        const data = await getFeaturedProducts();
	        if (!isMounted) return;
	        setFeaturedItems(data);
	      } catch (err) {
	        console.error('Fehler beim Laden der Highlights', err);
	        if (isMounted) setError('Highlights konnten nicht geladen werden.');
	      } finally {
	        if (isMounted) setLoading(false);
	      }
	    };
	    load();
	    return () => {
	      isMounted = false;
	    };
	  }, []);

	  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-success text-success-foreground';
      case 'inquiry':
        return 'bg-warning text-warning-foreground';
      case 'reserved':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

	  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return 'Verfügbar';
      case 'inquiry':
        return 'Anfrage läuft';
      case 'reserved':
        return 'Reserviert';
      default:
        return 'Unbekannt';
    }
  };

  return (
    <section className={`py-20 bg-muted/30 ${className}`}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-brand-primary/10 rounded-full px-4 py-2 mb-4">
            <Icon name="StarIcon" size={20} className="text-brand-primary" variant="solid" />
            <span className="text-brand-primary font-medium text-sm">Besondere Liquidationen</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Aktuelle Highlights
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Entdecken Sie unsere wertvollsten und interessantesten Gegenstände aus aktuellen Zollbeschlagnahmungen. 
            Alle Artikel sind mit offizieller Dokumentation und Echtheitszertifikat verfügbar.
          </p>
        </div>

	        {/* Featured Items Grid */}
	        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
	          {loading &&
	            Array.from({ length: 4 }).map((_, index) => (
	              <div
	                key={index}
	                className="card p-0 overflow-hidden border-2 border-dashed border-border animate-pulse h-80"
	              />
	            ))}

	          {!loading && error && (
	            <div className="col-span-full text-center text-sm text-red-600">
	              {error}
	            </div>
	          )}

	          {!loading && !error &&
	            featuredItems.map((item) => (
	              <div key={item.id} className="card p-0 overflow-hidden discovery-hover h-auto md:h-[30rem] flex flex-col">
              {/* Item Image */}
              <div className="relative h-48 overflow-hidden shrink-0">
                <AppImage
                src={item.image}
                alt={item.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
	                {/* Status Badge */}
	                <div
	                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
	                    item.status,
	                  )}`}
	                >
	                  {getStatusText(item.status)}
	                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-text-primary">
                  {item.category}
                </div>
              </div>

              {/* Item Content */}
              <div className="p-6 flex-1 flex flex-col">
                {/* Title */}
                <h3 className="text-lg font-bold text-text-primary mb-2 line-clamp-2" title={item.title}>
                  {item.title}
                </h3>

                {/* Condition */}
                {/* Product condition display container */}
                <div id={`product-condition-${item.id}`} className="flex items-center space-x-2 mb-3">
                  <Icon name="CheckCircleIcon" size={16} className="text-success" variant="solid" />
                  <span className="text-sm text-text-secondary">Zustand: {item.condition}</span>
                </div>

                {/* Estimated Value */}
                {/* Estimated value display container */}
                <div id={`product-value-${item.id}`} className="mb-4">
                  <span className="text-sm text-text-secondary">Sofortkauf:</span>
                  <p className="text-lg font-bold text-brand-primary">{item.estimatedValue}</p>
                </div>

	                {/* Action Button */}
	                <Link
	                  href={`/product-detail?id=${item.officialId}`}
	                  className="w-full btn-primary text-center block mt-auto"
	                >
	                  Details ansehen
	                </Link>
              </div>
	            </div>
	          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link
            href="/contact"
            className="inline-flex items-center space-x-2 text-brand-primary hover:text-brand-primary/80 font-medium transition-colors duration-300">

            <span>Alle aktuellen Liquidationen ansehen</span>
            <Icon name="ArrowRightIcon" size={20} />
          </Link>
        </div>
      </div>
    </section>);

};

export default FeaturedLiquidations;