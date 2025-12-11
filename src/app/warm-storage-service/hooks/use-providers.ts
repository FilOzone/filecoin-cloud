import { useNetwork } from '@filecoin-foundation/ui-filecoin/Network/useNetwork'
import { useQuery } from '@tanstack/react-query'

import { fetchProviders } from '@/services/providers'
import type { ProviderFilter } from '@/types/providers'
import { getNetworkId } from '@/utils/get-network-id'

type UseProvidersOptions = {
  filter?: ProviderFilter
}

export function useProviders({ filter = 'all' }: UseProvidersOptions = {}) {
  const [network] = useNetwork()
  const networkId = getNetworkId(network)

  return useQuery({
    queryKey: ['providers', networkId, filter],
    queryFn: () => fetchProviders(networkId, { filter }),
    retry: 2,
  })
}
