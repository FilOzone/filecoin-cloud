'use client'

import { Listbox } from './Listbox'
import { networkOptions, useNetwork } from './NetworkContext'

export function NetworkSelector() {
  const { selected, setSelected } = useNetwork()

  return (
    <Listbox
      options={networkOptions}
      selected={selected}
      setSelected={setSelected}
    />
  )
}
