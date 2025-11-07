import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Renny Ardila Dev | Portafolio y Proyectos',
  description:
    'Desarrollador full stack especializado en automatización, SaaS, marketing digital y soluciones web modernas. Conoce mis proyectos y servicios.',
  generator: 'Next.js',
  authors: [{ name: 'Renny Ardila', url: 'https://rennyardiladev.vercel.app' }],
  keywords: [
    'Renny Ardila',
    'Desarrollador web',
    'Full Stack Developer',
    'Portafolio',
    'SaaS',
    'Automatización',
    'Bots de WhatsApp',
    'Marketing digital',
    'Next.js',
    'JavaScript',
  ],
  metadataBase: new URL('https://rennyardiladev.vercel.app'),
  openGraph: {
    title: 'Renny Ardila Dev',
    description:
      'Explora mis proyectos, SaaS y herramientas creadas para optimizar negocios digitales.',
    url: 'https://rennyardiladev.vercel.app',
    siteName: 'Renny Ardila Dev',
    locale: 'es_CO',
    type: 'website',
  },
  icons: {
    icon: '/favicon.png', // favicon local en /public
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <style>{`
          html {
            font-family: ${GeistSans.style.fontFamily};
            --font-sans: ${GeistSans.variable};
            --font-mono: ${GeistMono.variable};
          }
        `}</style>
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
