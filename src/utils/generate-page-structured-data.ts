import type { WebPage } from 'schema-dts'

import type { NextRoute } from '@/constants/paths'
import { BASE_URL } from '@/constants/site-metadata'
import type { StructuredDataParams } from '@/types/structured-data-params'

import { generateBreadcrumbList } from './generate-breadcrumb-list'
export type PageType = WebPage['@type']

import type { WebPageGraph } from '@/components/StructuredDataScript'

import {
  ORGANIZATION_SCHEMA,
  SCHEMA_CONTEXT_URL,
  STRUCTURED_DATA_IDS,
  WEBSITE_SCHEMA,
} from '@/constants/structured-data'

import { generateImageObject } from './generate-image-object'
import { generateServiceSchema } from './generate-service-schema'

type GenerateWebPageStructuredDataProps = StructuredDataParams & {
  path: NextRoute
  pageType: PageType
  imageUrl?: string
  service?: {
    name: string
    description: string
    imageUrl?: string
    serviceType: string
    areaServed: string
  }
}

const WEBSITE_ID = WEBSITE_SCHEMA['@id'] as string

export function generatePageStructuredData({
  title,
  description,
  path,
  pageType,
  imageUrl,
  service,
}: GenerateWebPageStructuredDataProps): WebPageGraph {
  const webPageUrl = `${BASE_URL}${path}`
  const webPageId = `${webPageUrl}/${STRUCTURED_DATA_IDS.WEBPAGE}`
  const serviceId = `${webPageUrl}/${STRUCTURED_DATA_IDS.SERVICE}`

  const webPageSchema: WebPage = {
    '@type': pageType,
    '@id': webPageId,
    url: webPageUrl,
    name: title,
    description,
    ...(imageUrl && { image: generateImageObject({ imageUrl }) }),
    isPartOf: { '@id': WEBSITE_ID },
    mainEntityOfPage: webPageUrl,
  }

  const graph: WebPageGraph['@graph'] = [
    ORGANIZATION_SCHEMA,
    WEBSITE_SCHEMA,
    webPageSchema,
  ]

  if (service) {
    const serviceSchema = generateServiceSchema({
      id: serviceId,
      name: service.name,
      description: service.description,
      imageUrl: service.imageUrl,
      webPageUrl,
      serviceType: service.serviceType,
      areaServed: service.areaServed,
    })

    graph.push(serviceSchema)
  }

  const breadcrumbList = generateBreadcrumbList({ path, title })
  if (breadcrumbList) {
    graph.push(breadcrumbList)
  }

  return {
    '@context': SCHEMA_CONTEXT_URL,
    '@graph': graph,
  }
}
