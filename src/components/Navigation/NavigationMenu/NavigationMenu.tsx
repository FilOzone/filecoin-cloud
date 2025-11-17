'use client'

import { NavigationMenu as SharedNavigationMenu } from '@filecoin-foundation/ui-filecoin/Navigation/NavigationMenu'
import { NavigationMenuPanel } from '@filecoin-foundation/ui-filecoin/Navigation/NavigationMenuPanel'
import clsx from 'clsx'

import { NavigationMenuLink } from './NavigationMenuLink'
import type { NavigationMenuItem } from '../constants/navigation'
import { useIsNavigationMenuActive } from '../hooks/use-navigation-menu-active'
import { desktopStyle } from '../NavigationMainLink'

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
