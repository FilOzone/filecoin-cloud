import { useNetwork } from '@filecoin-foundation/ui-filecoin/Network/useNetwork'
import { useQueries, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import type {
  ProviderRuntimeStatus,
  ServiceProviderRow,
} from '@/schemas/provider-schema'
import { fetchBaseProviders, fetchProviderRuntime } from '@/services/providers'
import type { ProviderFilter } from '@/types/providers'
import { getNetworkId } from '@/utils/get-network-id'

type UseServiceProvidersOptions = {
  filter?: ProviderFilter
}

// Runtime probes are live network calls to third-party nodes; cache briefly so
// re-renders and quick navigations don't re-probe every node.
const RUNTIME_STALE_TIME = 60_000

/**
 * Load service providers progressively:
 *
 * 1. Fetch the base (on-chain) list in one query so the full table can render
 *    immediately, independent of any node's HTTP reachability.
 * 2. Probe each provider's /version + /pdp/ping endpoints in its own query so
 *    every row fills in (or fails) independently — network jitter on one node
 *    can no longer delay or hide the rest of the list.
 */
export function useServiceProviders({
  filter = 'all',
}: UseServiceProvidersOptions = {}) {
  const [network] = useNetwork()
  const networkId = getNetworkId(network)

  const baseQuery = useQuery({
    queryKey: ['base-providers', networkId, filter],
    queryFn: () => fetchBaseProviders(networkId, { filter }),
    retry: 2,
  })

  const baseProviders = useMemo(() => baseQuery.data ?? [], [baseQuery.data])

  const runtimeQueries = useQueries({
    queries: baseProviders.map((provider) => ({
      queryKey: [
        'provider-runtime',
        networkId,
        provider.id,
        provider.serviceUrl,
      ],
      queryFn: () => fetchProviderRuntime(provider.serviceUrl),
      staleTime: RUNTIME_STALE_TIME,
      retry: 1,
    })),
  })

  const providers = useMemo<Array<ServiceProviderRow>>(() => {
    return baseProviders.map((provider, index) => {
      const runtime = runtimeQueries[index]

      const runtimeStatus: ProviderRuntimeStatus =
        runtime?.status === 'success'
          ? 'success'
          : runtime?.status === 'error'
            ? 'error'
            : 'pending'

      return {
        ...provider,
        softwareVersion: runtime?.data?.softwareVersion,
        reachable: runtime?.data?.reachable,
        latencyMs: runtime?.data?.latencyMs,
        runtimeStatus,
      }
    })
  }, [baseProviders, runtimeQueries])

  return {
    data: providers,
    isLoading: baseQuery.isLoading,
    error: baseQuery.error,
    refetch: baseQuery.refetch,
  }
}
