import { Metadata } from 'next'
import { APP_NAME, CANONICAL, DESCRIPTION } from '@/constants'

const METADATA: Metadata = {
  title: APP_NAME,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  robots: { index: true, follow: true },
  viewport: { width: 'device-width', initialScale: 1 },
  authors: [{ name: 'Dominyel Rivera', url: CANONICAL }],
  keywords: [
    'west',
    'fast',
    'Comunidad',
    'west fast',
    'Competiciones',
    'Variedad de Textos',
    'Pruebas de Velocidad',
    'Privacidad y Seguridad',
    'Seguimiento de Progreso'
  ],
  twitter: {
    title: APP_NAME,
    description: DESCRIPTION,
    card: 'summary_large_image',
    images: 'https://i.ibb.co/R32xpDp/West-Fast.png'
  },
  openGraph: {
    type: 'website',
    url: CANONICAL,
    title: APP_NAME,
    siteName: APP_NAME,
    description: DESCRIPTION,
    images: 'https://i.ibb.co/R32xpDp/West-Fast.png'
  }
}

export default METADATA
