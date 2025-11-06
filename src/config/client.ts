import { createPublicClient, http, type PublicClient } from 'viem'

import { getChain, type Network } from './chains'

/**
 * Cache for public clients by network
 */
const clientCache = new Map<Network, PublicClient>()

/**
 * Get or create a cached public client for the specified network
 * @param network - The network to get a client for
 * @returns A viem PublicClient instance
 */
export function getPublicClient(
  network: Network = 'calibration',
): PublicClient {
  const cached = clientCache.get(network)
  if (cached) {
    return cached
  }

  const chain = getChain(network)
  const client = createPublicClient({
    batch: {
      multicall: true,
    },
    chain,
    transport: http(chain.rpcUrls.default.http[0]),
  })

  clientCache.set(network, client)
  return client
}
