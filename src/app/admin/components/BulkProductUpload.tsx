'use client';

import React, { useState, useCallback } from 'react';
import Icon from '@/components/ui/AppIcon';
import JSZip from 'jszip';
import { collection, addDoc, writeBatch, serverTimestamp, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebaseClient';
import { toast } from 'sonner';
import type { ProductCategory } from '@/lib/firestoreTypes';

// Configuration limits
const CONFIG = {
  MAX_PRODUCTS_PER_ZIP: 100, // Maximum products in one ZIP
  MAX_IMAGES_PER_PRODUCT: 10,
  MAX_IMAGE_SIZE_MB: 5,
  MAX_ZIP_SIZE_MB: 100,
  CONCURRENT_UPLOADS: 5, // Parallel image uploads
  BATCH_SIZE: 10, // Products per Firestore batch
};

// Validation schema for product JSON
interface ProductJSONSchema {
  title: string;
  category: ProductCategory;
  description?: string;
  price: number;
  condition?: string;
  location?: string;
  status?: string;
  // Vehicle fields
  year?: number;
  make?: string;
  model?: string;
  mileage?: string;
  fuelType?: string;
  // Precious metals fields
  metalType?: string;
  purity?: string;
  weight?: string;
  certification?: string;
  // Machinery fields
  manufacturer?: string;
  operatingHours?: number;
  machineType?: string;
  // Misc fields
  source?: string;
  tags?: string[];
}

interface ExtractedProduct {
  folderName: string;
  json: ProductJSONSchema;
  images: { name: string; blob: Blob }[];
  valid: boolean;
  errors: string[];
}

interface UploadProgress {
  stage: 'idle' | 'extracting' | 'validating' | 'uploading' | 'complete';
  current: number;
  total: number;
  message: string;
}

interface UploadResult {
  success: ExtractedProduct[];
  failed: { product: ExtractedProduct; error: string }[];
  batchId: string;
}

interface BulkProductUploadProps {
  onUploadSuccess: (count: number, batchId: string) => void;
  adminUsername: string;
}

const VALID_CATEGORIES: ProductCategory[] = ['Fahrzeuge', 'Edelmetalle', 'Bau-/Landmaschinen', 'Verschiedenes'];

const BulkProductUpload: React.FC<BulkProductUploadProps> = ({ onUploadSuccess, adminUsername }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [progress, setProgress] = useState<UploadProgress>({ stage: 'idle', current: 0, total: 0, message: '' });
  const [extractedProducts, setExtractedProducts] = useState<ExtractedProduct[]>([]);
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null);
  const [showValidation, setShowValidation] = useState(false);

  // Validate product JSON against schema
  const validateProductJSON = (json: any, folderName: string): { valid: boolean; data: ProductJSONSchema | null; errors: string[] } => {
    const errors: string[] = [];

    if (!json || typeof json !== 'object') {
      return { valid: false, data: null, errors: ['Ungültiges JSON-Format'] };
    }

    // Required fields
    if (!json.title || typeof json.title !== 'string') {
      errors.push('Titel ist erforderlich (string)');
    }

    if (!json.category || !VALID_CATEGORIES.includes(json.category)) {
      errors.push(`Kategorie muss einer der folgenden sein: ${VALID_CATEGORIES.join(', ')}`);
    }

    if (typeof json.price !== 'number' || json.price < 0) {
      errors.push('Preis muss eine positive Zahl sein');
    }

    // Optional field validations
    if (json.year !== undefined && (typeof json.year !== 'number' || json.year < 1900 || json.year > 2030)) {
      errors.push('Jahr muss zwischen 1900 und 2030 liegen');
    }

    if (json.operatingHours !== undefined && (typeof json.operatingHours !== 'number' || json.operatingHours < 0)) {
      errors.push('Betriebsstunden müssen positiv sein');
    }

    if (json.tags !== undefined && !Array.isArray(json.tags)) {
      errors.push('Tags müssen ein Array sein');
    }

    return {
      valid: errors.length === 0,
      data: errors.length === 0 ? json as ProductJSONSchema : null,
      errors
    };
  };

  // Process ZIP file
  const processZipFile = async (file: File) => {
    // Validate file size
    if (file.size > CONFIG.MAX_ZIP_SIZE_MB * 1024 * 1024) {
      toast.error(`ZIP-Datei darf maximal ${CONFIG.MAX_ZIP_SIZE_MB}MB groß sein`);
      return;
    }

    setProgress({ stage: 'extracting', current: 0, total: 0, message: 'ZIP-Datei wird gelesen...' });
    setExtractedProducts([]);
    setUploadResult(null);

    try {
      const zip = await JSZip.loadAsync(file);
      const products: ExtractedProduct[] = [];
      
      // Find all product folders (folders containing product.json)
      const folders = new Map<string, { json: any | null; images: { name: string; blob: Blob }[] }>();
      
      // Initialize folders from directory structure
      for (const path of Object.keys(zip.files)) {
        const parts = path.split('/');
        if (parts.length >= 2) {
          const folderName = parts[0];
          if (!folders.has(folderName)) {
            folders.set(folderName, { json: null, images: [] });
          }
        }
      }

      setProgress({ stage: 'extracting', current: 0, total: folders.size, message: 'Produkte werden extrahiert...' });

      // Check product limit
      if (folders.size > CONFIG.MAX_PRODUCTS_PER_ZIP) {
        toast.error(`Maximal ${CONFIG.MAX_PRODUCTS_PER_ZIP} Produkte pro ZIP erlaubt (gefunden: ${folders.size})`);
        setProgress({ stage: 'idle', current: 0, total: 0, message: '' });
        return;
      }

      // Extract content from each folder
      let processedCount = 0;
      for (const [folderName, data] of folders) {
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

        for (const [path, zipEntry] of Object.entries(zip.files)) {
          if (zipEntry.dir) continue;
          if (!path.startsWith(folderName + '/')) continue;

          const fileName = path.split('/').pop()?.toLowerCase() || '';

          // Check for product.json
          if (fileName === 'product.json') {
            try {
              const jsonText = await zipEntry.async('text');
              data.json = JSON.parse(jsonText);
            } catch (e) {
              data.json = { _parseError: true };
            }
          }
          // Check for images
          else if (imageExtensions.some(ext => fileName.endsWith(ext))) {
            const blob = await zipEntry.async('blob');
            if (blob.size <= CONFIG.MAX_IMAGE_SIZE_MB * 1024 * 1024) {
              if (data.images.length < CONFIG.MAX_IMAGES_PER_PRODUCT) {
                data.images.push({ name: path.split('/').pop() || fileName, blob });
              }
            }
          }
        }

        processedCount++;
        setProgress({ stage: 'extracting', current: processedCount, total: folders.size, message: `${processedCount}/${folders.size} Ordner verarbeitet` });
      }

      // Validate products
      setProgress({ stage: 'validating', current: 0, total: folders.size, message: 'Produkte werden validiert...' });

      let validatedCount = 0;
      for (const [folderName, data] of folders) {
        const errors: string[] = [];
        let valid = true;
        let productData: ProductJSONSchema | null = null;

        // Check if product.json exists
        if (!data.json) {
          errors.push('product.json fehlt im Ordner');
          valid = false;
        } else if (data.json._parseError) {
          errors.push('product.json ist kein gültiges JSON');
          valid = false;
        } else {
          const validation = validateProductJSON(data.json, folderName);
          valid = validation.valid;
          productData = validation.data;
          errors.push(...validation.errors);
        }

        // Check for images
        if (data.images.length === 0) {
          errors.push('Keine Bilder gefunden');
          valid = false;
        }

        products.push({
          folderName,
          json: productData || { title: folderName, category: 'Verschiedenes', price: 0 },
          images: data.images,
          valid,
          errors
        });

        validatedCount++;
        setProgress({ stage: 'validating', current: validatedCount, total: folders.size, message: `${validatedCount}/${folders.size} validiert` });
      }

      setExtractedProducts(products);
      setShowValidation(true);
      setProgress({ stage: 'idle', current: 0, total: 0, message: '' });

      const validCount = products.filter(p => p.valid).length;
      const invalidCount = products.length - validCount;

      if (invalidCount > 0) {
        toast.warning(`${validCount} gültige und ${invalidCount} ungültige Produkte gefunden`);
      } else {
        toast.success(`${validCount} Produkte bereit zum Upload`);
      }

    } catch (error) {
      console.error('Error processing ZIP:', error);
      toast.error('Fehler beim Verarbeiten der ZIP-Datei');
      setProgress({ stage: 'idle', current: 0, total: 0, message: '' });
    }
  };

  // Upload images in parallel with concurrency limit
  const uploadImagesWithConcurrency = async (
    images: { name: string; blob: Blob }[],
    basePath: string
  ): Promise<string[]> => {
    const results: string[] = [];
    const queue = [...images];
    const inProgress: Promise<void>[] = [];

    const uploadSingle = async (img: { name: string; blob: Blob }): Promise<string> => {
      const fileName = `${Date.now()}-${img.name}`;
      const storageRef = ref(storage, `${basePath}/${fileName}`);
      await uploadBytes(storageRef, img.blob);
      return getDownloadURL(storageRef);
    };

    while (queue.length > 0 || inProgress.length > 0) {
      while (inProgress.length < CONFIG.CONCURRENT_UPLOADS && queue.length > 0) {
        const img = queue.shift()!;
        const promise = uploadSingle(img)
          .then(url => { results.push(url); })
          .finally(() => {
            const idx = inProgress.indexOf(promise);
            if (idx !== -1) inProgress.splice(idx, 1);
          });
        inProgress.push(promise);
      }
      if (inProgress.length > 0) {
        await Promise.race(inProgress);
      }
    }

    return results;
  };

  // Upload all products to Firebase
  const handleUploadProducts = async () => {
    const validProducts = extractedProducts.filter(p => p.valid);
    if (validProducts.length === 0) {
      toast.error('Keine gültigen Produkte zum Hochladen');
      return;
    }

    const batchId = `batch-${Date.now()}`;
    setProgress({ stage: 'uploading', current: 0, total: validProducts.length, message: 'Upload wird gestartet...' });

    const success: ExtractedProduct[] = [];
    const failed: { product: ExtractedProduct; error: string }[] = [];

    // Process products in batches
    for (let i = 0; i < validProducts.length; i += CONFIG.BATCH_SIZE) {
      const batchProducts = validProducts.slice(i, i + CONFIG.BATCH_SIZE);

      for (const product of batchProducts) {
        try {
          // Upload images first
          const productId = `product-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
          const imageUrls = await uploadImagesWithConcurrency(product.images, `products/${productId}`);

          if (imageUrls.length === 0) {
            throw new Error('Keine Bilder hochgeladen');
          }

          // Create product document
          const productData = {
            ...product.json,
            images: imageUrls,
            image: imageUrls[0],
            estimatedValue: `€${product.json.price.toLocaleString('de-DE')}`,
            status: product.json.status || 'available',
            batchId,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            createdBy: adminUsername
          };

          await addDoc(collection(db, 'products'), productData);
          success.push(product);

        } catch (error: any) {
          console.error(`Error uploading product ${product.folderName}:`, error);
          failed.push({ product, error: error.message || 'Unbekannter Fehler' });
        }

        setProgress({
          stage: 'uploading',
          current: success.length + failed.length,
          total: validProducts.length,
          message: `${success.length + failed.length}/${validProducts.length} verarbeitet`
        });
      }
    }

    // Save batch record for rollback capability
    try {
      await addDoc(collection(db, 'uploadBatches'), {
        id: batchId,
        admin: adminUsername,
        filename: 'bulk-upload.zip',
        productsCount: success.length,
        failedCount: failed.length,
        status: failed.length === 0 ? 'success' : (success.length > 0 ? 'partial' : 'error'),
        createdAt: serverTimestamp()
      });
    } catch (e) {
      console.error('Error saving batch record:', e);
    }

    setUploadResult({ success, failed, batchId });
    setProgress({ stage: 'complete', current: validProducts.length, total: validProducts.length, message: 'Abgeschlossen' });

    if (success.length > 0) {
      onUploadSuccess(success.length, batchId);
      toast.success(`${success.length} Produkte erfolgreich hochgeladen`);
    }
    if (failed.length > 0) {
      toast.error(`${failed.length} Produkte fehlgeschlagen`);
    }
  };

  // Handle file drop
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    const zipFile = files.find(f => f.name.toLowerCase().endsWith('.zip'));
    if (zipFile) {
      processZipFile(zipFile);
    } else {
      toast.error('Bitte laden Sie eine ZIP-Datei hoch');
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.name.toLowerCase().endsWith('.zip')) {
      processZipFile(file);
    } else if (file) {
      toast.error('Bitte wählen Sie eine ZIP-Datei aus');
    }
  };

  const resetUpload = () => {
    setExtractedProducts([]);
    setUploadResult(null);
    setShowValidation(false);
    setProgress({ stage: 'idle', current: 0, total: 0, message: '' });
  };

  const getProgressPercent = () => {
    if (progress.total === 0) return 0;
    return Math.round((progress.current / progress.total) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="InformationCircleIcon" size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-blue-800 mb-1">Bulk-Upload mit JSON-Spezifikationen</h3>
            <p className="text-sm text-blue-700 mb-2">
              Laden Sie eine ZIP-Datei mit Produktordnern hoch. Jeder Ordner muss eine <code className="bg-blue-100 px-1 rounded">product.json</code> Datei und Produktbilder enthalten.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-blue-600">
              <span>• Max {CONFIG.MAX_PRODUCTS_PER_ZIP} Produkte</span>
              <span>• Max {CONFIG.MAX_IMAGES_PER_PRODUCT} Bilder/Produkt</span>
              <span>• Max {CONFIG.MAX_IMAGE_SIZE_MB}MB/Bild</span>
              <span>• Max {CONFIG.MAX_ZIP_SIZE_MB}MB ZIP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Area - Show when no products extracted and not complete */}
      {extractedProducts.length === 0 && progress.stage !== 'complete' && (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragOver
              ? 'border-brand-primary bg-brand-primary/5'
              : 'border-border bg-muted/30 hover:border-brand-primary hover:bg-brand-primary/5'
          } ${progress.stage !== 'idle' ? 'pointer-events-none opacity-60' : ''}`}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
              isDragOver ? 'bg-brand-primary text-white' : 'bg-brand-primary/10 text-brand-primary'
            }`}>
              <Icon name="ArchiveBoxIcon" size={32} />
            </div>
            <div>
              <p className="text-lg font-medium text-text-primary">
                {isDragOver ? 'ZIP-Datei hier ablegen' : 'ZIP mit Produktordnern hochladen'}
              </p>
              <p className="text-text-secondary text-sm">
                Jeder Ordner: product.json + Bilder (JPG, PNG, WebP)
              </p>
            </div>
            <input
              type="file"
              accept=".zip"
              onChange={handleFileInput}
              className="hidden"
              id="bulk-zip-upload"
              disabled={progress.stage !== 'idle'}
            />
            <label
              htmlFor="bulk-zip-upload"
              className={`btn-primary cursor-pointer ${progress.stage !== 'idle' ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              ZIP-Datei auswählen
            </label>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      {progress.stage !== 'idle' && progress.stage !== 'complete' && (
        <div className="bg-white border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-2">
            <Icon name="Cog6ToothIcon" size={20} className="text-brand-primary animate-spin" />
            <span className="font-medium">{progress.message}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-brand-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${getProgressPercent()}%` }}
            />
          </div>
          <p className="text-xs text-text-secondary mt-1">{getProgressPercent()}% abgeschlossen</p>
        </div>
      )}

      {/* Validation View - Show extracted products */}
      {showValidation && extractedProducts.length > 0 && !uploadResult && (
        <div className="bg-white border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-text-primary">
              {extractedProducts.length} Produkte gefunden
            </h3>
            <div className="flex items-center space-x-4 text-sm">
              <span className="text-green-600 flex items-center gap-1">
                <Icon name="CheckCircleIcon" size={16} />
                {extractedProducts.filter(p => p.valid).length} gültig
              </span>
              <span className="text-red-600 flex items-center gap-1">
                <Icon name="XCircleIcon" size={16} />
                {extractedProducts.filter(p => !p.valid).length} ungültig
              </span>
            </div>
          </div>

          {/* Product List */}
          <div className="max-h-96 overflow-y-auto space-y-2 mb-4">
            {extractedProducts.map((product, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg border ${
                  product.valid ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Icon
                        name={product.valid ? 'CheckCircleIcon' : 'ExclamationTriangleIcon'}
                        size={18}
                        className={product.valid ? 'text-green-600' : 'text-red-600'}
                      />
                      <span className="font-medium">{product.json.title || product.folderName}</span>
                      <span className="text-xs px-2 py-0.5 bg-white rounded-full border">
                        {product.json.category}
                      </span>
                    </div>
                    <div className="text-sm text-text-secondary mt-1 flex items-center gap-4">
                      <span>€{product.json.price?.toLocaleString('de-DE') || 0}</span>
                      <span>{product.images.length} Bild(er)</span>
                    </div>
                    {product.errors.length > 0 && (
                      <ul className="text-xs text-red-600 mt-2 space-y-0.5">
                        {product.errors.map((err, i) => (
                          <li key={i}>• {err}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  {product.images.length > 0 && (
                    <img
                      src={URL.createObjectURL(product.images[0].blob)}
                      alt="Preview"
                      className="w-16 h-16 object-cover rounded-lg ml-4"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center pt-4 border-t border-border">
            <button
              onClick={resetUpload}
              className="px-4 py-2 text-text-secondary hover:text-text-primary border border-border rounded-lg"
              disabled={progress.stage === 'uploading'}
            >
              Abbrechen
            </button>
            <button
              onClick={handleUploadProducts}
              className="btn-primary"
              disabled={progress.stage === 'uploading' || extractedProducts.filter(p => p.valid).length === 0}
            >
              {extractedProducts.filter(p => p.valid).length} Produkte hochladen
            </button>
          </div>
        </div>
      )}

      {/* Upload Results */}
      {uploadResult && (
        <div className="bg-white border border-border rounded-lg p-6">
          <h3 className="text-lg font-bold text-text-primary mb-4">Upload abgeschlossen</h3>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <Icon name="CheckCircleIcon" size={32} className="text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-800">{uploadResult.success.length}</p>
              <p className="text-sm text-green-700">Erfolgreich hochgeladen</p>
            </div>
            {uploadResult.failed.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                <Icon name="XCircleIcon" size={32} className="text-red-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-red-800">{uploadResult.failed.length}</p>
                <p className="text-sm text-red-700">Fehlgeschlagen</p>
              </div>
            )}
          </div>

          {/* Batch ID for reference */}
          <div className="bg-muted/50 rounded-lg p-3 mb-4">
            <p className="text-sm text-text-secondary">
              <span className="font-medium">Batch-ID:</span> {uploadResult.batchId}
            </p>
            <p className="text-xs text-text-secondary mt-1">
              Diese ID kann für Rollbacks verwendet werden.
            </p>
          </div>

          {/* Failed products details */}
          {uploadResult.failed.length > 0 && (
            <div className="mb-4">
              <h4 className="font-medium text-red-800 mb-2">Fehlgeschlagene Produkte:</h4>
              <ul className="text-sm space-y-1">
                {uploadResult.failed.map((item, idx) => (
                  <li key={idx} className="text-red-600">
                    • {item.product.folderName}: {item.error}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button onClick={resetUpload} className="btn-primary w-full">
            Weitere Produkte hochladen
          </button>
        </div>
      )}

      {/* JSON Schema Reference */}
      <details className="bg-muted/30 rounded-lg p-4">
        <summary className="cursor-pointer font-medium text-text-primary flex items-center gap-2">
          <Icon name="DocumentTextIcon" size={18} />
          JSON-Schema Referenz
        </summary>
        <div className="mt-4 bg-white rounded-lg p-4 overflow-x-auto">
          <pre className="text-xs text-text-secondary">{`{
  "title": "BMW 320i 2018",          // Erforderlich
  "category": "Fahrzeuge",            // Erforderlich: Fahrzeuge | Edelmetalle | Bau-/Landmaschinen | Verschiedenes
  "price": 15000,                     // Erforderlich: Zahl
  "description": "Beschreibung...",   // Optional
  "condition": "Gut",                 // Optional
  "location": "Hamburg",              // Optional

  // Fahrzeuge-spezifische Felder:
  "year": 2018,
  "make": "BMW",
  "model": "320i",
  "mileage": "45.000 km",
  "fuelType": "Benzin",

  // Edelmetalle-spezifische Felder:
  "metalType": "Gold",
  "purity": "999",
  "weight": "100g",
  "certification": "LBMA",

  // Maschinen-spezifische Felder:
  "manufacturer": "Caterpillar",
  "operatingHours": 1500,
  "machineType": "Bagger",

  // Verschiedenes-spezifische Felder:
  "source": "Zollbeschlagnahmung",
  "tags": ["elektronik", "sammlerstück"]
}`}</pre>
        </div>
      </details>
    </div>
  );
};

export default BulkProductUpload;

