import './globals.css'
import React from 'react'
import type { Metadata } from 'next'
import { Jost } from 'next/font/google'
import METADATA from '@/config/metadata'

const jost = Jost({
  display: 'swap',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800']
})

export const metadata: Metadata = {
  ...METADATA
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={jost.className}>{children}</body>
    </html>
  )
}
