import type { WebPageGraph } from '@/components/StructuredDataScript'

import { PATHS } from '@/constants/paths'
import type { StructuredDataParams } from '@/types/structured-data-params'
import { generatePageStructuredData } from '@/utils/generate-page-structured-data'

export function generateStructuredData(
  seo: StructuredDataParams,
): WebPageGraph {
  return generatePageStructuredData({
    title: seo.title,
    description: seo.description,
    path: PATHS.IPFS_TO_FILECOIN.path,
    pageType: 'WebPage',
    service: {
      name: 'IPFS to Filecoin migration',
      description:
        'Move pinned IPFS data to Filecoin warm storage without changing your CIDs, with onchain proof of possession.',
      serviceType: 'Cloud Storage',
      areaServed: 'Worldwide',
    },
  })
}
