'use client';

import React, { useState, useCallback } from 'react';
import Icon from '@/components/ui/AppIcon';
import JSZip from 'jszip';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebaseClient';

interface ExtractedImage {
  name: string;
  title: string;
  blob: Blob;
  preview: string;
  selected: boolean;
}

interface AdminUploadAreaProps {
  onUploadSuccess: (products: any[]) => void;
  adminUsername: string;
}

const AdminUploadArea = ({ onUploadSuccess, adminUsername }: AdminUploadAreaProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [extractedImages, setExtractedImages] = useState<ExtractedImage[]>([]);
  const [defaultCategory, setDefaultCategory] = useState('Fahrzeuge');
  const [defaultPrice, setDefaultPrice] = useState(1000);
  const [defaultCondition, setDefaultCondition] = useState('Gut');
  const [defaultLocation, setDefaultLocation] = useState('Deutschland');
  const [uploadResults, setUploadResults] = useState<{ success: number; failed: number } | null>(null);

  const categories = ['Fahrzeuge', 'Edelmetalle', 'Bau-/Landmaschinen', 'Verschiedenes'];
  const conditions = ['Neu', 'Ausgezeichnet', 'Gut', 'Gebraucht'];

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    const zipFile = files.find(file => file.name.toLowerCase().endsWith('.zip'));

    if (zipFile) {
      processZipFile(zipFile);
    } else {
      alert('Bitte laden Sie eine ZIP-Datei hoch.');
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.name.toLowerCase().endsWith('.zip')) {
      processZipFile(file);
    } else {
      alert('Bitte wählen Sie eine ZIP-Datei aus.');
    }
  };

  const processZipFile = async (file: File) => {
    setIsProcessing(true);
    setUploadProgress(0);
    setExtractedImages([]);
    setUploadResults(null);

    try {
      const zip = await JSZip.loadAsync(file);
      const images: ExtractedImage[] = [];
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

      const fileNames = Object.keys(zip.files).filter(name => {
        const lowerName = name.toLowerCase();
        return !zip.files[name].dir && imageExtensions.some(ext => lowerName.endsWith(ext));
      });

      for (let i = 0; i < fileNames.length; i++) {
        const fileName = fileNames[i];
        const zipEntry = zip.files[fileName];

        try {
          const blob = await zipEntry.async('blob');
          const preview = URL.createObjectURL(blob);

          // Extract title from filename (remove extension and path)
          const baseName = fileName.split('/').pop() || fileName;
          const title = baseName
            .replace(/\.[^/.]+$/, '') // Remove extension
            .replace(/[-_]/g, ' ') // Replace dashes/underscores with spaces
            .replace(/\b\w/g, l => l.toUpperCase()); // Capitalize words

          images.push({
            name: fileName,
            title,
            blob,
            preview,
            selected: true
          });
        } catch (err) {
          console.error(`Error extracting ${fileName}:`, err);
        }

        setUploadProgress(Math.round(((i + 1) / fileNames.length) * 100));
      }

      setExtractedImages(images);
    } catch (error) {
      console.error('Error processing ZIP:', error);
      alert('Fehler beim Verarbeiten der ZIP-Datei.');
    } finally {
      setIsProcessing(false);
    }
  };

  const toggleImageSelection = (index: number) => {
    setExtractedImages(prev => prev.map((img, i) =>
      i === index ? { ...img, selected: !img.selected } : img
    ));
  };

  const updateImageTitle = (index: number, newTitle: string) => {
    setExtractedImages(prev => prev.map((img, i) =>
      i === index ? { ...img, title: newTitle } : img
    ));
  };

  const selectAll = () => {
    setExtractedImages(prev => prev.map(img => ({ ...img, selected: true })));
  };

  const deselectAll = () => {
    setExtractedImages(prev => prev.map(img => ({ ...img, selected: false })));
  };

  const handleUploadProducts = async () => {
    const selectedImages = extractedImages.filter(img => img.selected);
    if (selectedImages.length === 0) {
      alert('Bitte wählen Sie mindestens ein Bild aus.');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    let successCount = 0;
    let failedCount = 0;

    for (let i = 0; i < selectedImages.length; i++) {
      const img = selectedImages[i];

      try {
        // Upload image to Firebase Storage
        const storageRef = ref(storage, `products/${Date.now()}_${img.name.split('/').pop()}`);
        await uploadBytes(storageRef, img.blob);
        const imageUrl = await getDownloadURL(storageRef);

        // Create product in Firestore
        await addDoc(collection(db, 'products'), {
          title: img.title,
          category: defaultCategory,
          price: defaultPrice,
          condition: defaultCondition,
          location: defaultLocation,
          image: imageUrl,
          images: [imageUrl],
          status: 'available',
          description: `${img.title} - Aus Zollverwertung`,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          createdBy: adminUsername
        });

        successCount++;
      } catch (error) {
        console.error(`Error uploading ${img.title}:`, error);
        failedCount++;
      }

      setUploadProgress(Math.round(((i + 1) / selectedImages.length) * 100));
    }

    setUploadResults({ success: successCount, failed: failedCount });
    setIsUploading(false);

    if (successCount > 0) {
      onUploadSuccess([]);
      // Clean up previews
      extractedImages.forEach(img => URL.revokeObjectURL(img.preview));
      setExtractedImages([]);
    }
  };

  const handleCancel = () => {
    extractedImages.forEach(img => URL.revokeObjectURL(img.preview));
    setExtractedImages([]);
    setUploadResults(null);
  };

  return (
    <div className="space-y-6">
      {/* Simple Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="InformationCircleIcon" size={20} className="text-blue-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-blue-800 mb-1">Einfacher Bulk-Upload</h3>
            <p className="text-sm text-blue-700">
              Laden Sie eine ZIP-Datei mit Produktbildern hoch. Jedes Bild wird zu einem Produkt.
              Der Dateiname wird als Produkttitel verwendet.
            </p>
          </div>
        </div>
      </div>

      {/* Upload Area */}
      {extractedImages.length === 0 && (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragOver
              ? 'border-brand-primary bg-brand-primary/5'
              : 'border-border bg-muted/30 hover:border-brand-primary hover:bg-brand-primary/5'
          }`}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
              isDragOver ? 'bg-brand-primary text-white' : 'bg-brand-primary/10 text-brand-primary'
            }`}>
              <Icon name="CloudArrowUpIcon" size={32} />
            </div>
            <div>
              <p className="text-lg font-medium text-text-primary">
                {isDragOver ? 'ZIP-Datei hier ablegen' : 'ZIP mit Bildern hochladen'}
              </p>
              <p className="text-text-secondary text-sm">
                ZIP-Datei mit JPG, PNG oder WebP Bildern
              </p>
            </div>
            <input
              type="file"
              accept=".zip"
              onChange={handleFileInput}
              className="hidden"
              id="zip-upload"
              disabled={isProcessing}
            />
            <label
              htmlFor="zip-upload"
              className={`btn-primary cursor-pointer ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isProcessing ? 'Wird verarbeitet...' : 'ZIP-Datei auswählen'}
            </label>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      {(isProcessing || isUploading) && (
        <div className="bg-white border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-2">
            <Icon name="Cog6ToothIcon" size={20} className="text-brand-primary animate-spin" />
            <span className="font-medium">
              {isProcessing ? 'Bilder werden extrahiert...' : 'Produkte werden erstellt...'}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-brand-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="text-xs text-text-secondary mt-1">{uploadProgress}% abgeschlossen</p>
        </div>
      )}

      {/* Upload Results */}
      {uploadResults && (
        <div className="bg-white border border-border rounded-lg p-6">
          <h3 className="text-lg font-bold text-text-primary mb-4">Upload abgeschlossen</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <Icon name="CheckCircleIcon" size={32} className="text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-800">{uploadResults.success}</p>
              <p className="text-sm text-green-700">Erfolgreich erstellt</p>
            </div>
            {uploadResults.failed > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                <Icon name="XCircleIcon" size={32} className="text-red-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-red-800">{uploadResults.failed}</p>
                <p className="text-sm text-red-700">Fehlgeschlagen</p>
              </div>
            )}
          </div>
          <button
            onClick={() => setUploadResults(null)}
            className="btn-primary w-full mt-4"
          >
            Weitere Produkte hochladen
          </button>
        </div>
      )}

      {/* Image Preview & Settings */}
      {extractedImages.length > 0 && !uploadResults && (
        <div className="bg-white border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-text-primary">
              {extractedImages.length} Bilder gefunden
            </h3>
            <div className="flex space-x-2">
              <button onClick={selectAll} className="text-sm text-brand-primary hover:underline">
                Alle auswählen
              </button>
              <span className="text-text-secondary">|</span>
              <button onClick={deselectAll} className="text-sm text-brand-primary hover:underline">
                Alle abwählen
              </button>
            </div>
          </div>

          {/* Default Settings */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-muted/50 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Kategorie</label>
              <select
                value={defaultCategory}
                onChange={(e) => setDefaultCategory(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg text-sm"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Preis (€)</label>
              <input
                type="number"
                value={defaultPrice}
                onChange={(e) => setDefaultPrice(Number(e.target.value))}
                className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Zustand</label>
              <select
                value={defaultCondition}
                onChange={(e) => setDefaultCondition(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg text-sm"
              >
                {conditions.map(cond => (
                  <option key={cond} value={cond}>{cond}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Standort</label>
              <input
                type="text"
                value={defaultLocation}
                onChange={(e) => setDefaultLocation(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg text-sm"
              />
            </div>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto mb-6">
            {extractedImages.map((img, index) => (
              <div
                key={index}
                className={`relative border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${
                  img.selected ? 'border-brand-primary ring-2 ring-brand-primary/20' : 'border-border opacity-50'
                }`}
                onClick={() => toggleImageSelection(index)}
              >
                <img
                  src={img.preview}
                  alt={img.title}
                  className="w-full h-32 object-cover"
                />
                <div className="p-2 bg-white">
                  <input
                    type="text"
                    value={img.title}
                    onChange={(e) => {
                      e.stopPropagation();
                      updateImageTitle(index, e.target.value);
                    }}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full text-xs px-2 py-1 border border-border rounded"
                  />
                </div>
                <div className={`absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center ${
                  img.selected ? 'bg-brand-primary text-white' : 'bg-white border border-border'
                }`}>
                  {img.selected && <Icon name="CheckIcon" size={14} />}
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <p className="text-sm text-text-secondary">
              {extractedImages.filter(img => img.selected).length} von {extractedImages.length} ausgewählt
            </p>
            <div className="flex space-x-3">
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-border rounded-lg text-text-secondary hover:text-text-primary"
                disabled={isUploading}
              >
                Abbrechen
              </button>
              <button
                onClick={handleUploadProducts}
                className="btn-primary"
                disabled={isUploading || extractedImages.filter(img => img.selected).length === 0}
              >
                {extractedImages.filter(img => img.selected).length} Produkte erstellen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUploadArea;
