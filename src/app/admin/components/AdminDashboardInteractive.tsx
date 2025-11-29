'use client';

import React, { useState, useEffect } from 'react';
import AdminLogin from './AdminLogin';
import BulkProductUpload from './BulkProductUpload';
import AdminUploadHistory from './AdminUploadHistory';
import ProductsManager from './ProductsManager';
import CategoriesManager from './CategoriesManager';
import InquiriesManager from './InquiriesManager';
import AdminSettings from './AdminSettings';
import Icon from '@/components/ui/AppIcon';
import { db } from '@/lib/firebaseClient';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { adminAuth } from '@/lib/firebaseAuth';

interface AdminUser {
  email: string;
  isAuthenticated: boolean;
}

interface UploadHistoryItem {
  id: string;
  date: string;
  time: string;
  admin: string;
  productsCount: number;
  status: 'success' | 'error' | 'partial' | 'rolled-back';
  filename: string;
}

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

const AdminDashboardInteractive = () => {
  const [adminUser, setAdminUser] = useState<AdminUser>({ email: '', isAuthenticated: false });
  const [activeTab, setActiveTab] = useState<'bulk-upload' | 'history' | 'products' | 'categories' | 'inquiries' | 'settings'>('products');
  const [isLoading, setIsLoading] = useState(true);
  const [uploadHistory, setUploadHistory] = useState<UploadHistoryItem[]>([]);
  const [systemStats, setSystemStats] = useState<{ products: number; categories: number; inquiries: number; lastProductDate: string } | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    const unsubscribe = adminAuth.onAuthStateChanged((user) => {
      if (user) {
        setAdminUser({ email: user.email || '', isAuthenticated: true });
      } else {
        setAdminUser({ email: '', isAuthenticated: false });
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const loadSystemStats = async () => {
      try {
        const products = (await getDocs(collection(db, 'products'))).size;
        const categories = (await getDocs(collection(db, 'categories'))).size;
        const inquiries = (await getDocs(collection(db, 'inquiries'))).size;

        // Get most recent product date
        let lastProductDate = 'Nie';
        try {
          const recentQuery = query(collection(db, 'products'), orderBy('createdAt', 'desc'), limit(1));
          const recentDocs = await getDocs(recentQuery);
          if (!recentDocs.empty) {
            const data = recentDocs.docs[0].data();
            if (data.createdAt?.toDate) {
              lastProductDate = data.createdAt.toDate().toLocaleDateString('de-DE');
            }
          }
        } catch {}

        setSystemStats({ products, categories, inquiries, lastProductDate });
      } catch {}
    };
    loadSystemStats();
  }, [activeTab]); // Refresh when tab changes

  useEffect(() => {
    // Load upload history from localStorage (for ZIP uploads only)
    const savedHistory = localStorage.getItem('admin-upload-history');
    if (savedHistory) {
      setUploadHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleLogin = async (email: string, password: string): Promise<boolean> => {
    try {
      await adminAuth.signIn(email, password);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const handleLogout = async () => {
    try {
      await adminAuth.signOut();
      setAdminUser({ email: '', isAuthenticated: false });
      setActiveTab('products');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleBulkUploadSuccess = (count: number, batchId: string) => {
    // Add to history
    const newHistoryItem: UploadHistoryItem = {
      id: batchId,
      date: new Date().toLocaleDateString('de-DE'),
      time: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }),
      admin: adminUser.email,
      productsCount: count,
      status: 'success',
      filename: `bulk-upload-${batchId}.zip`
    };

    const updatedHistory = [newHistoryItem, ...uploadHistory];
    setUploadHistory(updatedHistory);
    localStorage.setItem('admin-upload-history', JSON.stringify(updatedHistory));

    // Refresh dashboard statistics
    refreshSystemStats();
  };

  const handleSingleProductCreated = (batchId: string) => {
    // Add single product to history
    const newHistoryItem: UploadHistoryItem = {
      id: batchId,
      date: new Date().toLocaleDateString('de-DE'),
      time: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }),
      admin: adminUser.email,
      productsCount: 1,
      status: 'success',
      filename: `single-product-${batchId}`
    };

    const updatedHistory = [newHistoryItem, ...uploadHistory];
    setUploadHistory(updatedHistory);
    localStorage.setItem('admin-upload-history', JSON.stringify(updatedHistory));

    // Refresh dashboard statistics
    refreshSystemStats();
  };

  const refreshSystemStats = async () => {
    try {
      const products = (await getDocs(collection(db, 'products'))).size;
      const categories = (await getDocs(collection(db, 'categories'))).size;
      const inquiries = (await getDocs(collection(db, 'inquiries'))).size;

      // Get most recent product date
      let lastProductDate = 'Nie';
      try {
        const recentQuery = query(collection(db, 'products'), orderBy('createdAt', 'desc'), limit(1));
        const recentDocs = await getDocs(recentQuery);
        if (!recentDocs.empty) {
          const data = recentDocs.docs[0].data();
          if (data.createdAt?.toDate) {
            lastProductDate = data.createdAt.toDate().toLocaleDateString('de-DE');
          }
        }
      } catch {}

      setSystemStats({ products, categories, inquiries, lastProductDate });
    } catch (error) {
      console.error('Error refreshing stats:', error);
    }
  };

  const handleRollback = (historyId: string) => {
    // Update history status
    const updatedHistory = uploadHistory.map(h =>
      h.id === historyId ? { ...h, status: 'rolled-back' as const } : h
    );
    setUploadHistory(updatedHistory);
    localStorage.setItem('admin-upload-history', JSON.stringify(updatedHistory));

    // Refresh dashboard statistics after rollback
    refreshSystemStats();
  };

  if (!adminUser.isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Admin Header */}
          <div className="bg-white rounded-lg border border-border shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center">
                  <Icon name="UserIcon" size={24} className="text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-text-primary">Admin Dashboard</h1>
                  <p className="text-text-secondary">Willkommen, {adminUser.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Icon name="ArrowRightOnRectangleIcon" size={16} />
                <span>Abmelden</span>
              </button>
            </div>

            {/* Stats */}
            {systemStats && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <Icon name="CubeIcon" size={20} className="text-brand-primary" />
                    <div>
                      <p className="text-sm text-text-secondary">Produkte</p>
                      <p className="text-xl font-bold text-text-primary">{systemStats.products}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <Icon name="FolderIcon" size={20} className="text-brand-primary" />
                    <div>
                      <p className="text-sm text-text-secondary">Kategorien</p>
                      <p className="text-xl font-bold text-text-primary">{systemStats.categories}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <Icon name="EnvelopeIcon" size={20} className="text-brand-primary" />
                    <div>
                      <p className="text-sm text-text-secondary">Anfragen</p>
                      <p className="text-xl font-bold text-text-primary">{systemStats.inquiries}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <Icon name="CalendarDaysIcon" size={20} className="text-brand-primary" />
                    <div>
                      <p className="text-sm text-text-secondary">Letztes Produkt</p>
                      <p className="text-xl font-bold text-text-primary">{systemStats.lastProductDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Tabs */}
          <div className="bg-white rounded-lg border border-border shadow-sm mb-6">
            <div className="flex border-b border-border overflow-x-auto">
              <button
                onClick={() => setActiveTab('products')}
                className={`px-6 py-4 font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'products' ?'border-brand-primary text-brand-primary' :'border-transparent text-text-secondary hover:text-text-primary'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon name="CubeIcon" size={20} />
                  <span>Produkte</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('categories')}
                className={`px-6 py-4 font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'categories' ?'border-brand-primary text-brand-primary' :'border-transparent text-text-secondary hover:text-text-primary'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon name="FolderIcon" size={20} />
                  <span>Kategorien</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('inquiries')}
                className={`px-6 py-4 font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'inquiries' ?'border-brand-primary text-brand-primary' :'border-transparent text-text-secondary hover:text-text-primary'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon name="EnvelopeIcon" size={20} />
                  <span>Anfragen</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('bulk-upload')}
                className={`px-6 py-4 font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'bulk-upload' ?'border-brand-primary text-brand-primary' :'border-transparent text-text-secondary hover:text-text-primary'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon name="ArchiveBoxIcon" size={20} />
                  <span>Bulk-Upload</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('history')}
                className={`px-6 py-4 font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'history' ?'border-brand-primary text-brand-primary' :'border-transparent text-text-secondary hover:text-text-primary'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon name="ClockIcon" size={20} />
                  <span>Historie</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`px-6 py-4 font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'settings' ?'border-brand-primary text-brand-primary' :'border-transparent text-text-secondary hover:text-text-primary'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon name="Cog6ToothIcon" size={20} />
                  <span>Einstellungen</span>
                </div>
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'products' && <ProductsManager onProductCreated={handleSingleProductCreated} />}
              {activeTab === 'categories' && <CategoriesManager />}
              {activeTab === 'inquiries' && <InquiriesManager />}
              {activeTab === 'bulk-upload' && (
                <BulkProductUpload
                  onUploadSuccess={handleBulkUploadSuccess}
                  adminUsername={adminUser.email}
                />
              )}

              {activeTab === 'history' && (
                <AdminUploadHistory
                  history={uploadHistory}
                  onRollback={handleRollback}
                  onRefreshStats={refreshSystemStats}
                />
              )}
              {activeTab === 'settings' && <AdminSettings />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardInteractive;
