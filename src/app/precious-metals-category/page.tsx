import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import PreciousMetalsInteractive from './components/PreciousMetalsInteractive';

export const metadata: Metadata = {
  title: 'Edelmetalle - Zoll-Abverkauf',
  description: 'Zertifizierte Edelmetalle aus Zollbeschlagnahmungen: Gold, Silber, Platin und Palladium mit staatlicher Authentifizierung und amtlichen Prüfzertifikaten.',
};

export default function PreciousMetalsCategoryPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-text-secondary mb-4">
              <span>Startseite</span>
              <span>›</span>
              <span className="text-text-primary font-medium">Edelmetalle</span>
            </div>
            
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Edelmetalle
              </h1>
              <p className="text-lg text-text-secondary max-w-3xl mx-auto">
                Zertifizierte Edelmetalle aus Zollverwertung mit staatlicher Authentifizierung und vollständiger Dokumentation. 
                Von Gold bis Platin - entdecken Sie hochwertige Metalle mit amtlichen Prüfzertifikaten.
              </p>
            </div>
          </div>

          <PreciousMetalsInteractive />
        </div>
      </main>
    </div>
  );
}