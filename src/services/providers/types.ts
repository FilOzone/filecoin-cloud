import type { ServiceProvider } from '@/schemas/provider-schema'

/**
 * Base provider data from contract (before enrichment with software version and check activity URL)
 */
export type BaseProviderData = Omit<
  ServiceProvider,
  'softwareVersion' | 'checkActivityUrl'
>
