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
    label: 'Resources',
    items: [
      {
        title: 'Resources',
        links: [
          {
            description: 'Demos, SDKs, and agent tools built on FOC',
            label: PATHS.SHOWCASE.label,
            href: PATHS.SHOWCASE.path,
          },
          {
            description: 'Learn about the Filecoin Agents program',
            label: PATHS.AGENTS.label,
            href: PATHS.AGENTS.path,
          },
          {
            description: 'Find the right support channel for FOC',
            label: PATHS.SUPPORT.label,
            href: PATHS.SUPPORT.path,
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
  {
    label: 'Status',
    href: FOC_URLS.status,
  },
  {
    label: PATHS.CONTACT.label,
    href: PATHS.CONTACT.path,
  },
]

export const mobileNavigationItems: Array<NavItem> = [
  {
    label: PATHS.WARM_STORAGE_SERVICE.label,
    href: PATHS.WARM_STORAGE_SERVICE.path,
  },
  {
    label: PATHS.SHOWCASE.label,
    href: PATHS.SHOWCASE.path,
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
  {
    label: 'Status',
    href: FOC_URLS.status,
  },
  {
    label: PATHS.SUPPORT.label,
    href: PATHS.SUPPORT.path,
  },
  {
    label: PATHS.CONTACT.label,
    href: PATHS.CONTACT.path,
  },
]
