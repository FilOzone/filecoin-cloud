import type { Article, CollectionPage, ItemList, ListItem } from 'schema-dts'

import type { WebPageGraph } from '@/components/StructuredDataScript'

import { PATHS } from '@/constants/paths'
import { BASE_URL } from '@/constants/site-metadata'
import { ORGANIZATION_ID } from '@/constants/structured-data'
import type { StructuredDataParams } from '@/types/structured-data-params'
import { generatePageStructuredData } from '@/utils/generate-page-structured-data'

import { AGENTS_SEO, getRFSSeo } from '../constants/seo'

type RFSStructuredDataParams = StructuredDataParams & {
  id: string
  slug: string
}

type GraphNodeWithMainEntity = {
  mainEntity?: { '@id': string }
}

type RFSItemList = ItemList & {
  '@id': string
}

export function generateStructuredData(
  seo: StructuredDataParams,
  requests: Array<RFSStructuredDataParams> = [],
): WebPageGraph {
  const structuredData = generatePageStructuredData({
    title: seo.title,
    description: seo.description,
    path: PATHS.AGENTS.path,
    pageType: 'CollectionPage',
  })

  if (requests.length === 0) {
    return structuredData
  }

  const requestItemList = generateRFSItemList(requests)
  const collectionPage = findGraphNodeByType<
    CollectionPage & GraphNodeWithMainEntity
  >(structuredData, 'CollectionPage')

  if (collectionPage) {
    collectionPage.mainEntity = { '@id': requestItemList['@id'] }
  }

  structuredData['@graph'].push(requestItemList)

  return structuredData
}

export function generateRFSStructuredData(
  request: RFSStructuredDataParams,
): WebPageGraph {
  const seo = getRFSSeo(request)
  const path = `${PATHS.AGENTS.path}/${request.slug}` as `/${string}`
  const webPageUrl = `${BASE_URL}${path}`
  const webPageId = `${webPageUrl}/#webpage`
  const articleId = `${webPageUrl}/#article`
  const structuredData = generatePageStructuredData({
    title: seo.title,
    description: seo.description,
    path,
    pageType: 'WebPage',
    parentPaths: [{ path: PATHS.AGENTS.path, title: AGENTS_SEO.title }],
  })

  const webPage = findGraphNodeById<GraphNodeWithMainEntity>(
    structuredData,
    webPageId,
  )

  if (webPage) {
    webPage.mainEntity = { '@id': articleId }
  }

  const article: Article = {
    '@type': 'Article',
    '@id': articleId,
    headline: `RFS-${request.id}: ${request.title}`,
    name: request.title,
    description: request.description,
    url: webPageUrl,
    author: { '@id': ORGANIZATION_ID },
    publisher: { '@id': ORGANIZATION_ID },
    isPartOf: { '@id': webPageId },
    mainEntityOfPage: { '@id': webPageId },
  }

  structuredData['@graph'].push(article)

  return structuredData
}

function generateRFSItemList(
  requests: Array<RFSStructuredDataParams>,
): RFSItemList {
  const itemListElement: ListItem[] = requests.map((request, index) => {
    const url = `${BASE_URL}${PATHS.AGENTS.path}/${request.slug}`

    return {
      '@type': 'ListItem',
      position: index + 1,
      url,
      name: `RFS-${request.id}: ${request.title}`,
      description: request.description,
    }
  })

  return {
    '@type': 'ItemList',
    '@id': `${BASE_URL}${PATHS.AGENTS.path}/#requests-for-startups`,
    name: 'Open AI Agent Requests for Startups',
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: requests.length,
    itemListElement,
  }
}

function findGraphNodeByType<T>(structuredData: WebPageGraph, type: string) {
  return structuredData['@graph'].find((node) => {
    const nodeType = (node as { '@type'?: string | Array<string> })['@type']

    return Array.isArray(nodeType) ? nodeType.includes(type) : nodeType === type
  }) as T | undefined
}

function findGraphNodeById<T>(structuredData: WebPageGraph, id: string) {
  return structuredData['@graph'].find(
    (node) => (node as { '@id'?: string })['@id'] === id,
  ) as T | undefined
}
