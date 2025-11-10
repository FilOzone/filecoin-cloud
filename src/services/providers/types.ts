import type { ServiceProvider } from '@/schemas/providerSchema'

/**
 * Provider without software version (before version fetch)
 */
export type ProviderWithoutSoftwareVersion = Omit<
  ServiceProvider,
  'softwareVersion'
>
