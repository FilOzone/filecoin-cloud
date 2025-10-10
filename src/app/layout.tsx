import localFont from 'next/font/local'
import { clsx } from 'clsx'
import type { Metadata } from 'next'
import '@/styles/globals.css'
import { ReactNode } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import BackgroundVideo from '@/components/BackgroundVideo'
import { BreakpointDebugger } from '@/components/BreakpointDebugger'
import { METADATA } from '@/constants/metadata'
import { Banner } from '@/components/Banner'
import { ExternalLink } from '@/components/ExternalLink'

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

export const metadata: Metadata = METADATA

type RootLayoutProps = Readonly<{ children: ReactNode }>

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={clsx(
          funnelSans.variable,
          aspekta.variable,
          'relative flex min-h-screen flex-col antialiased',
        )}
      >
        <BackgroundVideo />
        <ExternalLink
          href="https://www.fildev.io/FDS-7"
          aria-label="Register for Fil Dev Summit #7"
          className="group/link focus:outline-none"
        >
          <Banner label="Filecoin Dev Summit 7">
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
