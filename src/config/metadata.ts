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
    images: 'https://yoydev.com/assets/about-me-d8901b55.png'
  },
  openGraph: {
    type: 'website',
    url: CANONICAL,
    title: APP_NAME,
    siteName: APP_NAME,
    description: DESCRIPTION,
    images: 'https://yoydev.com/assets/about-me-d8901b55.png'
  }
}

export default METADATA
