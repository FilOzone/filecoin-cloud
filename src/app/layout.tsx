import type { Metadata } from 'next'
import '@/styles/globals.css'

import type { ReactNode } from 'react'

import { SiteLayout } from '@/components/SiteLayout'

import { METADATA } from '@/constants/site-metadata'

export const metadata: Metadata = METADATA

type RootLayoutProps = Readonly<{ children: ReactNode }>

export default function RootLayout({ children }: RootLayoutProps) {
  return <SiteLayout>{children}</SiteLayout>
}
