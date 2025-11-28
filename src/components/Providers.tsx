'use client'

import '@/app/config-initializer' // Just import to run initialization

import { NetworkProvider } from '@filecoin-foundation/ui-filecoin/Network/NetworkProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import PlausibleProvider from 'next-plausible'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { type ReactNode, useState } from 'react'

import { BASE_DOMAIN } from '@/constants/site-metadata'

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
      <QueryClientProvider client={queryClient}>
        <NuqsAdapter>
          <NetworkProvider>{children}</NetworkProvider>
        </NuqsAdapter>
      </QueryClientProvider>
    </PlausibleProvider>
  )
}
