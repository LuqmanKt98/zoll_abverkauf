'use client';

import React, { useState, useEffect } from 'react';
import OfficialAnnouncement from './OfficialAnnouncement';
import CategoryDescription from './CategoryDescription';
import ProductGrid from './ProductGrid';
import FAQAccordion from './FAQAccordion';
import { getProductsByCategory, getFAQsByCategory } from '@/lib/firestoreQueries';
import type { Product as FirestoreProduct, FAQDocument } from '@/lib/firestoreTypes';

interface AnnouncementItem {
  id: string;
  title: string;
  date: string;
  content: string;
  priority: 'high' | 'medium' | 'low';
}

interface CategoryInfo {
  title: string;
  description: string;
  itemTypes: string[];
  sources: string[];
  benefits: string[];
}

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

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const MiscellaneousInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
	  const [products, setProducts] = useState<Product[]>([]);
	  const [productsError, setProductsError] = useState<string | null>(null);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

	  useEffect(() => {
	    const loadProducts = async () => {
	      try {
	        const result = await getProductsByCategory('Verschiedenes');
	        const mapped: Product[] = (result as FirestoreProduct[]).map((p) => {
	          // Normalize condition value
	          let condition: 'Neu' | 'Sehr gut' | 'Gut' | 'Gebraucht' = 'Gut';
	          const conditionStr = ((p as any).condition || '').toLowerCase().trim();
	          if (conditionStr === 'neu' || conditionStr === 'new') {
	            condition = 'Neu';
	          } else if (conditionStr === 'excellent' || conditionStr === 'ausgezeichnet' || conditionStr === 'sehr gut') {
	            condition = 'Sehr gut';
	          } else if (conditionStr === 'good' || conditionStr === 'gut') {
	            condition = 'Gut';
	          } else if (conditionStr === 'gebraucht' || conditionStr === 'used' || conditionStr === 'fair') {
	            condition = 'Gebraucht';
	          }

	          // Get price/estimatedValue
	          const estimatedValue = (p as any).estimatedValue ||
	            ((p as any).price ? `€${(p as any).price.toLocaleString()}` : '');

	          return {
	            id: p.id,
	            title: p.title,
	            category: ((p as any).subCategory as string) || 'Verschiedenes',
	            condition: condition,
	            estimatedValue: estimatedValue,
	            image: p.image || '',
	            alt: p.alt || p.title,
	            description: (p as any).description || 'Keine Beschreibung verfügbar',
	            source: ((p as any).source as string) || 'Zollverwertung',
	            tags: ((p as any).tags as string[]) || [],
	          };
	        });

	        setProducts(mapped);
	      } catch (err) {
	        console.error('Fehler beim Laden der Kategorie "Verschiedenes"', err);
	        setProductsError('Artikel konnten nicht geladen werden.');
	      }
	    };

	    loadProducts();
	  }, []);

  useEffect(() => {
    // Load hardcoded FAQs
    const { getFAQsByCategory: getHardcodedFAQs } = require('@/data/faqs');
    const faqDocs = getHardcodedFAQs('Verschiedenes');
    setFaqs(faqDocs.map((f: any) => ({
      id: f.id,
      question: f.question,
      answer: f.answer,
      category: f.category || 'Häufig gestellte Fragen – Verschiedene Waren & Restbestände',
    })));
  }, []);

  // Static category descriptions (not mock data - these are informational text)
  const categoryInfo: CategoryInfo = {
    title: "Verschiedenes - Vielfältige Liquidationen",
    description: "Diese Kategorie umfasst die breite Palette an beschlagnahmten und überschüssigen Gütern, die nicht in die spezialisierten Kategorien fallen. Von Elektronikgeräten über Haushaltsartikel bis hin zu Sammlerobjekten - hier finden Sie eine vielfältige Auswahl authentischer Artikel mit staatlicher Herkunftsgarantie.",
    itemTypes: [
      "Plattenwaren",
      "Warencontainer",
      "Kupfer",
      "Aluminium",
      "Kryptowährungen",
      "Praxisauflösungen"
    ],
    sources: [
      "Zollbeschlagnahmungen bei Grenzkontrollen",
      "Überschussbestände staatlicher Einrichtungen",
      "Sichergestellte Gegenstände aus Ermittlungsverfahren",
      "Nicht abgeholte Sendungen aus Zolllagern"
    ],
    benefits: [
      "Authentizität durch staatliche Herkunftsgarantie",
      "Detaillierte Zustandsbeschreibungen",
      "Faire Preisgestaltung ohne Zwischenhändler",
      "Rechtssichere Abwicklung"
    ]
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-32 bg-muted rounded-lg"></div>
            <div className="h-48 bg-muted rounded-lg"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-80 bg-muted rounded-lg"></div>
              ))}
            </div>
            <div className="h-64 bg-muted rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <OfficialAnnouncement />
        <CategoryDescription categoryInfo={categoryInfo} />
	        {productsError && (
	          <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-700">
	            {productsError}
	          </div>
	        )}
	        <ProductGrid products={products} />
        <FAQAccordion faqs={faqs} />
      </div>
    </div>
  );
};

export default MiscellaneousInteractive;