'use client';

import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface ProductImage {
  id: number;
  url: string;
  alt: string;
  thumbnail: string;
}

interface ProductImageGalleryProps {
  images: ProductImage[];
  productName: string;
}

const ProductImageGallery = ({ images, productName }: ProductImageGalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const handlePreviousImage = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  if (!images || images.length === 0) {
    return (
      <div className="bg-muted rounded-lg p-8 text-center">
        <Icon name="PhotoIcon" size={48} className="mx-auto text-muted-foreground mb-4" />
        <p className="text-muted-foreground">Keine Bilder verfügbar</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <div className="relative bg-white rounded-lg border overflow-hidden">
        <div className="aspect-square relative group">
          <AppImage
            src={images[selectedImageIndex].url}
            alt={images[selectedImageIndex].alt}
            className={`w-full h-full object-cover cursor-zoom-in transition-transform duration-300 ${
              isZoomed ? 'scale-150' : 'scale-100'
            }`}
            onClick={toggleZoom}
          />
          
          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePreviousImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-label="Vorheriges Bild"
              >
                <Icon name="ChevronLeftIcon" size={20} className="text-text-primary" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-label="Nächstes Bild"
              >
                <Icon name="ChevronRightIcon" size={20} className="text-text-primary" />
              </button>
            </>
          )}

          {/* Zoom Indicator */}
          <div className="absolute top-2 right-2 bg-white/90 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Icon 
              name={isZoomed ? "MagnifyingGlassMinusIcon" : "MagnifyingGlassPlusIcon"} 
              size={16} 
              className="text-text-primary" 
            />
          </div>

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
              {selectedImageIndex + 1} / {images.length}
            </div>
          )}
        </div>
      </div>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => handleThumbnailClick(index)}
              className={`flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden transition-all duration-300 ${
                index === selectedImageIndex
                  ? 'border-brand-primary shadow-md'
                  : 'border-border hover:border-brand-secondary'
              }`}
            >
              <AppImage
                src={image.thumbnail}
                alt={`Thumbnail ${index + 1} von ${productName}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Image Information */}
      <div className="text-sm text-muted-foreground">
        <p>Klicken Sie auf das Bild zum Vergrößern. Verwenden Sie die Pfeile oder Miniaturansichten zur Navigation.</p>
      </div>
    </div>
  );
};

export default ProductImageGallery;