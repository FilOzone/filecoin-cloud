import type { Row } from '@tanstack/react-table'

import type { ServiceProviderRow } from '@/schemas/provider-schema'

// Sort key: online nodes first (by ascending latency), then offline, then
// still-probing rows last so resolved results bubble to the top.
const OFFLINE_RANK = 1e9
const PENDING_RANK = 2e9

function reachabilityRank(row: ServiceProviderRow): number {
  if (row.runtimeStatus === 'pending') return PENDING_RANK
  if (!row.reachable) return OFFLINE_RANK
  return row.latencyMs ?? 0
}

/**
 * Sort the Reachability column: reachable nodes (fastest first), then offline,
 * then rows whose probe is still in flight.
 */
export function sortReachability(
  rowA: Row<ServiceProviderRow>,
  rowB: Row<ServiceProviderRow>,
): number {
  return reachabilityRank(rowA.original) - reachabilityRank(rowB.original)
}
