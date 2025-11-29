'use client';

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebaseClient';
import { adminAuth } from '@/lib/firebaseAuth';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import Icon from '@/components/ui/AppIcon';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal, ModalFooter } from '@/components/ui/Modal';
import { Spinner } from '@/components/ui/Spinner';
import { toast } from 'sonner';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

export const CategoriesManager = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    icon: '',
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, 'categories'));
      const categoriesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Category[];
      setCategories(categoriesData.filter(c => !(c as any).deleted));
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Fehler beim Laden der Kategorien');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        slug: category.slug,
        description: category.description,
        icon: category.icon,
      });
    } else {
      setEditingCategory(null);
      setFormData({
        name: '',
        slug: '',
        description: '',
        icon: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const slug = formData.slug.trim().toLowerCase();
      if (!/^[a-z0-9-]+$/.test(slug)) {
        toast.error('Ungültiger Slug. Nur Kleinbuchstaben, Zahlen und Bindestriche erlaubt.');
        return;
      }
      if (formData.name.trim().length < 2) {
        toast.error('Name muss mindestens 2 Zeichen lang sein.');
        return;
      }

      // uniqueness check
      const existing = (await getDocs(query(collection(db, 'categories'), where('slug', '==', slug)))).docs;
      if (!editingCategory && existing.length > 0) {
        toast.error('Slug bereits vorhanden.');
        return;
      }
      if (editingCategory && editingCategory.slug !== slug && existing.length > 0) {
        toast.error('Slug bereits vorhanden.');
        return;
      }

      if (editingCategory) {
        const before = categories.find(c => c.id === editingCategory.id);
        await updateDoc(doc(db, 'categories', editingCategory.id), { ...formData, slug });
        await addDoc(collection(db, 'categoryAudit'), {
          action: 'update',
          categoryId: editingCategory.id,
          before,
          after: { ...formData, slug },
          admin: adminAuth.getCurrentUser()?.email || 'unknown',
          createdAt: new Date().toISOString(),
        });
        toast.success('Kategorie erfolgreich aktualisiert');
      } else {
        const ref = await addDoc(collection(db, 'categories'), { ...formData, slug });
        await addDoc(collection(db, 'categoryAudit'), {
          action: 'create',
          categoryId: ref.id,
          after: { ...formData, slug },
          admin: adminAuth.getCurrentUser()?.email || 'unknown',
          createdAt: new Date().toISOString(),
        });
        toast.success('Kategorie erfolgreich erstellt');
      }

      handleCloseModal();
      fetchCategories();
    } catch (error) {
      console.error('Error saving category:', error);
      toast.error('Fehler beim Speichern der Kategorie');
    }
  };

  const handleDelete = async (category: Category) => {
    // Check if category has products
    const productsQuery = query(collection(db, 'products'), where('category', '==', category.slug));
    const productsSnapshot = await getDocs(productsQuery);

    if (!productsSnapshot.empty) {
      toast.error(`Kategorie "${category.name}" kann nicht gelöscht werden, da sie ${productsSnapshot.size} Produkt(e) enthält`);
      return;
    }

    if (!confirm(`Möchten Sie die Kategorie "${category.name}" wirklich löschen?`)) {
      return;
    }

    try {
      await updateDoc(doc(db, 'categories', category.id), { deleted: true, deletedAt: new Date().toISOString() });
      await addDoc(collection(db, 'categoryAudit'), {
        action: 'soft_delete',
        categoryId: category.id,
        before: category,
        admin: adminAuth.getCurrentUser()?.email || 'unknown',
        createdAt: new Date().toISOString(),
      });
      toast.success('Kategorie wurde als gelöscht markiert');
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error('Fehler beim Löschen der Kategorie');
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const softDeleteSelected = async () => {
    for (const id of Array.from(selectedIds)) {
      const cat = categories.find(c => c.id === id);
      if (cat) await handleDelete(cat);
    }
    setSelectedIds(new Set());
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
          <h3 className="text-lg font-bold text-text-primary">Kategorienverwaltung</h3>
          <p className="text-text-secondary">{categories.length} Kategorien</p>
        </div>
        <Button onClick={() => handleOpenModal()} leftIcon="PlusIcon">
          Neue Kategorie
        </Button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div key={category.id} className="bg-white border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={category.icon as any} size={24} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-text-primary">{category.name}</h4>
                  <p className="text-sm text-text-secondary">{category.slug}</p>
                </div>
              </div>
              <input type="checkbox" className="mt-2" checked={selectedIds.has(category.id)} onChange={() => toggleSelect(category.id)} />
            </div>
            <p className="text-sm text-text-secondary mb-4">{category.description}</p>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => handleOpenModal(category)} leftIcon="PencilIcon">
                Bearbeiten
              </Button>
              <Button size="sm" variant="destructive" onClick={() => handleDelete(category)} leftIcon="TrashIcon">
                Löschen
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Batch actions */}
      {selectedIds.size > 0 && (
        <div className="flex items-center gap-3 mt-2">
          <span className="text-sm text-text-secondary">Ausgewählt: {selectedIds.size}</span>
          <Button size="sm" variant="outline" onClick={() => setSelectedIds(new Set())}>Auswahl aufheben</Button>
          <Button size="sm" variant="destructive" onClick={softDeleteSelected}>Ausgewählte löschen (soft)</Button>
        </div>
      )}

      {/* Category Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingCategory ? 'Kategorie bearbeiten' : 'Neue Kategorie'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <Input
            label="Slug"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            required
            helperText="URL-freundlicher Name (z.B. 'fahrzeuge')"
          />

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Beschreibung</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              rows={3}
              required
            />
          </div>

          <Input
            label="Icon"
            value={formData.icon}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            required
            helperText="Heroicon Name (z.B. 'TruckIcon')"
          />

          <ModalFooter>
            <Button type="button" variant="outline" onClick={handleCloseModal}>
              Abbrechen
            </Button>
            <Button type="submit">
              {editingCategory ? 'Aktualisieren' : 'Erstellen'}
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
};

export default CategoriesManager;
