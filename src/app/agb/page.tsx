import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import AGBContent from './components/AGBContent';

export const metadata: Metadata = {
    title: 'AGB - Allgemeine Geschäftsbedingungen - Zoll-Abverkauf',
    description: 'Allgemeine Geschäftsbedingungen (AGB) für die Internetplattform zollabverkauf.de, betrieben durch GSK Stockmann – Rechtsanwälte Steuerberater Partnerschaftsgesellschaft mbB.',
};

export default function AGBPage() {
    return (
        <main className="min-h-screen bg-background">
            <Header />
            <div className="pt-32">
                <AGBContent />
            </div>
        </main>
    );
}
