'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface DemoProduct {
  id: string;
  title: string;
  category: string;
  price: string;
  image: string;
  alt: string;
  uploadDate: string;
  status: 'active' | 'error' | 'pending';
}

interface AdminProductOverviewProps {
  products: DemoProduct[];
}

const AdminProductOverview = ({ products }: AdminProductOverviewProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const categories = Array.from(new Set(products.map(p => p.category)));
  
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || product.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Icon name="CheckCircleIcon" size={16} className="text-green-600" />;
      case 'error':
        return <Icon name="XCircleIcon" size={16} className="text-red-600" />;
      case 'pending':
        return <Icon name="ClockIcon" size={16} className="text-yellow-600" />;
      default:
        return <Icon name="QuestionMarkCircleIcon" size={16} className="text-gray-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Aktiv';
      case 'error': return 'Fehler';
      case 'pending': return 'Ausstehend';
      default: return 'Unbekannt';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-text-primary">Produktübersicht</h3>
          <p className="text-text-secondary">
            {filteredProducts.length} von {products.length} Produkten
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-border rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Suchen
            </label>
            <div className="relative">
              <Icon name="MagnifyingGlassIcon" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Titel oder ID suchen..."
                className="w-full pl-9 pr-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Kategorie
            </label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent text-sm"
            >
              <option value="all">Alle Kategorien</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent text-sm"
            >
              <option value="all">Alle Status</option>
              <option value="active">Aktiv</option>
              <option value="error">Fehler</option>
              <option value="pending">Ausstehend</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white border border-border rounded-lg p-8 text-center">
          <Icon name="CubeIcon" size={48} className="text-text-secondary mx-auto mb-4" />
          <p className="text-text-secondary">
            {products.length === 0 
              ? 'Noch keine Produkte hochgeladen.' :'Keine Produkte gefunden, die Ihren Filterkriterien entsprechen.'
            }
          </p>
        </div>
      ) : (
        <div className="bg-white border border-border rounded-lg overflow-hidden">
          {/* Table Header */}
          <div className="bg-muted px-6 py-3 border-b border-border">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-text-primary">
              <div className="col-span-3">Produkt</div>
              <div className="col-span-2">Kategorie</div>
              <div className="col-span-2">Preis</div>
              <div className="col-span-2">Upload-Datum</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-1">Aktionen</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-border">
            {filteredProducts.map((product) => (
              <div key={product.id} className="px-6 py-4 hover:bg-muted/50 transition-colors">
                <div className="grid grid-cols-12 gap-4 items-center">
                  {/* Product */}
                  <div className="col-span-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name="CubeIcon" size={20} className="text-brand-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-text-primary truncate">{product.title}</p>
                        <p className="text-xs text-text-secondary">ID: {product.id}</p>
                      </div>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="col-span-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-primary/10 text-brand-primary">
                      {product.category}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="col-span-2">
                    <p className="font-medium text-text-primary">{product.price}</p>
                  </div>

                  {/* Upload Date */}
                  <div className="col-span-2">
                    <p className="text-sm text-text-secondary">{product.uploadDate}</p>
                  </div>

                  {/* Status */}
                  <div className="col-span-2">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(product.status)}
                      <span className="text-sm">{getStatusText(product.status)}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="col-span-1">
                    <div className="flex items-center space-x-1">
                      <button
                        className="p-1 text-text-secondary hover:text-brand-primary transition-colors"
                        title="Produkt bearbeiten"
                      >
                        <Icon name="PencilIcon" size={16} />
                      </button>
                      <button
                        className="p-1 text-text-secondary hover:text-red-600 transition-colors"
                        title="Produkt löschen"
                      >
                        <Icon name="TrashIcon" size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}


    </div>
  );
};

export default AdminProductOverview;
