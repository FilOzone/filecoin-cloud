import '@/styles/globals.css'

import { setUIConfig } from '@filecoin-foundation/ui-filecoin/config/ui-config'
import { clsx } from 'clsx'
import localFont from 'next/font/local'
import Link from 'next/link'
import type { ReactNode } from 'react'

import { BreakpointDebugger } from '@/components/_BreakpointDebugger'
import { Footer } from '@/components/Footer/Footer'
import { Providers } from '@/components/Providers'

import { BASE_DOMAIN } from '@/constants/site-metadata'

// Initialize UI config before any components render
setUIConfig({
  baseDomain: BASE_DOMAIN,
  Link: Link,
})

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
          'relative flex min-h-screen flex-col font-sans antialiased bg-zinc-950 text-zinc-50',
        )}
      >
        <Providers>
          <main className="flex-1">{children}</main>
          <Footer />

          {process.env.NODE_ENV === 'development' && <BreakpointDebugger />}
        </Providers>
      </body>
    </html>
  )
}
