import '@/styles/globals.css'

import type { ReactNode } from 'react'

import { SiteLayout } from '@/components/SiteLayout'

type RootLayoutProps = Readonly<{ children: ReactNode }>

export default function RootLayout({ children }: RootLayoutProps) {
  return <SiteLayout>{children}</SiteLayout>
}
