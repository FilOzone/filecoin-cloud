import type { Metadata } from 'next'
import '@/styles/globals.css'
import PlausibleProvider from 'next-plausible'
import type { ReactNode } from 'react'

import { SiteLayout } from '@/components/SiteLayout'

import { BASE_DOMAIN, METADATA } from '@/constants/siteMetadata'

export const metadata: Metadata = METADATA

type RootLayoutProps = Readonly<{ children: ReactNode }>

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <PlausibleProvider
      trackOutboundLinks
      hash
      trackFileDownloads
      domain={BASE_DOMAIN.replace('www.', '')}
    >
      <SiteLayout>{children}</SiteLayout>
    </PlausibleProvider>
  )
}
