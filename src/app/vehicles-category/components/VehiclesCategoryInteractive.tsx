'use client';

import React, { useEffect, useState, useMemo } from 'react';
import OfficialAnnouncement from './OfficialAnnouncement';
import CategoryDescription from './CategoryDescription';
import VehicleGrid from './VehicleGrid';
import VehicleFAQ from './VehicleFAQ';
import { getProductsByCategory } from '@/lib/firestoreQueries';
import type { Product as FirestoreProduct } from '@/lib/firestoreTypes';

interface Vehicle {
  id: string;
  title: string;
  year: number;
  make: string;
  model: string;
  condition: 'excellent' | 'good' | 'fair' | 'needs_repair';
  mileage: string;
  fuelType: string;
  image: string;
  alt: string;
  estimatedValue: string;
  location: string;
  price?: number;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const VehiclesCategoryInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [vehiclesError, setVehiclesError] = useState<string | null>(null);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        const products = await getProductsByCategory('Fahrzeuge', 50, 'available');
        const mapped: Vehicle[] = (products as FirestoreProduct[]).map((p) => {
          // Map condition: if unknown/missing/falsy, default to 'good'.
          let condition = ((p as any).condition as any) || 'good';
          if (typeof condition === 'string' && condition.toLowerCase() === 'unknown') {
            condition = 'good';
          }

          return {
            id: p.id,
            title: p.title,
            year: (p as any).year || new Date().getFullYear(),
            make: (p as any).make || '',
            model: (p as any).model || '',
            condition: condition,
            mileage: (p as any).mileage || '',
            fuelType: (p as any).fuelType || '',
            image: p.image ?? '',
            alt: p.alt ?? p.title,
            estimatedValue: (p as any).estimatedValue ?? '',
            location: (p as any).location || '',
            price: (p as any).price || 0,
          };
        });

        setVehicles(mapped);
      } catch (err) {
        console.error('Fehler beim Laden der Fahrzeuge', err);
        setVehiclesError('Fahrzeuge konnten nicht geladen werden.');
      }
    };

    loadVehicles();
  }, []);

  useEffect(() => {
    // Load hardcoded FAQs
    const { getFAQsByCategory: getHardcodedFAQs } = require('@/data/faqs');
    const faqDocs = getHardcodedFAQs('Fahrzeuge');
    setFaqs(faqDocs.map((f: any) => ({
      id: f.id,
      question: f.question,
      answer: f.answer,
    })));
  }, []);

  // Calculate real statistics from Firestore data
  const statistics = useMemo(() => {
    const totalVehicles = vehicles.length;

    // Calculate average value from actual prices
    const vehiclesWithPrice = vehicles.filter(v => v.price && v.price > 0);
    const avgValue = vehiclesWithPrice.length > 0
      ? Math.round(vehiclesWithPrice.reduce((sum, v) => sum + (v.price || 0), 0) / vehiclesWithPrice.length)
      : 0;

    return {
      totalVehicles,
      averageValue: avgValue > 0 ? `€${avgValue.toLocaleString('de-DE')}` : '-',
      categories: 6 // Static: represents types of vehicles available
    };
  }, [vehicles]);

  const categoryData = {
    title: "Fahrzeuge - Zoll-Abverkauf",
    description: "Entdecken Sie eine vielfältige Auswahl an beschlagnahmten und überschüssigen Fahrzeugen aus Zollverfahren. Alle Fahrzeuge werden mit vollständiger Dokumentation und garantierter Rechtssicherheit angeboten. Von Luxusfahrzeugen bis hin zu Nutzfahrzeugen - finden Sie Ihr nächstes Fahrzeug zu außergewöhnlichen Konditionen.",
    features: [
      "PKW aller Klassen und Marken",
      "Motorräder und Roller",
      "Nutzfahrzeuge und Transporter",
      "Luxusfahrzeuge und Oldtimer",
      "Elektro- und Hybridfahrzeuge",
      "Wohnmobile und Anhänger"
    ],
    statistics
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="pt-32 pb-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="space-y-8">
              <div className="bg-white rounded-lg border border-border shadow-sm p-6">
                <div className="animate-pulse space-y-4">
                  <div className="h-6 bg-muted rounded w-1/3"></div>
                  <div className="h-4 bg-muted rounded w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-8">
            <OfficialAnnouncement />
            <CategoryDescription
              title={categoryData.title}
              description={categoryData.description}
              features={categoryData.features}
              statistics={categoryData.statistics} />

	            {vehiclesError && (
	              <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-700">
	                {vehiclesError}
	              </div>
	            )}

	            <VehicleGrid vehicles={vehicles} title="Available vehicles" />
            <VehicleFAQ faqs={faqs} />
          </div>
        </div>
      </div>
    </div>);

};

export default VehiclesCategoryInteractive;