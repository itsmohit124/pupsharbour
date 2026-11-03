import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import type { ReactNode } from 'react'

import { Footer, WhatsAppFab } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { getSiteData } from '@/lib/data'

import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap', weight: ['500', '600', '700'], style: ['normal', 'italic'] })

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await getSiteData()
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: `${settings.siteName} | ${settings.tagline}`, template: `%s | ${settings.siteName}` },
    description:
      'Pups Harbour Consultancy brings Brand, Marketing, HR and Business Strategy together: talent acquisition, staffing, HR policies, PMS, compliance audits, POSH and more for startups, MSMEs and growing organisations.',
    icons: { icon: '/brand/favicon-32.png', apple: '/brand/apple-touch-icon.png' },
    openGraph: { type: 'website', siteName: settings.siteName, images: ['/brand/icon-512.png'], locale: 'en_IN' },
  }
}

export const viewport: Viewport = { themeColor: '#22062a', width: 'device-width', initialScale: 1 }

export default async function FrontendLayout({ children }: { children: ReactNode }) {
  const data = await getSiteData()
  const { isEnabled: preview } = await draftMode()
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: data.settings.siteName,
    slogan: data.settings.tagline,
    url: SITE_URL,
    logo: `${SITE_URL}/brand/icon-512.png`,
    telephone: data.settings.phone,
    email: data.settings.email,
    areaServed: 'IN',
    sameAs: data.settings.linkedin ? [data.settings.linkedin] : undefined,
  }
  return (
    <html lang="en-IN" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        {preview && (
          <div className="bg-gold-500 py-2 text-center text-sm font-semibold text-ink">
            Preview mode: you are seeing draft content.{' '}
            <Link href="/api/exit-preview" prefetch={false} className="underline">
              Exit preview
            </Link>
          </div>
        )}
        <Header data={data} />
        <main id="main">{children}</main>
        <Footer data={data} />
        <WhatsAppFab data={data} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd).replace(/</g, '\\u003c') }} />
      </body>
    </html>
  )
}
