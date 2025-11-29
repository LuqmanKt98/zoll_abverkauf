import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Admin Dashboard - Zoll-Abverkauf (DEMO)',
  description: 'Geschützter Admin-Bereich für Produkt-Upload - Demo Version ohne Datenbank',
};

export default function AdminDashboardPage() {
  // Redirect to main admin page
  redirect('/admin');
}