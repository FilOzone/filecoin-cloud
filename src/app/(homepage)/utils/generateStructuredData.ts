import type { WebPageGraph } from '@/components/StructuredDataScript'

import { PATHS, type StaticPath } from '@/constants/paths'
import type { StructuredDataParams } from '@/types/structured-data-params'
import { generatePageStructuredData } from '@/utils/generate-page-structured-data'

export function generateStructuredData(
  seo: StructuredDataParams,
): WebPageGraph {
  return generatePageStructuredData({
    title: seo.title,
    description: seo.description,
    path: PATHS.HOMEPAGE.path as StaticPath,
    pageType: 'WebPage',
    imageUrl: '/assets/comet-video-poster.webp',
  })
}
