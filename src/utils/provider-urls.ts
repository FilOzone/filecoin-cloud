import type { Address } from 'viem'

import type { Network } from '@/config/chains'
import { EXPLORERS } from '@/constants/external-services'

/**
 * Constructs the check activity URL for a provider on PDP Scan
 *
 * @param network - The network (mainnet or calibration)
 * @param payeeAddress - The provider's payee address
 * @returns The full URL to view provider activity on PDP Scan
 */
export function getCheckActivityUrl(
  network: Network,
  payeeAddress: Address,
): string {
  return `${EXPLORERS.PDP_SCAN[network]}${payeeAddress}`
}
