import { PATHS } from '@/constants/paths'
import { createMetadata } from '@/utils/create-metadata'

import { WarmStorageServicePage } from './components/WarmStorageServicePage'
import { WARM_STORAGE_SERVICE_SEO } from './constants/seo'

export default function WarmStorageService() {
  return <WarmStorageServicePage />
}

export const metadata = createMetadata({
  title: WARM_STORAGE_SERVICE_SEO.title,
  description: WARM_STORAGE_SERVICE_SEO.description,
  path: PATHS.WARM_STORAGE_SERVICE.path as `/${string}`,
})
