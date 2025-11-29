import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import AdminDashboardInteractive from './components/AdminDashboardInteractive';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin Dashboard - Zoll-Abverkauf',
  description: 'Geschützter Admin-Bereich für Produkt-Upload und Verwaltung',
};

export default function AdminPage() {
  return (
    <>
      <Header />
      <AdminDashboardInteractive />
    </>
  );
}