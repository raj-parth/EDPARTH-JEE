import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';

export const metadata: Metadata = {
  title: {
    default: 'EDPARTH — Engineering College Discovery & Admission Data Platform',
    template: '%s | EDPARTH'
  },
  description: 'Explore verified 2026 cutoffs, fees, placements, branches, and admission criteria for IITs, NITs, IIITs, GFTIs, and premier engineering institutions across India.',
  keywords: [
    'JEE Main Cutoff 2026',
    'JEE Advanced Cutoff',
    'JoSAA Counselling',
    'IIT Bombay Cutoff',
    'NIT Trichy Placements',
    'College Predictor',
    'Engineering College Comparison',
    'Engineering Fees India'
  ],
  authors: [{ name: 'EDPARTH Data Research Group' }],
  metadataBase: new URL('https://edparth.vercel.app'),
  openGraph: {
    title: 'EDPARTH — Engineering College Discovery & Admission Data Platform',
    description: 'Explore verified 2026 cutoffs, fees, placements, branches, and admission criteria for IITs, NITs, IIITs, GFTIs, and premier institutions.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'EDPARTH'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="flex flex-col min-h-screen">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
