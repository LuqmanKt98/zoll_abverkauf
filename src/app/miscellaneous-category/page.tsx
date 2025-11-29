import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import MiscellaneousInteractive from './components/MiscellaneousInteractive';

export const metadata: Metadata = {
  title: 'Verschiedenes - Zoll-Abverkauf',
  description: 'Entdecken Sie vielfältige Liquidationen aus Zollbeschlagnahmungen - von Elektronikgeräten über Haushaltsartikel bis hin zu Sammlerobjekten mit staatlicher Herkunftsgarantie.',
};

export default function MiscellaneousCategoryPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-text-secondary mb-4">
              <span>Startseite</span>
              <span>›</span>
              <span className="text-text-primary font-medium">Verschiedenes</span>
            </div>
            
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Verschiedenes
              </h1>
              <p className="text-lg text-text-secondary max-w-3xl mx-auto">
                Vielfältige Waren aus Zollverwertung mit vollständiger Dokumentation und rechtlicher Absicherung. 
                Von Elektronik bis Sammlerobjekten - entdecken Sie interessante Liquidationen zu attraktiven Preisen.
              </p>
            </div>
          </div>

          <MiscellaneousInteractive />
        </div>
      </main>
    </div>
  );
}