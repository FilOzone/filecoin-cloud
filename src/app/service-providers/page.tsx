import { Suspense } from 'react'

import { StructuredDataScript } from '@/components/StructuredDataScript'

import { PATHS } from '@/constants/paths'
import { createMetadata } from '@/utils/create-metadata'

import { ServiceProvidersClient } from './components/ServiceProvidersClient'
import { SERVICE_PROVIDERS_SEO } from './constants/seo'
import { generateStructuredData } from './utils/generate-structured-data'

// Unreachable: redirected to "/" in next.config.ts while this page is hidden.
// Kept in place so it can be restored by removing that redirect.
export default function ServiceProviders() {
  return (
    <>
      <StructuredDataScript
        structuredData={generateStructuredData(SERVICE_PROVIDERS_SEO)}
      />
      <Suspense>
        <ServiceProvidersClient />
      </Suspense>
    </>
  )
}

export const metadata = createMetadata({
  title: SERVICE_PROVIDERS_SEO.title,
  description: SERVICE_PROVIDERS_SEO.description,
  path: PATHS.SERVICE_PROVIDERS.path,
})
