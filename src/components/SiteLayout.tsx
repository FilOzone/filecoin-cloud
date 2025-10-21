import { clsx } from 'clsx'
import localFont from 'next/font/local'
import '@/styles/globals.css'
import type { ReactNode } from 'react'

import { BackgroundVideo } from '@/components/BackgroundVideo'
import { Banner } from '@/components/Banner'
import { BreakpointDebugger } from '@/components/BreakpointDebugger'
import { ExternalLink } from '@/components/ExternalLink'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

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
        <BackgroundVideo />

        <ExternalLink
          href="https://www.fildev.io/FDS-7"
          aria-label="Register for Fil Dev Summit #7"
          className="group/link focus:outline-none"
        >
          <Banner>
            Happening Now: Learn more at{' '}
            <span className="text-brand-500 group-focus/link:brand-outline inline-block group-hover/link:underline">
              Filecoin Dev Summit 7
            </span>
          </Banner>
        </ExternalLink>

        <Header />
        <main className="flex-1">{children}</main>
        <Footer />

        {process.env.NODE_ENV === 'development' && <BreakpointDebugger />}
      </body>
    </html>
  )
}
