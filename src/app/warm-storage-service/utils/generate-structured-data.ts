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
    path: PATHS.WARM_STORAGE_SERVICE.path,
    pageType: 'WebPage',
    service: {
      name: 'Warm Storage Service',
      description:
        'Verifiable storage powered by Filecoin PDP, with optional fast content delivery through Filecoin Beam, a CDN gateway add-on.',
      serviceType: 'Cloud Storage',
      areaServed: 'Worldwide',
    },
  })
}
