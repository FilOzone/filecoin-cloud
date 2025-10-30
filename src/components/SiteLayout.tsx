import { clsx } from 'clsx'
import localFont from 'next/font/local'
import '@/styles/globals.css'
import type { ReactNode } from 'react'

import { BreakpointDebugger } from '@/components/_BreakpointDebugger'
import { Footer } from '@/components/Footer/Footer'

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
        <main className="flex-1">{children}</main>
        <Footer />

        {process.env.NODE_ENV === 'development' && <BreakpointDebugger />}
      </body>
    </html>
  )
}
