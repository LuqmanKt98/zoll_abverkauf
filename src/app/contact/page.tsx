import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import ContactInteractive from './components/ContactInteractive';

export const metadata: Metadata = {
  title: 'Kontakt - Zoll-Abverkauf',
  description: 'Kontaktieren Sie das offizielle Deutsche Zollamt für Anfragen zu Liquidationsverfahren, Produktinformationen und rechtlichen Fragen. Professioneller Support und garantierte Antwortzeiten.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-32">
        <ContactInteractive />
      </div>
    </main>
  );
}