import { useMemo } from 'react'

import type { ServiceProvider } from '@/schemas/provider-schema'

import type { FilterState } from './useFilterQueryState'

export function useFilterOptions(data: Array<ServiceProvider>) {
  return useMemo(() => {
    const status = new Set<string>()
    const country = new Set<string>()
    const ipni = new Set<string>()

    for (const provider of data) {
      if (provider.serviceStatus) {
        status.add(provider.serviceStatus)
      }
      country.add(provider.location)
      ipni.add(provider.ipniIpfs ? 'Yes' : 'No')
    }

    const capacity = {
      min: Math.min(...data.map((p) => Number(p.capacityTb || 0))),
      max: Math.max(...data.map((p) => Number(p.capacityTb || 0))),
    }

    const provingPeriod = {
      min: Math.min(...data.map((p) => Number(p.minProvingPeriod || 0))),
      max: Math.max(...data.map((p) => Number(p.minProvingPeriod || 0))),
    }

    return {
      status: Array.from(status).sort(),
      country: Array.from(country).sort(),
      capacityMin: capacity.min,
      capacityMax: capacity.max,
      provingPeriodMin: provingPeriod.min,
      provingPeriodMax: provingPeriod.max,
      ipni: Array.from(ipni).sort(),
    } as const satisfies FilterState
  }, [data])
}
