'use client'

import { createContext, type ReactNode, use, useState } from 'react'

export type NetworkOption = {
  id: string
  label: string
}

type NetworkContextValue = {
  selected: NetworkOption
  setSelected: (option: NetworkOption) => void
}

export const networkOptions: Array<NetworkOption> = [
  {
    id: 'calibration',
    label: 'Calibration',
  },
  {
    id: 'mainnet',
    label: 'Mainnet',
  },
] as const

const defaultNetworkOption = networkOptions[0]

const NetworkContext = createContext<NetworkContextValue>({
  selected: defaultNetworkOption,
  setSelected: () => {},
})

type NetworkProviderProps = Readonly<{ children: ReactNode }>

export function NetworkProvider({ children }: NetworkProviderProps) {
  const [selected, setSelected] = useState<NetworkOption>(defaultNetworkOption)

  return (
    <NetworkContext value={{ selected, setSelected }}>
      {children}
    </NetworkContext>
  )
}

export function useNetwork(): NetworkContextValue {
  const context = use(NetworkContext)

  if (!context) {
    throw new Error('useNetwork must be used within a NetworkProvider')
  }

  return context
}
