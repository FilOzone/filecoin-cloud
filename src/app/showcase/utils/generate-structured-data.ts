import type { CollectionPage, ItemList, ListItem } from 'schema-dts'

import type { WebPageGraph } from '@/components/StructuredDataScript'

import { PATHS } from '@/constants/paths'
import { BASE_URL } from '@/constants/site-metadata'
import type { StructuredDataParams } from '@/types/structured-data-params'
import { generatePageStructuredData } from '@/utils/generate-page-structured-data'

export type ShowcaseListItem = {
  title: string
  description: string
  url: string
}

type GraphNodeWithMainEntity = {
  mainEntity?: { '@id': string }
}

type ShowcaseItemList = ItemList & {
  '@id': string
}

export function generateStructuredData(
  seo: StructuredDataParams,
  items: Array<ShowcaseListItem> = [],
): WebPageGraph {
  const structuredData = generatePageStructuredData({
    title: seo.title,
    description: seo.description,
    path: PATHS.SHOWCASE.path,
    pageType: 'CollectionPage',
  })

  if (items.length === 0) {
    return structuredData
  }

  const itemList = generateShowcaseItemList(items)
  const collectionPage = findGraphNodeByType<
    CollectionPage & GraphNodeWithMainEntity
  >(structuredData, 'CollectionPage')

  if (collectionPage) {
    collectionPage.mainEntity = { '@id': itemList['@id'] }
  }

  structuredData['@graph'].push(itemList)

  return structuredData
}

function generateShowcaseItemList(
  items: Array<ShowcaseListItem>,
): ShowcaseItemList {
  const itemListElement: ListItem[] = items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: item.url,
    name: item.title,
    description: item.description,
  }))

  return {
    '@type': 'ItemList',
    '@id': `${BASE_URL}${PATHS.SHOWCASE.path}/#showcase`,
    name: 'Projects built with Filecoin Onchain Cloud',
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: items.length,
    itemListElement,
  }
}

function findGraphNodeByType<T>(structuredData: WebPageGraph, type: string) {
  return structuredData['@graph'].find((node) => {
    const nodeType = (node as { '@type'?: string | Array<string> })['@type']

    return Array.isArray(nodeType) ? nodeType.includes(type) : nodeType === type
  }) as T | undefined
}
