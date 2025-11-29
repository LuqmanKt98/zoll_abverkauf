'use client';

import React, { useState, useEffect } from 'react';
import OfficialAnnouncement from './OfficialAnnouncement';
import CategoryDescription from './CategoryDescription';
import ProductGrid from './ProductGrid';
import FAQAccordion from './FAQAccordion';
import { getProductsByCategory } from '@/lib/firestoreQueries';
import type { Product as FirestoreProduct } from '@/lib/firestoreTypes';

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

interface PreciousMetalsInteractiveProps {
  className?: string;
}

const PreciousMetalsInteractive = ({ className = '' }: PreciousMetalsInteractiveProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
	  const [products, setProducts] = useState<PreciousMetalProduct[]>([]);
	  const [productsError, setProductsError] = useState<string | null>(null);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

	  useEffect(() => {
	    const loadProducts = async () => {
	      try {
	        const result = await getProductsByCategory('Edelmetalle');
	        const mapped: PreciousMetalProduct[] = (result as FirestoreProduct[]).map((p) => {
	          // Normalize condition value
	          let condition = (p as any).condition || 'Gut';
	          const conditionLower = condition.toLowerCase().trim();
	          if (conditionLower === 'excellent' || conditionLower === 'ausgezeichnet' || conditionLower === 'sehr gut') {
	            condition = 'Ausgezeichnet';
	          } else if (conditionLower === 'good' || conditionLower === 'gut') {
	            condition = 'Gut';
	          } else if (conditionLower === 'neu' || conditionLower === 'new') {
	            condition = 'Neu';
	          }

	          // Get price/marketValue - prefer marketValue, fallback to estimatedValue or price
	          const marketValue = (p as any).marketValue || (p as any).estimatedValue ||
	            ((p as any).price ? `€${(p as any).price.toLocaleString()}` : '');

	          return {
	            id: p.id,
	            name: p.title,
	            metalType: (p as any).metalType || 'Edelmetall',
	            purity: (p as any).purity || '-',
	            weight: (p as any).weight || '-',
	            assayInfo: (p as any).assayInfo || ((p as any).certification ? 'Zertifiziert' : '-'),
	            marketValue: marketValue,
	            condition: condition,
	            image: p.image || '',
	            alt: p.alt || p.title,
	            certification: (p as any).certification || condition,
	          };
	        });

	        setProducts(mapped);
	      } catch (err) {
	        console.error('Fehler beim Laden der Edelmetalle', err);
	        setProductsError('Edelmetalle konnten nicht geladen werden.');
	      }
	    };

	    loadProducts();
	  }, []);

  if (!isHydrated) {
    return (
      <div className={`min-h-screen bg-background ${className}`}>
        <div className="pt-32 pb-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white p-6 rounded-lg shadow-lg animate-pulse">
                <div className="h-6 bg-white/20 rounded mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-white/20 rounded"></div>
                  <div className="h-4 bg-white/20 rounded w-3/4"></div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-border p-6 animate-pulse">
                <div className="h-8 bg-muted rounded mb-4"></div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded w-5/6"></div>
                  </div>
                  <div className="h-32 bg-muted rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-background ${className}`}>
      <div className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-8">
            <OfficialAnnouncement />
            <CategoryDescription />
	            {productsError && (
	              <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
	                {productsError}
	              </div>
	            )}
	            <ProductGrid products={products} />
	            <FAQAccordion />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreciousMetalsInteractive;