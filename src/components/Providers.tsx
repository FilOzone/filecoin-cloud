'use client'

import { setUIConfig } from '@filecoin-foundation/ui-filecoin/config/ui-config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Link from 'next/link'
import PlausibleProvider from 'next-plausible'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { type ReactNode, useState } from 'react'

import { BASE_DOMAIN } from '@/constants/site-metadata'

// Initialize UI config for client-side components
setUIConfig({
  baseDomain: BASE_DOMAIN,
  Link: Link,
})

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
        <NuqsAdapter>{children}</NuqsAdapter>
      </QueryClientProvider>
    </PlausibleProvider>
  )
}
