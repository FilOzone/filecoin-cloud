import { FILECOIN_PAY_NAVIGATION_LABEL, PATHS } from '@/constants/paths'

type NavItem = {
  label: string
  href: string
}

type ExpandedNavItem = NavItem & {
  description: string
}

export type NavigationMenuItem = {
  label: string
  items: Array<{
    title: string
    links: Array<ExpandedNavItem>
  }>
}

type HeaderNavItem = NavItem | NavigationMenuItem

export const headerNavigationItems: Array<HeaderNavItem> = [
  {
    label: PATHS.SERVICE_PROVIDERS.label,
    href: PATHS.SERVICE_PROVIDERS.path,
  },
  {
    label: PATHS.WARM_STORAGE_SERVICE.label,
    href: PATHS.WARM_STORAGE_SERVICE.path,
  },
  {
    label: FILECOIN_PAY_NAVIGATION_LABEL,
    items: [
      {
        title: FILECOIN_PAY_NAVIGATION_LABEL,
        links: [
          {
            label: PATHS.FILECOIN_PAY_CONSOLE.label,
            description: 'Understand what Filecoin is and how it works',
            href: PATHS.FILECOIN_PAY_CONSOLE.path,
          },
          {
            label: PATHS.FILECOIN_PAY_CONSOLE_RAILS.label,
            description: 'See how others are using Filecoin in the real world',
            href: PATHS.FILECOIN_PAY_CONSOLE_RAILS.path,
          },
          {
            label: PATHS.FILECOIN_PAY_CONSOLE_ACCOUNTS.label,
            description: 'See how others are using Filecoin in the real world',
            href: PATHS.FILECOIN_PAY_CONSOLE_ACCOUNTS.path,
          },
          {
            label: PATHS.FILECOIN_PAY_CONSOLE_OPERATORS.label,
            description: 'See how others are using Filecoin in the real world',
            href: PATHS.FILECOIN_PAY_CONSOLE_OPERATORS.path,
          },
        ],
      },
    ],
  },
  {
    label: 'Documentation',
    href: 'https://docs.filecoin.io/',
  },
]
