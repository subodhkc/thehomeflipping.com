import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TheHomeFlipping.com - Start Your First House Flip With Confidence',
  description: 'The complete toolkit for first-time house flippers. Calculators, checklists, and guides to help you analyze deals and avoid costly mistakes.',
  keywords: 'house flipping, real estate investing, flip calculator, ARV calculator, rehab cost estimator, wholesaling',
  openGraph: {
    title: 'TheHomeFlipping.com - Start Your First House Flip With Confidence',
    description: 'The complete toolkit for first-time house flippers.',
    url: 'https://thehomeflipping.com',
    siteName: 'TheHomeFlipping.com',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
