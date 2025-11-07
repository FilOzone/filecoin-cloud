import { useQuery } from '@tanstack/react-query'

import type { Network } from '@/config/chains'
import { fetchProviders } from '@/services/providers'
import type { ProviderFilter } from '@/types/providers'

type UseProvidersOptions = {
  network?: Network
  filter?: ProviderFilter
}

export function useProviders({
  network = 'calibration',
  filter = 'all',
}: UseProvidersOptions = {}) {
  return useQuery({
    queryKey: ['providers', network, filter],
    queryFn: () => fetchProviders(network, { filter }),
    retry: 2,
  })
}
