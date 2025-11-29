import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import HomepageInteractive from './components/HomepageInteractive';

export const metadata: Metadata = {
  title: 'Homepage - Zoll-Abverkauf',
  description: 'Offizielle deutsche Zoll-Liquidationsplattform für Fahrzeuge, Edelmetalle, Maschinen und Wertgegenstände aus staatlichen Beschlagnahmungen mit Authentizitätsgarantie.',
};

export default function Homepage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-24">
        <HomepageInteractive />
      </div>
    </main>
  );
}