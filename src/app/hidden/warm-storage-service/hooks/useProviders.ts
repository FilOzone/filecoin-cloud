import { useQuery } from '@tanstack/react-query'

import type { Network } from '@/config/chains'
import { fetchProviders } from '@/services/providers'
import type { ProviderFilter } from '@/types/providers'

export function useProviders(
  network: Network = 'calibration',
  filter: ProviderFilter = 'approved',
) {
  return useQuery({
    queryKey: ['providers', filter],
    queryFn: () => fetchProviders(network, { filter }),
    retry: 2,
  })
}
