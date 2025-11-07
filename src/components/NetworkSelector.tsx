'use client'

import { GlobeIcon } from '@phosphor-icons/react/dist/ssr'

import { Listbox } from './Listbox'
import { networkOptions, useNetwork } from './NetworkContext'

export function NetworkSelector() {
  const { network, setNetwork } = useNetwork()

  return (
    <Listbox
      options={networkOptions}
      selected={network}
      setSelected={setNetwork}
      Icon={GlobeIcon}
    />
  )
}
