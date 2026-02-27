import './globals.css';
import type { Metadata } from 'next';
import { Inter, Instrument_Serif } from 'next/font/google';
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeInitializer from '@/components/ThemeInitializer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-instrument-serif',
  display: 'swap'
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://rankai.app';

export const metadata: Metadata = {
  title: 'RankAI – Find the Best AI Tool for Any Task',
  description: 'A curated directory to help you discover the best AI tools for any workflow, ranked by quality and fit.',
  metadataBase: new URL(BASE_URL),
  openGraph: {
    title: 'RankAI – Find the Best AI Tool for Any Task',
    description: 'A curated directory to help you discover the best AI tools for any workflow, ranked by quality and fit.',
    url: BASE_URL,
    siteName: 'RankAI',
    type: 'website'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`page-shell ${inter.variable} ${instrumentSerif.variable} antialiased`}
      >
        <ThemeInitializer />
        <Navbar />
        <main className="page-main">
          <div className="container">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  );
}

