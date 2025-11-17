import { PATHS } from '@/constants/paths'
import { FOC_URLS } from '@/constants/site-metadata'

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
    label: PATHS.WARM_STORAGE_SERVICE.label,
    href: PATHS.WARM_STORAGE_SERVICE.path,
  },
  {
    label: PATHS.SERVICE_PROVIDERS.label,
    href: PATHS.SERVICE_PROVIDERS.path,
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

export const mobileNavigationItems = headerNavigationItems
  .map((item) => {
    if ('href' in item) {
      return item
    }

    return null
  })
  .filter(Boolean) as Array<NavItem>
