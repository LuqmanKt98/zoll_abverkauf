import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import MachineryInteractive from './components/MachineryInteractive';

export const metadata: Metadata = {
  title: 'Bau- und Landmaschinen - Zoll-Abverkauf',
  description: 'Hochwertige Bau- und Landmaschinen aus Zollverwertung. Bagger, Traktoren, Radlader und mehr mit technischer Prüfung und rechtlicher Absicherung.',
};

export default function ConstructionAgriculturalMachineryPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-text-secondary mb-4">
              <span>Startseite</span>
              <span>›</span>
              <span className="text-text-primary font-medium">Bau- und Landmaschinen</span>
            </div>
            
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Bau- und Landmaschinen
              </h1>
              <p className="text-lg text-text-secondary max-w-3xl mx-auto">
                Professionelle Maschinen aus Zollverwertung mit technischer Prüfung und vollständiger Dokumentation. 
                Von Baggern bis Traktoren - entdecken Sie hochwertige Ausrüstung zu attraktiven Konditionen.
              </p>
            </div>
          </div>

          <MachineryInteractive />
        </div>
      </main>
    </div>
  );
}