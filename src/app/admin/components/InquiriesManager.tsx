'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { db } from '@/lib/firebaseClient';
import { collection, getDocs, updateDoc, doc, query, orderBy, where } from 'firebase/firestore';
import Icon from '@/components/ui/AppIcon';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Spinner } from '@/components/ui/Spinner';
import { toast } from 'sonner';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  productId?: string;
  productName?: string;
  source: 'contact' | 'product';
  status: 'new' | 'in-progress' | 'resolved' | 'closed';
  createdAt: any;
  read: boolean;
}

export const InquiriesManager = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSource, setFilterSource] = useState('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [replySubject, setReplySubject] = useState('Antwort auf Ihre Anfrage');
  const [replyBody, setReplyBody] = useState('');
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const inquiriesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        read: doc.data().read || false,
      })) as Inquiry[];
      setInquiries(inquiriesData);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      toast.error('Fehler beim Laden der Anfragen');
    } finally {
      setLoading(false);
    }
  };

  const handleViewInquiry = async (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setIsModalOpen(true);

    // Mark as read
    if (!inquiry.read) {
      try {
        await updateDoc(doc(db, 'inquiries', inquiry.id), { read: true });
        setInquiries(prev => prev.map(inq => 
          inq.id === inquiry.id ? { ...inq, read: true } : inq
        ));
      } catch (error) {
        console.error('Error marking inquiry as read:', error);
      }
    }
  };

  const handleUpdateStatus = async (inquiryId: string, newStatus: Inquiry['status']) => {
    try {
      await updateDoc(doc(db, 'inquiries', inquiryId), { status: newStatus });
      setInquiries(prev => prev.map(inq =>
        inq.id === inquiryId ? { ...inq, status: newStatus } : inq
      ));
      toast.success('Status erfolgreich aktualisiert');
      if (selectedInquiry?.id === inquiryId) {
        setSelectedInquiry({ ...selectedInquiry, status: newStatus });
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Fehler beim Aktualisieren des Status');
    }
  };

  const { filteredInquiries, filterError } = useMemo(() => {
    try {
      const items = inquiries
        .filter(inquiry => {
          const term = searchTerm.toLowerCase();
          const matchesSearch =
            inquiry.name.toLowerCase().includes(term) ||
            inquiry.email.toLowerCase().includes(term) ||
            inquiry.message.toLowerCase().includes(term);
          const matchesStatus = filterStatus === 'all' || inquiry.status === filterStatus;
          const matchesSource = filterSource === 'all' || inquiry.source === filterSource;
          return matchesSearch && matchesStatus && matchesSource;
        })
        .sort((a, b) => {
          const ad = a.createdAt?.toDate?.()?.getTime?.() || 0;
          const bd = b.createdAt?.toDate?.()?.getTime?.() || 0;
          return sortOrder === 'asc' ? ad - bd : bd - ad;
        });
      return { filteredInquiries: items, filterError: null as string | null };
    } catch (e: any) {
      return { filteredInquiries: [], filterError: e?.message || 'Filterfehler' };
    }
  }, [inquiries, searchTerm, filterStatus, filterSource, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filteredInquiries.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const pagedInquiries = filteredInquiries.slice(start, start + pageSize);

  const getStatusBadge = (status: Inquiry['status']) => {
    const badges = {
      'new': { color: 'bg-blue-100 text-blue-800', text: 'Neu' },
      'in-progress': { color: 'bg-yellow-100 text-yellow-800', text: 'In Bearbeitung' },
      'resolved': { color: 'bg-green-100 text-green-800', text: 'Gelöst' },
      'closed': { color: 'bg-gray-100 text-gray-800', text: 'Geschlossen' },
    };
    const badge = badges[status];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}>
        {badge.text}
      </span>
    );
  };

  const newInquiriesCount = inquiries.filter(inq => inq.status === 'new').length;

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
          <h3 className="text-lg font-bold text-text-primary">Anfragenverwaltung</h3>
          <p className="text-text-secondary">
            {filteredInquiries.length} von {inquiries.length} Anfragen
            {newInquiriesCount > 0 && (
              <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                {newInquiriesCount} neu
              </span>
            )}
          </p>
          {filterError && (
            <p className="text-error mt-1 text-sm">{filterError}</p>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-border rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            label="Suchen"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon="MagnifyingGlassIcon"
            placeholder="Name, E-Mail oder Nachricht..."
          />
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">Alle Status</option>
              <option value="new">Neu</option>
              <option value="in-progress">In Bearbeitung</option>
              <option value="resolved">Gelöst</option>
              <option value="closed">Geschlossen</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Quelle</label>
            <select
              value={filterSource}
              onChange={(e) => setFilterSource(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">Alle Quellen</option>
              <option value="contact">Kontaktformular</option>
              <option value="product">Produktanfrage</option>
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

      {/* Inquiries Table */}
      <div className="bg-white border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-border">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase">E-Mail</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase">Quelle</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase">Datum</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase">Aktionen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {pagedInquiries.map((inquiry) => (
                <tr
                  key={inquiry.id}
                  className={`hover:bg-slate-50 ${!inquiry.read ? 'bg-blue-50' : ''}`}
                >
                  <td className="px-4 py-3">{getStatusBadge(inquiry.status)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {!inquiry.read && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full" />
                      )}
                      <span className="font-medium text-text-primary">{inquiry.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-text-secondary">{inquiry.email}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      inquiry.source === 'contact'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {inquiry.source === 'contact' ? 'Kontakt' : 'Produkt'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    {inquiry.createdAt?.toDate?.()?.toLocaleDateString('de-DE') || 'N/A'}
                  </td>
                  <td className="px-4 py-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewInquiry(inquiry)}
                      leftIcon="EyeIcon"
                    >
                      Ansehen
                    </Button>
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

      {/* Inquiry Detail Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Anfragedetails"
        size="lg"
      >
        {selectedInquiry && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Name</label>
                <p className="text-text-primary font-medium">{selectedInquiry.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">E-Mail</label>
                <p className="text-text-primary">{selectedInquiry.email}</p>
              </div>
            </div>

            {selectedInquiry.phone && (
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Telefon</label>
                <p className="text-text-primary">{selectedInquiry.phone}</p>
              </div>
            )}

            {selectedInquiry.productName && (
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Produkt</label>
                <p className="text-text-primary">{selectedInquiry.productName} (ID: {selectedInquiry.productId})</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Nachricht</label>
              <p className="text-text-primary whitespace-pre-wrap bg-slate-50 p-3 rounded-lg">
                {selectedInquiry.message}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Status ändern</label>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={selectedInquiry.status === 'new' ? 'primary' : 'outline'}
                  onClick={() => handleUpdateStatus(selectedInquiry.id, 'new')}
                >
                  Neu
                </Button>
                <Button
                  size="sm"
                  variant={selectedInquiry.status === 'in-progress' ? 'primary' : 'outline'}
                  onClick={() => handleUpdateStatus(selectedInquiry.id, 'in-progress')}
                >
                  In Bearbeitung
                </Button>
                <Button
                  size="sm"
                  variant={selectedInquiry.status === 'resolved' ? 'primary' : 'outline'}
                  onClick={() => handleUpdateStatus(selectedInquiry.id, 'resolved')}
                >
                  Gelöst
                </Button>
                <Button
                  size="sm"
                  variant={selectedInquiry.status === 'closed' ? 'primary' : 'outline'}
                  onClick={() => handleUpdateStatus(selectedInquiry.id, 'closed')}
                >
                  Geschlossen
                </Button>
              </div>
            </div>

            <div className="text-sm text-text-secondary">
              <p>Quelle: {selectedInquiry.source === 'contact' ? 'Kontaktformular' : 'Produktanfrage'}</p>
              <p>Eingegangen: {selectedInquiry.createdAt?.toDate?.()?.toLocaleString('de-DE') || 'N/A'}</p>
            </div>

            {/* Reply */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-text-secondary">Antwort per E-Mail</label>
              <Input label="Betreff" value={replySubject} onChange={(e) => setReplySubject(e.target.value)} />
              <textarea
                value={replyBody}
                onChange={(e) => setReplyBody(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                rows={5}
                placeholder="Ihre Antwort..."
              />
              <div className="flex gap-2 items-center">
                <Button
                  onClick={async () => {
                    if (!selectedInquiry) return;
                    setIsSending(true);
                    try {
                      const html = `<p>${replyBody.replace(/\n/g, '<br>')}</p>`;
                      const res = await fetch('/api/email-dispatch', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ to: selectedInquiry.email, subject: replySubject, html }),
                      });
                      const data = await res.json();
                      if (!res.ok || !data?.ok) {
                        const errMsg = data?.error || 'Fehler beim Senden';
                        toast.error(errMsg);
                      } else {
                        toast.success('E-Mail erfolgreich gesendet');
                        // Clear reply form on success
                        setReplyBody('');
                        setReplySubject('Antwort auf Ihre Anfrage');
                      }
                    } catch (e: any) {
                      toast.error(e?.message || 'Unbekannter Fehler beim Senden');
                    } finally {
                      setIsSending(false);
                    }
                  }}
                  disabled={isSending}
                >
                  {isSending ? 'Senden...' : 'Antwort senden'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default InquiriesManager;
