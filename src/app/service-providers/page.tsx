import { redirect } from 'next/navigation'
import { Suspense } from 'react'

import { StructuredDataScript } from '@/components/StructuredDataScript'

import { PATHS } from '@/constants/paths'
import { createMetadata } from '@/utils/create-metadata'

import { ServiceProvidersClient } from './components/ServiceProvidersClient'
import { SERVICE_PROVIDERS_SEO } from './constants/seo'
import { generateStructuredData } from './utils/generate-structured-data'

type SearchParams = Record<string, string | string[] | undefined>

type ServiceProvidersPageProps = {
  searchParams: SearchParams | Promise<SearchParams>
}

export default async function ServiceProviders({
  searchParams,
}: ServiceProvidersPageProps) {
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
    redirect(`${PATHS.SERVICE_PROVIDERS.path}?${nextSearchParams.toString()}`)
  }

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
