import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import VehiclesCategoryInteractive from './components/VehiclesCategoryInteractive';

export const metadata: Metadata = {
  title: 'Fahrzeuge - Zoll-Abverkauf',
  description: 'Entdecken Sie beschlagnahmte und überschüssige Fahrzeuge aus Zollverfahren. PKW, Nutzfahrzeuge, Motorräder und Luxusfahrzeuge mit garantierter Rechtssicherheit.',
};

export default function VehiclesCategoryPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-text-secondary mb-4">
              <span>Startseite</span>
              <span>›</span>
              <span className="text-text-primary font-medium">Fahrzeuge</span>
            </div>
            
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Fahrzeuge
              </h1>
              <p className="text-lg text-text-secondary max-w-3xl mx-auto">
                Erstklassige Fahrzeuge aus Zollverwertung mit vollständiger Dokumentation und rechtlicher Absicherung. 
                Von PKW bis Luxusfahrzeugen - entdecken Sie geprüfte Qualität zu fairen Konditionen.
              </p>
            </div>
          </div>

          <VehiclesCategoryInteractive />
        </div>
      </main>
    </div>
  );
}