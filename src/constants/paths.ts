import {
  createHiddenPathConfig,
  createPathConfig,
} from '@/utils/create-path-config'

export type StaticPath =
  | '/'
  | '/privacy-policy'
  | '/service-providers'
  | '/terms-of-use'
  | '/warm-storage-service'

export const PATHS = {
  PRIVACY_POLICY: createPathConfig('/privacy-policy', 'Privacy Policy'),
  SERVICE_PROVIDERS: createHiddenPathConfig(
    '/service-providers',
    'Service Providers',
  ),
  TERMS_OF_USE: createPathConfig('/terms-of-use', 'Terms of Use'),
  WARM_STORAGE_SERVICE: createHiddenPathConfig(
    '/warm-storage-service',
    'Warm Storage Service',
  ),
}
