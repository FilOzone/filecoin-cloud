import { redirect } from 'next/navigation'
import { Suspense } from 'react'

import { StructuredDataScript } from '@/components/StructuredDataScript'

import { PATHS } from '@/constants/paths'
import { createMetadata } from '@/utils/create-metadata'

import { WarmStorageServicesClient } from './components/WarmStorageServicesClient'
import { WARM_STORAGE_SERVICE_SEO } from './constants/seo'
import { generateStructuredData } from './utils/generate-structured-data'

type SearchParams = Record<string, string | string[] | undefined>

type WarmStorageServicePageProps = {
  searchParams: SearchParams | Promise<SearchParams>
}

export default async function WarmStorageService({
  searchParams,
}: WarmStorageServicePageProps) {
  const resolvedSearchParams = await searchParams
  const chainParam = resolvedSearchParams.chain
  const hasChain =
    typeof chainParam === 'string'
      ? chainParam.length > 0
      : Array.isArray(chainParam) && chainParam.length > 0

  if (!hasChain) {
    const nextSearchParams = new URLSearchParams()

    for (const [key, value] of Object.entries(resolvedSearchParams)) {
      if (typeof value === 'string') {
        nextSearchParams.set(key, value)
      } else if (Array.isArray(value)) {
        for (const entry of value) {
          nextSearchParams.append(key, entry)
        }
      }
    }

    nextSearchParams.set('chain', '314')
    redirect(
      `${PATHS.WARM_STORAGE_SERVICE.path}?${nextSearchParams.toString()}`,
    )
  }

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
