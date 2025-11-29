"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { getCategories } from '@/lib/firestoreQueries';
import type { CategoryDocument } from '@/lib/firestoreTypes';

interface CategoryGridProps {
  className?: string;
}

const CategoryGrid = ({ className = '' }: CategoryGridProps) => {
	  const [categories, setCategories] = useState<CategoryDocument[]>([]);
	  const [loading, setLoading] = useState(true);
	  const [error, setError] = useState<string | null>(null);

	  useEffect(() => {
	    let isMounted = true;
	    const load = async () => {
	      try {
	        const data = await getCategories();
	        if (!isMounted) return;
	        const sorted = [...data].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
	        setCategories(sorted);
	      } catch (err) {
	        console.error('Fehler beim Laden der Kategorien', err);
	        if (isMounted) setError('Kategorien konnten nicht geladen werden.');
	      } finally {
	        if (isMounted) setLoading(false);
	      }
	    };
	    load();
	    return () => {
	      isMounted = false;
	    };
	  }, []);

  return (
    <section className={`py-20 bg-background ${className}`}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Kategorien durchsuchen
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Entdecken Sie authentische Gegenstände aus staatlichen Liquidationen in vier Hauptkategorien. 
            Jeder Artikel wird mit offizieller Dokumentation und Echtheitszertifikat geliefert.
          </p>
        </div>

	        {/* Category Grid */}
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
	            categories.map((category) => (
	              <Link
	                key={category.id}
	                href={category.href}
	                className="group card p-0 overflow-hidden discovery-hover border-2 hover:border-brand-primary transition-all duration-300">

              {/* Category Image */}
              <div className="relative h-48 overflow-hidden">
                <AppImage
                src={category.image}
                alt={category.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
	                {/* Item Count Badge */}
	                <div className="absolute top-4 right-4 bg-brand-primary text-white px-3 py-1 rounded-full text-sm font-medium">
	                  {category.itemCount ?? 0} Artikel
	                </div>

	                {/* Category Icon */}
	                <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
	                  <Icon
	                    name={(category.icon as any) || 'CubeIcon'}
	                    size={24}
	                    className="text-brand-primary"
	                  />
	                </div>
              </div>

              {/* Category Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-brand-primary transition-colors duration-300">
                  {category.name}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-4">
                  {category.description}
                </p>
                
	                {/* Action Button */}
	                <div className="flex items-center justify-between">
	                  <span className="text-brand-primary font-medium text-sm">
	                    Kategorie erkunden
	                  </span>
	                  <Icon
	                    name="ArrowRightIcon"
	                    size={16}
	                    className="text-brand-primary group-hover:translate-x-1 transition-transform duration-300"
	                  />
	                </div>
              </div>
	            </Link>
	          ))}
        </div>
      </div>
    </section>);

};

export default CategoryGrid;