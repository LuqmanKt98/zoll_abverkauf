// Shared TypeScript types describing the Firestore data model used
// across the Zoll-Abverkauf application.

export type ProductCategory =
  | 'Fahrzeuge'
  | 'Edelmetalle'
  | 'Bau-/Landmaschinen'
  | 'Verschiedenes';

export interface BaseProduct {
  id: string; // Official product identifier (also used as Firestore doc id)
  title: string;
  category: ProductCategory;
  description?: string;
  estimatedValue?: string;
  status?: string;
  image?: string;
  alt?: string;
  location?: string;
  createdAt?: string;
  batchId?: string; // Upload batch reference for rollback
}

// Optional, category-specific product extensions
export interface VehicleFields {
  year?: number;
  make?: string;
  model?: string;
  condition?: string;
  mileage?: string;
  fuelType?: string;
}

export interface PreciousMetalFields {
  metalType?: string;
  purity?: string;
  weight?: string;
  assayInfo?: string;
  marketValue?: string;
  certification?: string;
}

export interface MachineryFields {
  type?: string;
  manufacturer?: string;
  operatingHours?: number;
  inspectionDate?: string;
  specifications?: {
    power?: string;
    weight?: string;
    dimensions?: string;
  };
}

export interface MiscProductFields {
  condition?: string;
  source?: string;
  tags?: string[];
}

export type Product = BaseProduct &
  VehicleFields &
  PreciousMetalFields &
  MachineryFields &
  MiscProductFields;

export interface CategoryDocument {
  id: string; // slug / technical id
  name: string;
  description: string;
  href: string;
  image: string;
  alt: string;
  itemCount?: number;
  icon?: string;
  order?: number;
}

export interface FeaturedProductDocument {
  id: string;
  title: string;
  category: ProductCategory | string;
  officialId: string;
  estimatedValue: string;
  image: string;
  alt: string;
  condition: string;
  status: string;
}

export interface InquiryDocument {
  id?: string;
  name: string;
  email: string;
  message: string;
  productId?: string;
  category?: string;
  createdAt: string;
}

export interface UploadBatchDocument {
  id: string;
  admin: string;
  filename: string;
  productsCount: number;
  status: 'success' | 'error' | 'partial' | 'rolled_back';
  createdAt: string;
}

// Static content types for CMS-like functionality
export interface FAQDocument {
  id: string;
  question: string;
  answer: string;
  category?: string; // e.g., 'Fahrzeuge', 'Edelmetalle', 'general'
  order?: number;
}

export interface ProcessStepDocument {
  id: string;
  title: string;
  description: string;
  icon?: string;
  order: number;
  processType?: string; // e.g., 'acquisition', 'homepage'
}

export interface TrustIndicatorDocument {
  id: string;
  title: string;
  description: string;
  icon?: string;
  order?: number;
}

export interface PageContentDocument {
  id: string; // e.g., 'homepage-hero', 'vehicles-description'
  pageId: string; // e.g., 'homepage', 'vehicles'
  sectionId: string; // e.g., 'hero', 'description'
  content: {
    title?: string;
    subtitle?: string;
    description?: string;
    cta?: string;
    [key: string]: any; // Allow flexible content structure
  };
}
