'use client'

import { createContext, type ReactNode, use, useState } from 'react'

import type { Network } from '@/types/contractType'

export type NetworkOption = {
  id: Network
  label: string
}

type NetworkContextValue = {
  network: NetworkOption
  setNetwork: (option: NetworkOption) => void
}

export const networkOptions = [
  {
    id: 'calibration',
    label: 'Calibration',
  },
  {
    id: 'mainnet',
    label: 'Mainnet',
  },
] as const satisfies Array<NetworkOption>

const defaultNetworkOption = networkOptions[0]

const NetworkContext = createContext<NetworkContextValue>({
  network: defaultNetworkOption,
  setNetwork: () => {},
})

type NetworkProviderProps = Readonly<{ children: ReactNode }>

export function NetworkProvider({ children }: NetworkProviderProps) {
  const [network, setNetwork] = useState<NetworkOption>(defaultNetworkOption)

  return (
    <NetworkContext value={{ network, setNetwork }}>{children}</NetworkContext>
  )
}

export function useNetwork(): NetworkContextValue {
  const context = use(NetworkContext)

  if (!context) {
    throw new Error('useNetwork must be used within a NetworkProvider')
  }

  return context
}
