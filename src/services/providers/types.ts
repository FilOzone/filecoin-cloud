import type { ServiceProvider } from '@/schemas/provider-schema'

/**
 * Provider without software version (before version fetch)
 */
export type ProviderWithoutSoftwareVersion = Omit<
  ServiceProvider,
  'softwareVersion'
>
