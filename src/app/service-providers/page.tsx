import { PATHS } from '@/constants/paths'
import { createMetadata } from '@/utils/create-metadata'

import { ServiceProvidersClient } from './components/ServiceProvidersClient'
import { SERVICE_PROVIDERS_SEO } from './constants/seo'

export default function ServiceProviders() {
  return <ServiceProvidersClient />
}

export const metadata = createMetadata({
  title: SERVICE_PROVIDERS_SEO.title,
  description: SERVICE_PROVIDERS_SEO.description,
  path: PATHS.SERVICE_PROVIDERS.path as `/${string}`,
})
