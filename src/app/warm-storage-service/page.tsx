import { Suspense } from 'react'

import { StructuredDataScript } from '@/components/StructuredDataScript'

import { PATHS } from '@/constants/paths'
import { createMetadata } from '@/utils/create-metadata'
import {
  type PageSearchParams,
  redirectWithDefaultChain,
} from '@/utils/redirect-with-default-chain'

import { WarmStorageServicesClient } from './components/WarmStorageServicesClient'
import { WARM_STORAGE_SERVICE_SEO } from './constants/seo'
import { generateStructuredData } from './utils/generate-structured-data'

type WarmStorageServicePageProps = {
  searchParams: PageSearchParams | Promise<PageSearchParams>
}

export default async function WarmStorageService({
  searchParams,
}: WarmStorageServicePageProps) {
  const resolvedSearchParams = await searchParams
  redirectWithDefaultChain(
    resolvedSearchParams,
    PATHS.WARM_STORAGE_SERVICE.path,
  )

  return (
    <>
      <StructuredDataScript
        structuredData={generateStructuredData(WARM_STORAGE_SERVICE_SEO)}
      />
      <Suspense>
        <WarmStorageServicesClient />
      </Suspense>
    </>
  )
}

export const metadata = createMetadata({
  title: WARM_STORAGE_SERVICE_SEO.title,
  description: WARM_STORAGE_SERVICE_SEO.description,
  path: PATHS.WARM_STORAGE_SERVICE.path,
})
