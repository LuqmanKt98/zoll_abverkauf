import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Footer from '@/components/common/Footer';
import { Toaster } from 'sonner';
import '@/styles/index.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
  preload: true,
  fallback: ['monospace'],
});

export const metadata: Metadata = {
  title: 'Zoll-Abverkauf Deutschland - Offizielle Liquidationsplattform',
  description: 'Offizielle deutsche Zoll-Liquidationsplattform für Fahrzeuge, Edelmetalle, Maschinen und Wertgegenstände aus staatlichen Beschlagnahmungen mit Authentizitätsgarantie.',
  keywords: 'Zoll, Abverkauf, Liquidation, Beschlagnahmt, Fahrzeuge, Edelmetalle, Deutschland',
  authors: [{ name: 'Zoll-Abverkauf Deutschland' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" translate="no" data-scroll-behavior="smooth" className={`${inter.variable} ${jetbrainsMono.variable} notranslate`} suppressHydrationWarning>
      <head>
        <meta name="google" content="notranslate" />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-text-primary antialiased font-sans notranslate" translate="no" suppressHydrationWarning>
        <Toaster
          position="bottom-right"
          richColors
          closeButton
          toastOptions={{
            duration: 5000,
          }}
        />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        </body>
    </html>
  );
}
