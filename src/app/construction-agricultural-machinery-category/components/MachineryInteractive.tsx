'use client';

import React, { useState, useEffect } from 'react';
import OfficialAnnouncement from './OfficialAnnouncement';
import CategoryDescription from './CategoryDescription';
import MachineryGrid from './MachineryGrid';
import FAQAccordion from './FAQAccordion';
import { getProductsByCategory, getFAQsByCategory } from '@/lib/firestoreQueries';
import type { Product as FirestoreProduct, FAQDocument } from '@/lib/firestoreTypes';

interface CategoryInfo {
  title: string;
  description: string;
  totalItems: number;
  lastUpdate: string;
  categories: string[];
}

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

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const MachineryInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [machineryItems, setMachineryItems] = useState<MachineryItem[]>([]);
  const [machineryError, setMachineryError] = useState<string | null>(null);
  const [faqItems, setFaqItems] = useState<FAQItem[]>([]);
  const [lastProductUpdate, setLastProductUpdate] = useState<string>('');

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    const loadMachinery = async () => {
      try {
        const result = await getProductsByCategory('Bau-/Landmaschinen');

        // Find the most recent product update
        let mostRecentDate: Date | null = null;

        const mapped: MachineryItem[] = (result as FirestoreProduct[]).map((p) => {
          // Track most recent product date
          const productDate = (p as any).createdAt?.toDate?.() || (p as any).updatedAt?.toDate?.();
          if (productDate && (!mostRecentDate || productDate > mostRecentDate)) {
            mostRecentDate = productDate;
          }

          // Normalize condition value
          let condition: 'excellent' | 'good' | 'fair' | 'needs_repair' = 'good';
          const conditionStr = ((p as any).condition || '').toLowerCase().trim();
          if (conditionStr === 'excellent' || conditionStr === 'ausgezeichnet' || conditionStr === 'sehr gut' || conditionStr === 'neu') {
            condition = 'excellent';
          } else if (conditionStr === 'good' || conditionStr === 'gut') {
            condition = 'good';
          } else if (conditionStr === 'fair' || conditionStr === 'befriedigend' || conditionStr === 'akzeptabel') {
            condition = 'fair';
          } else if (conditionStr === 'needs_repair' || conditionStr === 'reparaturbedürftig') {
            condition = 'needs_repair';
          }

          // Get price/estimatedValue
          const estimatedValue = (p as any).estimatedValue ||
            ((p as any).price ? `€${(p as any).price.toLocaleString()}` : '');

          return {
            id: p.id,
            title: p.title,
            type: (p as any).type || (p as any).machineType || 'Maschine',
            manufacturer: (p as any).manufacturer || '-',
            year: (p as any).year ?? new Date().getFullYear(),
            operatingHours: (p as any).operatingHours ?? 0,
            condition: condition,
            image: p.image || '',
            alt: p.alt || p.title,
            specifications: {
              power: (p as any).specifications?.power || '-',
              weight: (p as any).specifications?.weight || '-',
              dimensions: (p as any).specifications?.dimensions || '-',
            },
            inspectionDate: (p as any).inspectionDate || new Date().toLocaleDateString('de-DE'),
            estimatedValue: estimatedValue,
            location: (p as any).location || 'Deutschland',
          };
        });

        setMachineryItems(mapped);

        // Set the last update date from actual products
        if (mostRecentDate) {
          setLastProductUpdate(mostRecentDate.toLocaleDateString('de-DE', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }) + ' Uhr');
        } else if (mapped.length > 0) {
          setLastProductUpdate(new Date().toLocaleDateString('de-DE', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          }));
        }
      } catch (err) {
        console.error('Fehler beim Laden der Bau- und Landmaschinen', err);
        setMachineryError('Maschinen konnten nicht geladen werden.');
      }
    };

    loadMachinery();
  }, []);

  useEffect(() => {
    // Load hardcoded FAQs
    const { getFAQsByCategory: getHardcodedFAQs } = require('@/data/faqs');
    const faqs = getHardcodedFAQs('Bau-/Landmaschinen');
    setFaqItems(faqs.map((f: any) => ({
      id: f.id,
      question: f.question,
      answer: f.answer,
      category: f.category || 'Allgemeine Informationen',
    })));
  }, []);

  // Dynamic category info based on real Firestore data
  const categoryInfo: CategoryInfo = {
    title: "Bau- und Landmaschinen",
    description: "Hochwertige Bau- und Landmaschinen aus Zollverwertung, Insolvenzverfahren und Beschlagnahmungen. Alle Maschinen werden vor der Verwertung technisch geprüft und dokumentiert. Von Baggern und Radladern bis hin zu Traktoren und Mähdreschern - entdecken Sie professionelle Maschinen zu attraktiven Konditionen mit vollständiger rechtlicher Absicherung.",
    totalItems: machineryItems.length,
    lastUpdate: lastProductUpdate || 'Wird geladen...',
    categories: ["Bagger", "Radlader", "Traktoren", "Mähdrescher", "Kräne", "Walzen", "Raupen", "Anhänger"]
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-48 bg-muted rounded-lg"></div>
            <div className="h-32 bg-muted rounded-lg"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) =>
              <div key={i} className="h-96 bg-muted rounded-lg"></div>
              )}
            </div>
          </div>
        </div>
      </div>);

  }

  return (
    <div className="space-y-8">
      <OfficialAnnouncement />
      <CategoryDescription categoryInfo={categoryInfo} />
	      {machineryError && (
	        <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
	          {machineryError}
	        </div>
	      )}
	      <MachineryGrid machineryItems={machineryItems} />
	      <FAQAccordion faqItems={faqItems} />
	    </div>);

};

export default MachineryInteractive;