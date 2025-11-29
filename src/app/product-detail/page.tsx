import type { Metadata } from 'next';
import { Suspense } from 'react';
import Header from '@/components/common/Header';
import ProductDetailInteractive from './components/ProductDetailInteractive';

export const metadata: Metadata = {
  title: 'Produktdetails - Zoll-Abverkauf',
  description: 'Detaillierte Informationen zu beschlagnahmten und sichergestellten Artikeln mit offizieller Dokumentation, Spezifikationen und Anfragemöglichkeit.',
};

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-32 bg-muted rounded-lg"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-96 bg-muted rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-muted rounded"></div>
              <div className="h-64 bg-muted rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  return (
    <>
      <Header />
      <main className="pt-32">
        <Suspense fallback={<LoadingSkeleton />}>
          <ProductDetailInteractive />
        </Suspense>
      </main>
    </>
  );
}