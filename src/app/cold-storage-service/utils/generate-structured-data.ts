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
    path: PATHS.COLD_STORAGE_SERVICE.path,
    pageType: 'WebPage',
    service: {
      name: 'Cold Storage Service',
      description:
        'Low-cost, durable archival storage sealed and proven with Proof of Replication (PoRep) across a decentralized network of storage providers.',
      serviceType: 'Cloud Storage',
      areaServed: 'Worldwide',
    },
  })
}
