import type { BreadcrumbList, ListItem } from 'schema-dts'

import { PATHS, type StaticPath } from '@/constants/paths'
import { BASE_URL } from '@/constants/site-metadata'

type GenerateBreadcrumbListProps = {
  path: string
  title: string
  parentPaths?: Array<{ path: StaticPath; title: string }>
}

// TODO: We could reuse the function from filecoin-site, we just need to move it the the shared UI-FILECOIN library
export function generateBreadcrumbList({
  path,
  title,
  parentPaths = [],
}: GenerateBreadcrumbListProps): BreadcrumbList | null {
  const HOME_ITEM: ListItem = {
    '@type': 'ListItem',
    position: 1,
    name: 'Home',
    item: BASE_URL,
  }

  if (path === (PATHS.HOMEPAGE.path as `/${string}`)) {
    return null
  }

  const items: Array<ListItem> = [
    HOME_ITEM,
    ...parentPaths.map((level, index) => ({
      '@type': 'ListItem' as const,
      position: index + 2,
      name: level.title,
      item: `${BASE_URL}${level.path}`,
    })),
    {
      '@type': 'ListItem' as const,
      position: parentPaths.length + 2,
      name: title,
      item: `${BASE_URL}${path}`,
    },
  ]

  return { '@type': 'BreadcrumbList', itemListElement: items }
}
