'use client'

import { useState } from 'react'

import { Listbox } from './Listbox'

const options = [
  {
    id: 'calibration',
    label: 'Calibration',
  },
  {
    id: 'mainnet',
    label: 'Mainnet',
  },
]

export function NetworkSelector() {
  const [selected, setSelected] = useState(options[0])

  return (
    <Listbox options={options} selected={selected} setSelected={setSelected} />
  )
}
