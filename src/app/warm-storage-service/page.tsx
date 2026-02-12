import { Suspense } from 'react'

import { StructuredDataScript } from '@/components/StructuredDataScript'

import { PATHS } from '@/constants/paths'
import { createMetadata } from '@/utils/create-metadata'

import { WarmStorageServicesClient } from './components/WarmStorageServicesClient'
import { WARM_STORAGE_SERVICE_SEO } from './constants/seo'
import { generateStructuredData } from './utils/generateStructuredData'

export default function WarmStorageService() {
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
