'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ref, listAll, deleteObject } from 'firebase/storage';
import { db, storage } from '@/lib/firebaseClient';
import { toast } from 'sonner';

interface UploadHistoryItem {
  id: string;
  date: string;
  time: string;
  admin: string;
  productsCount: number;
  status: 'success' | 'error' | 'partial' | 'rolled-back';
  filename: string;
}

interface AdminUploadHistoryProps {
  history: UploadHistoryItem[];
  onRollback: (historyId: string) => void;
  onRefreshStats?: () => void;
}

const AdminUploadHistory = ({ history, onRollback, onRefreshStats }: AdminUploadHistoryProps) => {
  const [showRollbackConfirm, setShowRollbackConfirm] = useState<string | null>(null);
  const [isRollingBack, setIsRollingBack] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <Icon name="CheckCircleIcon" size={16} className="text-green-600" />;
      case 'error':
        return <Icon name="XCircleIcon" size={16} className="text-red-600" />;
      case 'partial':
        return <Icon name="ExclamationTriangleIcon" size={16} className="text-yellow-600" />;
      case 'rolled-back':
        return <Icon name="TrashIcon" size={16} className="text-gray-600" />;
      default:
        return <Icon name="QuestionMarkCircleIcon" size={16} className="text-gray-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'success': return 'Erfolgreich';
      case 'error': return 'Fehler';
      case 'partial': return 'Teilweise';
      case 'rolled-back': return 'Gelöscht';
      default: return 'Unbekannt';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-50 border-green-200 text-green-800';
      case 'error': return 'bg-red-50 border-red-200 text-red-800';
      case 'partial': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'rolled-back': return 'bg-gray-50 border-gray-200 text-gray-700';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const handleRollbackClick = (historyId: string) => {
    setShowRollbackConfirm(historyId);
  };

  const handleConfirmRollback = async (historyId: string) => {
    setIsRollingBack(true);
    try {
      // Find the batch ID from history
      const historyItem = history.find(h => h.id === historyId);
      if (!historyItem) {
        toast.error('Upload-Eintrag nicht gefunden');
        return;
      }

      // Query products with this batch ID
      const productsQuery = query(
        collection(db, 'products'),
        where('batchId', '==', historyId)
      );
      const productsSnapshot = await getDocs(productsQuery);

      if (productsSnapshot.empty) {
        toast.error('Keine Produkte für diesen Upload gefunden');
        setShowRollbackConfirm(null);
        setIsRollingBack(false);
        return;
      }

      // Delete images from Storage and products from Firestore
      let deletedCount = 0;
      for (const productDoc of productsSnapshot.docs) {
        const productData = productDoc.data();

        // Delete images from Storage
        if (productData.images && Array.isArray(productData.images)) {
          for (const imageUrl of productData.images) {
            try {
              // Extract storage path from URL
              const urlParts = imageUrl.split('/o/')[1]?.split('?')[0];
              if (urlParts) {
                const decodedPath = decodeURIComponent(urlParts);
                const imageRef = ref(storage, decodedPath);
                await deleteObject(imageRef);
              }
            } catch (error) {
              console.error('Error deleting image:', error);
            }
          }
        }

        // Delete product document
        await deleteDoc(doc(db, 'products', productDoc.id));
        deletedCount++;
      }

      // Update history status
      onRollback(historyId);

      // Refresh stats if callback provided
      if (onRefreshStats) {
        onRefreshStats();
      }

      toast.success(`${deletedCount} Produkte und ihre Bilder wurden gelöscht`);
      setShowRollbackConfirm(null);
    } catch (error: any) {
      console.error('Rollback error:', error);
      toast.error(`Rollback fehlgeschlagen: ${error.message}`);
    } finally {
      setIsRollingBack(false);
    }
  };

  const handleCancelRollback = () => {
    setShowRollbackConfirm(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-text-primary">Upload-Historie</h3>
          <p className="text-text-secondary">
            Übersicht aller Produkt-Uploads mit Rollback-Funktion
          </p>
        </div>
      </div>

      {/* History List */}
      {history.length === 0 ? (
        <div className="bg-white border border-border rounded-lg p-8 text-center">
          <Icon name="ClockIcon" size={48} className="text-text-secondary mx-auto mb-4" />
          <p className="text-text-secondary">Noch keine Uploads durchgeführt.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <div key={item.id} className="bg-white border border-border rounded-lg p-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                {/* Status & Basic Info */}
                <div className="lg:col-span-6">
                  <div className="flex items-center space-x-4">
                    <div className={`px-3 py-1 rounded-full border text-sm font-medium flex items-center space-x-2 ${getStatusColor(item.status)}`}>
                      {getStatusIcon(item.status)}
                      <span>{getStatusText(item.status)}</span>
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">{item.filename}</p>
                      <p className="text-sm text-text-secondary">
                        {item.date} um {item.time} von {item.admin}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Products Count */}
                <div className="lg:col-span-2">
                  <div className="flex items-center space-x-2">
                    <Icon name="CubeIcon" size={16} className="text-brand-primary" />
                    <span className="text-sm font-medium">{item.productsCount} Produkte</span>
                  </div>
                </div>

                {/* Upload Details */}
                <div className="lg:col-span-2">
                  <div className="flex items-center space-x-2">
                    <Icon name="CloudArrowUpIcon" size={16} className="text-text-secondary" />
                    <span className="text-sm text-text-secondary">ID: {item.id}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="lg:col-span-2 flex justify-end space-x-2">
                  {item.status === 'success' && (
                    <button
                      onClick={() => handleRollbackClick(item.id)}
                      disabled={isRollingBack}
                      className="flex items-center space-x-1 px-3 py-1.5 text-sm text-red-600 hover:text-red-700 border border-red-200 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Upload rückgängig machen"
                    >
                      <Icon name="ArrowUturnLeftIcon" size={16} />
                      <span>{isRollingBack ? 'Wird gelöscht...' : 'Rollback'}</span>
                    </button>
                  )}
                  {item.status === 'rolled-back' && (
                    <div className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-lg bg-gray-100">
                      <Icon name="TrashIcon" size={16} />
                      <span>Gelöscht</span>
                    </div>
                  )}
                  {item.status === 'error' && (
                    <div className="flex items-center space-x-1 px-3 py-1.5 text-sm text-red-600 border border-red-200 rounded-lg bg-red-50">
                      <Icon name="XCircleIcon" size={16} />
                      <span>Fehler</span>
                    </div>
                  )}
                  {item.status === 'partial' && (
                    <div className="flex items-center space-x-1 px-3 py-1.5 text-sm text-yellow-600 border border-yellow-200 rounded-lg bg-yellow-50">
                      <Icon name="ExclamationTriangleIcon" size={16} />
                      <span>Teilweise</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Expanded Details */}
              <div className="mt-4 pt-4 border-t border-border">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-text-secondary">Verarbeitungszeit:</p>
                    <p className="font-medium">~2.3 Sekunden</p>
                  </div>
                  <div>
                    <p className="text-text-secondary">Dateigröße:</p>
                    <p className="font-medium">
                      {item.productsCount > 50 ? '~15.2 MB' : 
                       item.productsCount > 20 ? '~8.7 MB' : '~3.1 MB'}
                    </p>
                  </div>
                  <div>
                    <p className="text-text-secondary">Validierung:</p>
                    <p className="font-medium">
                      {item.status === 'success' ? 'Alle Prüfungen bestanden' :
                       item.status === 'partial' ? 'Warnungen vorhanden' : 'Fehler aufgetreten'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Rollback Confirmation Modal */}
      {showRollbackConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="ExclamationTriangleIcon" size={24} className="text-red-600" />
              <h3 className="text-lg font-bold text-text-primary">Rollback bestätigen</h3>
            </div>
            
            <p className="text-text-secondary mb-6">
              Sind Sie sicher, dass Sie diesen Upload rückgängig machen möchten? 
              Alle Produkte aus diesem Upload werden aus der Demo-Datenbank entfernt.
            </p>

            <div className="flex space-x-3 justify-end">
              <button
                onClick={handleCancelRollback}
                disabled={isRollingBack}
                className="px-4 py-2 border border-border rounded-lg text-text-secondary hover:text-text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Abbrechen
              </button>
              <button
                onClick={() => handleConfirmRollback(showRollbackConfirm)}
                disabled={isRollingBack}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isRollingBack && <Icon name="ArrowPathIcon" size={16} className="animate-spin" />}
                <span>{isRollingBack ? 'Wird gelöscht...' : 'Rollback durchführen'}</span>
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default AdminUploadHistory;