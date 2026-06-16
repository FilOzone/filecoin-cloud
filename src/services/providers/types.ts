import type { ServiceProvider } from '@/schemas/provider-schema'

/**
 * Base provider data from contract (before enrichment with software version, reachability, and check activity URL)
 */
export type BaseProviderData = Omit<
  ServiceProvider,
  'softwareVersion' | 'checkActivityUrl' | 'reachable' | 'latencyMs'
>

/**
 * Runtime info probed from a provider's HTTP endpoints (/version + /pdp/ping).
 */
export type ProviderRuntimeInfo = {
  softwareVersion?: string
  reachable: boolean
  latencyMs?: number
}
