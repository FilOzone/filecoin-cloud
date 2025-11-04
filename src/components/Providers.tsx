'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import PlausibleProvider from 'next-plausible'
import { type ReactNode, useState } from 'react'

import { BASE_DOMAIN } from '@/constants/siteMetadata'

type ProvidersProps = Readonly<{ children: ReactNode }>

export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <PlausibleProvider
      trackOutboundLinks
      hash
      trackFileDownloads
      domain={BASE_DOMAIN.replace('www.', '')}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </PlausibleProvider>
  )
}
