import type {
  NavItem,
  NavigationMenuItem,
} from '@filecoin-foundation/ui-filecoin/Navigation/types'

import { PATHS } from '@/constants/paths'
import { FOC_URLS } from '@/constants/site-metadata'

export const headerNavigationItems: Array<NavItem | NavigationMenuItem> = [
  {
    label: PATHS.WARM_STORAGE_SERVICE.label,
    href: PATHS.WARM_STORAGE_SERVICE.path,
  },
  {
    label: PATHS.SERVICE_PROVIDERS.label,
    href: PATHS.SERVICE_PROVIDERS.path,
  },
  {
    label: 'Resources',
    items: [
      {
        title: 'Resources',
        links: [
          {
            description: 'Learn about the Filecoin Agents program',
            label: PATHS.AGENTS.label,
            href: PATHS.AGENTS.path,
          },
        ],
      },
    ],
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

export const mobileNavigationItems: Array<NavItem> = [
  {
    label: PATHS.WARM_STORAGE_SERVICE.label,
    href: PATHS.WARM_STORAGE_SERVICE.path,
  },
  {
    label: PATHS.SERVICE_PROVIDERS.label,
    href: PATHS.SERVICE_PROVIDERS.path,
  },
  {
    label: PATHS.AGENTS.label,
    href: PATHS.AGENTS.path,
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
