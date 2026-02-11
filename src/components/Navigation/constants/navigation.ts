import type { NavItem } from '@filecoin-foundation/ui-filecoin/Navigation/types'

import { PATHS } from '@/constants/paths'
import { FOC_URLS } from '@/constants/site-metadata'

export const headerNavigationItems: Array<NavItem> = [
  {
    label: PATHS.WARM_STORAGE_SERVICE.label,
    href: PATHS.WARM_STORAGE_SERVICE.path,
  },
  {
    label: PATHS.SERVICE_PROVIDERS.label,
    href: PATHS.SERVICE_PROVIDERS.path,
  },
  {
    label: PATHS.REQUESTS_FOR_STARTUPS.label,
    href: PATHS.REQUESTS_FOR_STARTUPS.path,
  },
  {
    label: 'Filecoin Pay',
    href: FOC_URLS.filecoinPay,
  },
  {
    label: 'Documentation',
    href: FOC_URLS.documentation.home,
  },
]
