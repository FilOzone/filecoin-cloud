import { useMemo } from 'react'

import type { ServiceProvider } from '@/schemas/provider-schema'

import { getYesNoFromBoolean } from '../utils/get-yes-no-from-boolean'

export function useFilterOptions(data: Array<ServiceProvider>) {
  return useMemo(() => {
    if (data.length === 0) {
      return {
        status: [],
        location: [],
        capacityMin: 0,
        capacityMax: 0,
        provingPeriodMin: 0,
        provingPeriodMax: 0,
        ipni: [],
      }
    }

    const status = new Set<string>()
    const location = new Set<string>()
    const ipni = new Set<string>()

    let capacityMin = Infinity
    let capacityMax = -Infinity
    let provingPeriodMin = Infinity
    let provingPeriodMax = -Infinity

    for (const provider of data) {
      if (provider.serviceStatus) {
        status.add(provider.serviceStatus)
      }

      location.add(provider.location)
      ipni.add(getYesNoFromBoolean(provider.ipniIpfs))

      if (provider.capacityTb) {
        const cap = Number(provider.capacityTb)
        capacityMin = Math.min(capacityMin, cap)
        capacityMax = Math.max(capacityMax, cap)
      }

      const pp = Number(provider.minProvingPeriod)
      provingPeriodMin = Math.min(provingPeriodMin, pp)
      provingPeriodMax = Math.max(provingPeriodMax, pp)
    }

    const noMinCapacityFound = capacityMin === Infinity
    if (noMinCapacityFound) capacityMin = 0

    const noMaxCapacityFound = capacityMax === -Infinity
    if (noMaxCapacityFound) capacityMax = 0

    return {
      status: Array.from(status).sort(),
      location: Array.from(location).sort(),
      capacityMin,
      capacityMax,
      provingPeriodMin,
      provingPeriodMax,
      ipni: Array.from(ipni).sort(),
    } as const
  }, [data])
}
