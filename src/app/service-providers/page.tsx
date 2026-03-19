import { Suspense } from 'react'

import { StructuredDataScript } from '@/components/StructuredDataScript'

import { PATHS } from '@/constants/paths'
import { createMetadata } from '@/utils/create-metadata'
import {
  type PageSearchParams,
  redirectWithDefaultChain,
} from '@/utils/redirect-with-default-chain'

import { ServiceProvidersClient } from './components/ServiceProvidersClient'
import { SERVICE_PROVIDERS_SEO } from './constants/seo'
import { generateStructuredData } from './utils/generate-structured-data'

type ServiceProvidersPageProps = {
  searchParams: PageSearchParams | Promise<PageSearchParams>
}

export default async function ServiceProviders({
  searchParams,
}: ServiceProvidersPageProps) {
  const resolvedSearchParams = await searchParams
  redirectWithDefaultChain(resolvedSearchParams, PATHS.SERVICE_PROVIDERS.path)

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
