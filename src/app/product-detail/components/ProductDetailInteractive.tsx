'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductHeader from './ProductHeader';
import ProductImageGallery from './ProductImageGallery';
import ProductSpecifications from './ProductSpecifications';
import ProductInquiryForm from './ProductInquiryForm';
import RelatedProducts from './RelatedProducts';
import AcquisitionProcess from './AcquisitionProcess';
import { getProductById, getRelatedProducts } from '@/lib/firestoreQueries';
import type { Product as FirestoreProduct } from '@/lib/firestoreTypes';

interface ProductImage {
  id: number;
  url: string;
  alt: string;
  thumbnail: string;
}

interface Specification {
  label: string;
  value: string;
  icon?: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  dateAdded: string;
  status: string;
  condition: string;
  legalStatus: string;
  provenance: string;
  estimatedValue: string;
  images: ProductImage[];
  specifications: Specification[];
}

interface RelatedProduct {
  id: string;
  name: string;
  category: string;
  image: string;
  alt: string;
  status: string;
}

const ProductDetailInteractive = () => {
	  const [isHydrated, setIsHydrated] = useState(false);
	  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
	  const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([]);
	  const [loadingProduct, setLoadingProduct] = useState(true);
	  const [loadingRelated, setLoadingRelated] = useState(false);
	  const [error, setError] = useState<string | null>(null);
	  const searchParams = useSearchParams();

	  useEffect(() => {
	    setIsHydrated(true);
	  }, []);

	  // Helper to map Firestore product into local Product shape
	  const mapFirestoreProductToLocal = (p: FirestoreProduct): Product => {
	    const images: ProductImage[] = Array.isArray((p as any).images)
	      ? ((p as any).images as any[]).map((img, idx) => ({
	          id: img.id ?? idx,
	          url: img.url || img,
	          alt: img.alt || p.title,
	          thumbnail: img.thumbnail || img.url || img,
	        }))
	      : p.image
	        ? [
	            {
	              id: 1,
	              url: p.image,
	              alt: p.alt || p.title,
	              thumbnail: p.image,
	            },
	          ]
	        : [];

	    // Build specifications from available product data
	    const specifications: Specification[] = [];

	    // Add vehicle-specific specs if available
	    if ((p as any).year) {
	      specifications.push({ label: 'Baujahr', value: String((p as any).year), icon: 'CalendarIcon' });
	    }
	    if ((p as any).make) {
	      specifications.push({ label: 'Marke', value: (p as any).make, icon: 'BuildingOfficeIcon' });
	    }
	    if ((p as any).model) {
	      specifications.push({ label: 'Modell', value: (p as any).model, icon: 'TruckIcon' });
	    }
	    if ((p as any).mileage) {
	      specifications.push({ label: 'Kilometerstand', value: (p as any).mileage, icon: 'MapIcon' });
	    }
	    if ((p as any).fuelType || (p as any).fuel) {
	      specifications.push({ label: 'Kraftstoff', value: (p as any).fuelType || (p as any).fuel, icon: 'FireIcon' });
	    }
	    if (p.location) {
	      specifications.push({ label: 'Standort', value: p.location, icon: 'MapPinIcon' });
	    }

	    // Also include any custom specifications from Firestore
	    if (Array.isArray((p as any).specifications)) {
	      ((p as any).specifications as any[]).forEach((s) => {
	        specifications.push({
	          label: s.label,
	          value: s.value,
	          icon: s.icon,
	        });
	      });
	    }

	    // Normalize condition value
	    let condition = (p as any).condition || 'Gut';
	    const conditionLower = condition.toLowerCase().trim();
	    if (conditionLower === 'excellent' || conditionLower === 'ausgezeichnet' || conditionLower === 'sehr gut') {
	      condition = 'Sehr gut';
	    } else if (conditionLower === 'good' || conditionLower === 'gut') {
	      condition = 'Gut';
	    } else if (conditionLower === 'fair' || conditionLower === 'befriedigend') {
	      condition = 'Befriedigend';
	    } else if (conditionLower === 'needs_repair' || conditionLower === 'needs repair' || conditionLower === 'reparaturbedürftig') {
	      condition = 'Reparaturbedürftig';
	    }

	    // Map status to German if needed
	    let status = (p as any).status || 'Verfügbar';
	    const statusLower = status.toLowerCase().trim();
	    if (statusLower === 'available') {
	      status = 'Verfügbar';
	    } else if (statusLower === 'reserved') {
	      status = 'Reserviert';
	    } else if (statusLower === 'sold') {
	      status = 'Verkauft';
	    }

	    return {
	      id: p.id,
	      name: p.title,
	      category: (p as any).category || 'Verschiedenes',
	      dateAdded: (p as any).dateAdded || (p as any).createdAt || '',
	      status,
	      condition,
	      legalStatus: (p as any).legalStatus || 'Freigegeben',
	      provenance: (p as any).provenance || p.location || 'Deutschland',
	      estimatedValue: (p as any).estimatedValue || '',
	      images,
	      specifications,
	    };
	  };

	  const productId = searchParams?.get('id') || '';

	  useEffect(() => {
	    const loadProductAndRelated = async () => {
	      if (!productId) {
	        setError('Kein Produkt ausgewählt.');
	        setLoadingProduct(false);
	        return;
	      }

	      setLoadingProduct(true);
	      setError(null);
	      try {
	        const firestoreProduct = await getProductById(productId);
	        if (!firestoreProduct) {
	          setError('Produkt wurde nicht gefunden.');
	          setLoadingProduct(false);
	          return;
	        }

	        const mapped = mapFirestoreProductToLocal(firestoreProduct as FirestoreProduct);
	        setCurrentProduct(mapped);
	        setLoadingProduct(false);

	        // Load related products in parallel
	        setLoadingRelated(true);
	        const related = await getRelatedProducts(firestoreProduct.id, firestoreProduct.category);
	        const mappedRelated: RelatedProduct[] = related.map((rp) => ({
	          id: rp.id,
	          name: rp.title,
	          category: (rp as any).category || '',
	          image: rp.image || '',
	          alt: rp.alt || rp.title,
	          status: (rp as any).status || '',
	        }));
	        setRelatedProducts(mappedRelated);
	        setLoadingRelated(false);
	      } catch (err) {
	        console.error('Fehler beim Laden des Produkts', err);
	        setError('Produktdetails konnten nicht geladen werden.');
	        setLoadingProduct(false);
	        setLoadingRelated(false);
	      }
	    };

	    loadProductAndRelated();
	  }, [productId]);

	  if (!isHydrated || loadingProduct) {
	    return (
	      <div className="min-h-screen bg-background">
	        <div className="container mx-auto px-6 py-8">
	          <div className="animate-pulse space-y-8">
	            <div className="h-32 bg-muted rounded-lg"></div>
	            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
	              <div className="h-96 bg-muted rounded-lg"></div>
	              <div className="space-y-4">
	                <div className="h-8 bg-muted rounded"></div>
	                <div className="h-64 bg-muted rounded-lg"></div>
	              </div>
	            </div>
	          </div>
	        </div>
	      </div>
	    );
	  }

	  if (error) {
	    return (
	      <div className="min-h-screen bg-background">
	        <div className="container mx-auto px-6 py-8">
	          <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
	            {error}
	          </div>
	        </div>
	      </div>
	    );
	  }

	  if (!currentProduct) {
	    return null;
	  }

	  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8 space-y-12">
        {/* Product Header */}
        <ProductHeader
          productId={currentProduct.id}
          productName={currentProduct.name}
          category={currentProduct.category}
          dateAdded={currentProduct.dateAdded}
          status={currentProduct.status}
          estimatedValue={currentProduct.estimatedValue} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Images */}
          <div>
            <ProductImageGallery
              images={currentProduct.images}
              productName={currentProduct.name} />
          </div>

          {/* Right Column - Specifications */}
          <div>
            <ProductSpecifications
              specifications={currentProduct.specifications}
              condition={currentProduct.condition}
              legalStatus={currentProduct.legalStatus}
              provenance={currentProduct.provenance} />
          </div>
        </div>

        {/* Acquisition Process Section */}
        <AcquisitionProcess />

        {/* Inquiry Form */}
        <ProductInquiryForm
          productId={currentProduct.id}
          productName={currentProduct.name} />

	        {/* Related Products */}
	        <RelatedProducts
	          products={relatedProducts}
	          currentProductId={currentProduct.id} />

      </div>
    </div>);

};

export default ProductDetailInteractive;