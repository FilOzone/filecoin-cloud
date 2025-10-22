import { clsx } from 'clsx'
import localFont from 'next/font/local'
import '@/styles/globals.css'
import type { ReactNode } from 'react'

import { BreakpointDebugger } from '@/components/_BreakpointDebugger'
import { Banner } from '@/components/Banner'
import { ExternalLink } from '@/components/ExternalLink'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

import { fds7Link } from '@/constants/links'

const funnelSans = localFont({
  src: '../fonts/Funnel_Sans/FunnelSans[wght].woff2',
  display: 'swap',
  variable: '--font-funnel-sans',
  fallback: ['Arial', 'Helvetica', 'sans-serif'],
  preload: true,
})

const aspekta = localFont({
  src: '../fonts/Aspekta/AspektaVF.woff2',
  display: 'swap',
  variable: '--font-aspekta',
  fallback: ['Arial', 'Helvetica', 'sans-serif'],
  preload: true,
})

type SiteLayoutProps = Readonly<{ children: ReactNode }>

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <html lang="en">
      <body
        className={clsx(
          funnelSans.variable,
          aspekta.variable,
          'relative flex min-h-screen flex-col font-sans antialiased',
        )}
      >
        <Banner>
          Happening Now: Learn more at{' '}
          <ExternalLink
            href={fds7Link}
            aria-label="Register for Fil Dev Summit #7"
            className="text-brand-500 focus:brand-outline inline-block hover:underline"
          >
            Filecoin Dev Summit 7
          </ExternalLink>
        </Banner>

        <Header />
        <main className="flex-1">{children}</main>
        <Footer />

        {process.env.NODE_ENV === 'development' && <BreakpointDebugger />}
      </body>
    </html>
  )
}
