'use client'

import { GlobeIcon } from '@phosphor-icons/react/dist/ssr'

import type { Network } from '@/types/contractType'

import { Listbox } from './Listbox'
import { useNetwork } from './NetworkContext'

type NetworkOption = {
  id: Network
  label: string
}

const networkOptions = [
  {
    id: 'calibration',
    label: 'Calibration',
  },
  {
    id: 'mainnet',
    label: 'Mainnet',
  },
] as const satisfies Array<NetworkOption>

export function NetworkSelector() {
  const { network, setNetwork } = useNetwork()

  const selectedOption =
    networkOptions.find((option) => option.id === network) || networkOptions[0]

  return (
    <Listbox
      options={networkOptions}
      selected={selectedOption}
      setSelected={(selected) => setNetwork(selected.id)}
      Icon={GlobeIcon}
    />
  )
}
