'use client'

import { desktopStyle } from '@filecoin-foundation/filecoin-ui/Navigation/NavigationMainLink'
import { NavigationMenu as SharedNavigationMenu } from '@filecoin-foundation/filecoin-ui/Navigation/NavigationMenu'
import { NavigationMenuPanel } from '@filecoin-foundation/filecoin-ui/Navigation/NavigationMenuPanel'
import clsx from 'clsx'

import { NavigationMenuLink } from './NavigationMenuLink'
import type { NavigationMenuItem } from '../constants/navigation'
import { useIsNavigationMenuActive } from '../hooks/useNavigationMenuActive'

export function NavigationMenu({ label, items }: NavigationMenuItem) {
  const isActive = useIsNavigationMenuActive(items)

  return (
    <SharedNavigationMenu
      key={label}
      as="li"
      label={label}
      isCurrent={isActive}
      labelClassName={clsx(desktopStyle, 'inline-flex items-center gap-2')}
    >
      <NavigationMenuPanel
        items={items}
        NavigationMenuLinkComponent={NavigationMenuLink}
      />
    </SharedNavigationMenu>
  )
}
