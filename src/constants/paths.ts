import { createPathConfig } from '@/app/utils/createPathConfig'

export type StaticPath =
  | '/'
  | '/service-providers'
  | '/warm-storage-service'
  | '/filecoin-pay-console'
  | '/filecoin-pay-console/rails'
  | '/filecoin-pay-console/accounts'
  | '/filecoin-pay-console/operators'

export const FILECOIN_PAY_NAVIGATION_LABEL = 'Filecoin Pay'

export const PATHS = {
  SERVICE_PROVIDERS: createPathConfig(
    '/service-providers',
    'Service Providers',
  ),
  WARM_STORAGE_SERVICE: createPathConfig(
    '/warm-storage-service',
    'Warm Storage Service',
  ),
  FILECOIN_PAY_CONSOLE: createPathConfig('/filecoin-pay-console', 'Console'),
  FILECOIN_PAY_CONSOLE_ACCOUNTS: createPathConfig(
    '/filecoin-pay-console/accounts',
    'Accounts',
  ),
  FILECOIN_PAY_CONSOLE_OPERATORS: createPathConfig(
    '/filecoin-pay-console/operators',
    'Operators',
  ),
  FILECOIN_PAY_CONSOLE_RAILS: createPathConfig(
    '/filecoin-pay-console/rails',
    'Rails',
  ),
}
