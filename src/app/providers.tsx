'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { createConfig, http, WagmiProvider } from 'wagmi'
import { filecoinCalibration, mainnet } from 'wagmi/chains'

const config = createConfig({
  chains: [mainnet, filecoinCalibration],
  transports: {
    [mainnet.id]: http(),
    [filecoinCalibration.id]: http(),
  },
})

const queryClient = new QueryClient()

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
