import { createPathConfig } from '@/utils/create-path-config'

export type StaticPath =
  | '/'
  | '/privacy-policy'
  | '/service-providers'
  | '/terms-of-use'
  | '/warm-storage-service'

export const PATHS = {
  SERVICE_PROVIDERS: createPathConfig(
    '/service-providers',
    'Service Providers',
  ),
  WARM_STORAGE_SERVICE: createPathConfig('/warm-storage-service', 'Store'),
}
