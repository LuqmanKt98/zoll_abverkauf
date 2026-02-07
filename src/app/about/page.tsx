import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import AboutInteractive from './components/AboutInteractive';

export const metadata: Metadata = {
    title: 'Über uns - Zoll-Abverkauf',
    description: 'Erfahren Sie mehr über zollabverkauf.de - die spezialisierte Verwertungsplattform für Vermögenswerte aus Insolvenzverfahren und behördlichen Sicherstellungen, betrieben durch GSK Stockmann.',
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-background">
            <Header />
            <div className="pt-32">
                <AboutInteractive />
            </div>
        </main>
    );
}
