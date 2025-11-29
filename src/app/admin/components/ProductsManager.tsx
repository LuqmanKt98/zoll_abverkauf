'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { db } from '@/lib/firebaseClient';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { uploadMultipleImages, deleteFolder } from '@/lib/firebaseStorage';
import Icon from '@/components/ui/AppIcon';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal, ModalFooter } from '@/components/ui/Modal';
import { Spinner } from '@/components/ui/Spinner';
import { toast } from 'sonner';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  condition?: string;
  location?: string;
  year?: number;
  make?: string;
  model?: string;
  mileage?: string;
  fuel?: string;
  // Edelmetalle (Precious Metals) fields
  metalType?: string;
  purity?: string;
  weight?: string;
  certification?: string;
  // Bau-/Landmaschinen (Machinery) fields
  manufacturer?: string;
  operatingHours?: number;
  machineType?: string;
  // Verschiedenes (Miscellaneous) fields
  source?: string;
  tags?: string[];
  createdAt: any;
}

interface ProductsManagerProps {
  onProductCreated?: (batchId: string) => void;
}

export const ProductsManager = ({ onProductCreated }: ProductsManagerProps = {}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    category: '',
    condition: '',
    location: '',
    // Fahrzeuge fields
    year: new Date().getFullYear(),
    make: '',
    model: '',
    mileage: '',
    fuel: '',
    // Edelmetalle fields
    metalType: '',
    purity: '',
    weight: '',
    certification: '',
    // Bau-/Landmaschinen fields
    manufacturer: '',
    operatingHours: 0,
    machineType: '',
    // Verschiedenes fields
    source: '',
    tags: '',
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Fehler beim Laden der Produkte');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        title: product.title,
        description: product.description,
        price: product.price,
        category: product.category,
        condition: product.condition || '',
        location: product.location || '',
        // Fahrzeuge fields
        year: product.year || new Date().getFullYear(),
        make: product.make || '',
        model: product.model || '',
        mileage: product.mileage || '',
        fuel: product.fuel || '',
        // Edelmetalle fields
        metalType: product.metalType || '',
        purity: product.purity || '',
        weight: product.weight || '',
        certification: product.certification || '',
        // Bau-/Landmaschinen fields
        manufacturer: product.manufacturer || '',
        operatingHours: product.operatingHours || 0,
        machineType: product.machineType || '',
        // Verschiedenes fields
        source: product.source || '',
        tags: product.tags?.join(', ') || '',
      });
    } else {
      setEditingProduct(null);
      setFormData({
        title: '',
        description: '',
        price: 0,
        category: '',
        condition: '',
        location: '',
        year: new Date().getFullYear(),
        make: '',
        model: '',
        mileage: '',
        fuel: '',
        metalType: '',
        purity: '',
        weight: '',
        certification: '',
        manufacturer: '',
        operatingHours: 0,
        machineType: '',
        source: '',
        tags: '',
      });
      setSelectedFiles([]);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setSelectedFiles([]);
    setUploadProgress(0);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const files = Array.from(e.dataTransfer.files).filter(file =>
      file.type.startsWith('image/')
    );

    if (files.length > 0) {
      setSelectedFiles(prev => [...prev, ...files]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate: require at least one image for new products
    if (!editingProduct && selectedFiles.length === 0) {
      toast.error('Bitte wählen Sie mindestens ein Bild aus');
      return;
    }

    setIsUploading(true);

    try {
      let imageUrls: string[] = editingProduct?.images || [];

      // Upload new images if selected
      if (selectedFiles.length > 0) {
        const productId = editingProduct?.id || `product-${Date.now()}`;
        try {
          const uploadedUrls = await uploadMultipleImages(
            selectedFiles,
            `products/${productId}`,
            (progress) => setUploadProgress(progress)
          );
          imageUrls = [...imageUrls, ...uploadedUrls];
        } catch (uploadError: any) {
          console.error('Firebase Storage upload failed:', uploadError);
          // Fallback: use local temp-images based on filename
          const localUrls = selectedFiles.map(file => {
            const fileName = file.name.toLowerCase();
            return `/temp-images/${fileName}`;
          });
          imageUrls = [...imageUrls, ...localUrls];
          toast.info('Bilder lokal gespeichert (Firebase Storage nicht verfügbar)');
        }
      }

      // Parse tags from comma-separated string to array
      const tagsArray = formData.tags
        ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
        : [];

      const productData = {
        title: formData.title,
        description: formData.description,
        price: formData.price,
        category: formData.category,
        condition: formData.condition,
        location: formData.location,
        images: imageUrls,
        image: imageUrls[0] || '',
        status: 'available',
        estimatedValue: `€${formData.price.toLocaleString()}`,
        // Category-specific fields (only include if they have values)
        ...(formData.category === 'Fahrzeuge' && {
          year: formData.year,
          make: formData.make,
          model: formData.model,
          mileage: formData.mileage,
          fuelType: formData.fuel,
          fuel: formData.fuel,
        }),
        ...(formData.category === 'Edelmetalle' && {
          metalType: formData.metalType,
          purity: formData.purity,
          weight: formData.weight,
          certification: formData.certification,
          marketValue: `€${formData.price.toLocaleString()}`,
          assayInfo: formData.certification ? 'Zertifiziert' : 'Ausstehend',
        }),
        ...(formData.category === 'Bau-/Landmaschinen' && {
          manufacturer: formData.manufacturer,
          year: formData.year,
          operatingHours: formData.operatingHours,
          type: formData.machineType,
          machineType: formData.machineType,
        }),
        ...(formData.category === 'Verschiedenes' && {
          source: formData.source || 'Zollverwertung',
          tags: tagsArray,
          subCategory: formData.machineType || 'Sonstiges',
        }),
        createdAt: editingProduct?.createdAt || new Date(),
        updatedAt: new Date(),
      };

      if (editingProduct) {
        // Update existing product
        await updateDoc(doc(db, 'products', editingProduct.id), productData);
        toast.success('Produkt erfolgreich aktualisiert');
      } else {
        // Create new product with batch ID for rollback tracking
        const batchId = `single-${Date.now()}`;
        const productWithBatchId = {
          ...productData,
          batchId,
        };
        await addDoc(collection(db, 'products'), productWithBatchId);
        toast.success('Produkt erfolgreich erstellt');

        // Notify parent component about the new product
        if (onProductCreated) {
          onProductCreated(batchId);
        }
      }

      handleCloseModal();
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Fehler beim Speichern des Produkts');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDelete = async (product: Product) => {
    if (!confirm(`Möchten Sie "${product.title}" wirklich löschen?`)) {
      return;
    }

    try {
      // Delete images from storage
      if (product.images && product.images.length > 0) {
        await deleteFolder(`products/${product.id}`);
      }

      // Delete product from Firestore
      await deleteDoc(doc(db, 'products', product.id));
      toast.success('Produkt erfolgreich gelöscht');
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Fehler beim Löschen des Produkts');
    }
  };

  const filteredProducts: Product[] = useMemo(() => {
    try {
      return products
        .filter(product => {
          const term = searchTerm.toLowerCase();
          const matchesSearch = product.title.toLowerCase().includes(term) || product.id.toLowerCase().includes(term);
          const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
          return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
          const ad = new Date(a.createdAt).getTime();
          const bd = new Date(b.createdAt).getTime();
          return sortOrder === 'asc' ? ad - bd : bd - ad;
        });
    } catch {
      return [];
    }
  }, [products, searchTerm, filterCategory, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const pagedProducts = filteredProducts.slice(start, start + pageSize);

  // Use German category names that match Firestore values
  const categoryMap: Record<string, string> = {
    'all': 'Alle Kategorien',
    'Fahrzeuge': 'Fahrzeuge',
    'Edelmetalle': 'Edelmetalle',
    'Bau-/Landmaschinen': 'Bau-/Landmaschinen',
    'Verschiedenes': 'Verschiedenes',
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-text-primary">Produktverwaltung</h3>
          <p className="text-text-secondary">{filteredProducts.length} von {products.length} Produkten</p>
        </div>
        <Button onClick={() => handleOpenModal()} leftIcon="PlusIcon">
          Neues Produkt
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white border border-border rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Suchen"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon="MagnifyingGlassIcon"
            placeholder="Produktname oder ID..."
          />
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Kategorie</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {Object.entries(categoryMap).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Sortierung</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="desc">Neueste zuerst</option>
              <option value="asc">Älteste zuerst</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-border">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase">Bild</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase">Titel</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase">Kategorie</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase">Preis</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase">Aktionen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {pagedProducts.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    {product.images && product.images[0] ? (
                      <img src={product.images[0]} alt={product.title} className="w-16 h-16 object-cover rounded" />
                    ) : (
                      <div className="w-16 h-16 bg-slate-200 rounded flex items-center justify-center">
                        <Icon name="PhotoIcon" size={24} className="text-slate-400" />
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 max-w-xs">
                    <div className="font-medium text-text-primary truncate" title={product.title}>{product.title}</div>
                    <div className="text-sm text-text-secondary truncate">{product.id}</div>
                  </td>
                  <td className="px-4 py-3 text-text-secondary">{product.category}</td>
                  <td className="px-4 py-3 text-text-primary font-medium">€{product.price.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleOpenModal(product)} leftIcon="PencilIcon">
                        Bearbeiten
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(product)} leftIcon="TrashIcon">
                        Löschen
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-text-secondary">Seite {currentPage} von {totalPages}</div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setPage(Math.max(1, currentPage - 1))}>
            Zurück
          </Button>
          <Button variant="outline" size="sm" onClick={() => setPage(Math.min(totalPages, currentPage + 1))}>
            Weiter
          </Button>
          <select
            value={pageSize}
            onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
            className="ml-2 px-3 py-2 border border-border rounded-lg text-sm"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {/* Product Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingProduct ? 'Produkt bearbeiten' : 'Neues Produkt'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Titel"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Beschreibung</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Preis (€)"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              required
            />

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Kategorie</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="">Wählen Sie eine Kategorie</option>
                <option value="Fahrzeuge">Fahrzeuge</option>
                <option value="Edelmetalle">Edelmetalle</option>
                <option value="Bau-/Landmaschinen">Bau-/Landmaschinen</option>
                <option value="Verschiedenes">Verschiedenes</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Zustand"
              value={formData.condition}
              onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
            />

            <Input
              label="Standort"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>

          {formData.category === 'Fahrzeuge' && (
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Baujahr"
                type="number"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
              />

              <Input
                label="Marke"
                value={formData.make}
                onChange={(e) => setFormData({ ...formData, make: e.target.value })}
              />

              <Input
                label="Modell"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              />

              <Input
                label="Kilometerstand"
                value={formData.mileage}
                onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
              />

              <Input
                label="Kraftstoff"
                value={formData.fuel}
                onChange={(e) => setFormData({ ...formData, fuel: e.target.value })}
              />
            </div>
          )}

          {formData.category === 'Edelmetalle' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Metallart</label>
                <select
                  value={formData.metalType}
                  onChange={(e) => setFormData({ ...formData, metalType: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Wählen Sie eine Metallart</option>
                  <option value="Gold">Gold (Au)</option>
                  <option value="Silber">Silber (Ag)</option>
                  <option value="Platin">Platin (Pt)</option>
                  <option value="Palladium">Palladium (Pd)</option>
                </select>
              </div>

              <Input
                label="Reinheit (z.B. 999, 750)"
                value={formData.purity}
                onChange={(e) => setFormData({ ...formData, purity: e.target.value })}
                placeholder="z.B. 999 oder 750"
              />

              <Input
                label="Gewicht (z.B. 100g, 1oz)"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                placeholder="z.B. 100g oder 1oz"
              />

              <Input
                label="Zertifizierung"
                value={formData.certification}
                onChange={(e) => setFormData({ ...formData, certification: e.target.value })}
                placeholder="z.B. LBMA zertifiziert"
              />
            </div>
          )}

          {formData.category === 'Bau-/Landmaschinen' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Maschinentyp</label>
                <select
                  value={formData.machineType}
                  onChange={(e) => setFormData({ ...formData, machineType: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Wählen Sie einen Typ</option>
                  <option value="Bagger">Bagger</option>
                  <option value="Radlader">Radlader</option>
                  <option value="Traktor">Traktor</option>
                  <option value="Mähdrescher">Mähdrescher</option>
                  <option value="Kran">Kran</option>
                  <option value="Gabelstapler">Gabelstapler</option>
                  <option value="Walze">Walze</option>
                  <option value="Sonstige">Sonstige</option>
                </select>
              </div>

              <Input
                label="Hersteller"
                value={formData.manufacturer}
                onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                placeholder="z.B. Caterpillar, John Deere"
              />

              <Input
                label="Baujahr"
                type="number"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
              />

              <Input
                label="Betriebsstunden"
                type="number"
                value={formData.operatingHours}
                onChange={(e) => setFormData({ ...formData, operatingHours: Number(e.target.value) })}
                placeholder="z.B. 5000"
              />
            </div>
          )}

          {formData.category === 'Verschiedenes' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Quelle/Herkunft</label>
                <select
                  value={formData.source}
                  onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Wählen Sie eine Quelle</option>
                  <option value="Zollverwertung">Zollverwertung</option>
                  <option value="Beschlagnahmt">Beschlagnahmt</option>
                  <option value="Überschussbestand">Überschussbestand</option>
                  <option value="Fundbüro">Fundbüro</option>
                  <option value="Insolvenz">Insolvenz</option>
                </select>
              </div>

              <Input
                label="Tags (kommagetrennt)"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="z.B. Elektronik, Neu, OVP"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Bilder{!editingProduct && <span className="text-red-500">*</span>}
            </label>

            {/* Drag & Drop Zone with Label */}
            <label
              htmlFor="image-upload-input"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="flex flex-col items-center justify-center w-full px-4 py-6 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary hover:bg-slate-50 transition-colors"
            >
              <input
                id="image-upload-input"
                type="file"
                multiple
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleFileChange}
                className="sr-only"
              />
              <svg className="w-10 h-10 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-sm text-text-secondary mb-1">
                <span className="font-semibold text-primary">Klicken zum Auswählen</span> oder Bilder hierher ziehen
              </p>
              <p className="text-xs text-gray-400">PNG, JPG, JPEG (mehrere Bilder möglich)</p>
            </label>

            {/* Selected Files Preview */}
            {selectedFiles.length > 0 && (
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 border border-border">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); removeFile(index); }}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    <p className="text-xs text-gray-500 mt-1 truncate">{file.name}</p>
                  </div>
                ))}
              </div>
            )}

            {!editingProduct && selectedFiles.length === 0 && (
              <p className="text-sm text-red-500 mt-2">Mindestens ein Bild ist erforderlich</p>
            )}
          </div>

          {isUploading && uploadProgress > 0 && (
            <div>
              <div className="flex items-center justify-between text-sm mb-1">
                <span>Upload-Fortschritt</span>
                <span>{Math.round(uploadProgress)}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          <ModalFooter>
            <Button type="button" variant="outline" onClick={handleCloseModal}>
              Abbrechen
            </Button>
            <Button
              type="submit"
              isLoading={isUploading}
              disabled={!editingProduct && selectedFiles.length === 0}
            >
              {editingProduct ? 'Aktualisieren' : 'Erstellen'}
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
};

export default ProductsManager;
