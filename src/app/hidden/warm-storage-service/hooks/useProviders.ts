import { useQuery } from '@tanstack/react-query'

import { useNetwork } from '@/components/NetworkContext'

import { fetchProviders } from '@/services/providers'
import type { ProviderFilter } from '@/types/providers'

type UseProvidersOptions = {
  filter?: ProviderFilter
}

export function useProviders({ filter = 'all' }: UseProvidersOptions = {}) {
  const { network } = useNetwork()

  return useQuery({
    queryKey: ['providers', network, filter],
    queryFn: () => fetchProviders(network, { filter }),
    retry: 2,
  })
}
