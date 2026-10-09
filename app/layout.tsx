import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CV | Portfolio Renny Ardila',
  description: 'Diseñador gráfico y desarrollador web. Dibujo personajes, preparo fichas técnicas y empaque, y desarrollo con Next.js y React el sitio que vende.',
  keywords: 'diseño gráfico, desarrollo web, Next.js, React, ilustración, marketing digital, TikTok, Meta Ads',
  authors: [{ name: 'Renny Ardila' }],
  openGraph: {
    title: 'CV | Portfolio Renny Ardila',
    description: 'Diseñador gráfico y desarrollador web. Dibujo personajes, preparo fichas técnicas y empaque, y desarrollo con Next.js y React el sitio que vende.',
    type: 'website',
    locale: 'es_ES',
    url: 'https://rennyardiladev.com',
    images: [
      {
        url: '/fabricadepeluches.png',
        width: 1200,
        height: 630,
        alt: 'Portfolio Renny Ardila - Diseño y desarrollo web',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CV | Portfolio Renny Ardila',
    description: 'Diseñador gráfico y desarrollador web. Dibujo personajes, preparo fichas técnicas y empaque.',
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
