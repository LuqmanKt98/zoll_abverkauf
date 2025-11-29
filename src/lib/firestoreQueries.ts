import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from './firebaseClient';
import type {
  CategoryDocument,
  FAQDocument,
  FeaturedProductDocument,
  PageContentDocument,
  ProcessStepDocument,
  Product,
  TrustIndicatorDocument,
} from './firestoreTypes';

export async function getCategories(): Promise<CategoryDocument[]> {
  const snapshot = await getDocs(collection(db, 'categories'));
  return snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as CategoryDocument[];
}

export async function getFeaturedProducts(): Promise<FeaturedProductDocument[]> {
  // Option A: dedicated featured collection
  const snapshot = await getDocs(collection(db, 'featuredProducts'));
  if (!snapshot.empty) {
    return snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as FeaturedProductDocument[];
  }

  // Option B: fallback to products with featured flag
  const q = query(collection(db, 'products'), where('featured', '==', true), limit(12));
  const productsSnapshot = await getDocs(q);
  return productsSnapshot.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as FeaturedProductDocument[];
}

export async function getProductsByCategory(
  category: string,
  maxItems = 50,
  status?: string,
): Promise<Product[]> {
  const constraints: any[] = [
    where('category', '==', category),
    limit(maxItems),
  ];

  if (status) {
    constraints.push(where('status', '==', status));
  }

  const q = query(
    collection(db, 'products'),
    ...constraints
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as Product[];
}

export async function getProductById(id: string): Promise<Product | null> {
  const ref = doc(db, 'products', id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...(snap.data() as any) } as Product;
}

export async function getRelatedProducts(
  productId: string,
  category?: string,
  maxItems = 4,
): Promise<Product[]> {
  let q;
  if (category) {
    q = query(
      collection(db, 'products'),
      where('category', '==', category),
      limit(maxItems + 1),
    );
  } else {
    q = query(collection(db, 'products'), limit(maxItems + 1));
  }

  const snapshot = await getDocs(q);
  const products = snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as Product[];
  return products.filter((p) => p.id !== productId).slice(0, maxItems);
}

// Static content queries
export async function getFAQsByCategory(category?: string): Promise<FAQDocument[]> {
  let q;
  if (category) {
    q = query(
      collection(db, 'faqs'),
      where('category', '==', category),
      orderBy('order', 'asc'),
    );
  } else {
    q = query(collection(db, 'faqs'), orderBy('order', 'asc'));
  }

  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as FAQDocument[];
}

export async function getProcessSteps(processType?: string): Promise<ProcessStepDocument[]> {
  let q;
  if (processType) {
    q = query(
      collection(db, 'processSteps'),
      where('processType', '==', processType),
      orderBy('order', 'asc'),
    );
  } else {
    q = query(collection(db, 'processSteps'), orderBy('order', 'asc'));
  }

  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as ProcessStepDocument[];
}

export async function getTrustIndicators(): Promise<TrustIndicatorDocument[]> {
  const q = query(collection(db, 'trustIndicators'), orderBy('order', 'asc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as TrustIndicatorDocument[];
}

export async function getPageContent(
  pageId: string,
  sectionId?: string,
): Promise<PageContentDocument | PageContentDocument[] | null> {
  if (sectionId) {
    // Get specific section content
    const q = query(
      collection(db, 'pageContent'),
      where('pageId', '==', pageId),
      where('sectionId', '==', sectionId),
      limit(1),
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    return { id: snapshot.docs[0].id, ...(snapshot.docs[0].data() as any) } as PageContentDocument;
  } else {
    // Get all content for a page
    const q = query(collection(db, 'pageContent'), where('pageId', '==', pageId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as PageContentDocument[];
  }
}
