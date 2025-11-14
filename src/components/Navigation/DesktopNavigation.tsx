'use client'

import { NavigationMainLink } from '@filecoin-foundation/ui-filecoin/Navigation/NavigationMainLink'
import { NetworkSelector } from '@filecoin-foundation/ui-filecoin/Network/NetworkSelector'
import { usePathname } from 'next/navigation'

import { headerNavigationItems } from './constants/navigation'
import { NavigationMenu } from './NavigationMenu/NavigationMenu'

export function DesktopNavigation() {
  const pathname = usePathname()
  // TODO: Refactor this to use the PATHS constant and remove hidden prefix
  const showNetworkSelector =
    pathname.startsWith('/hidden/service-providers') ||
    pathname.startsWith('/hidden/warm-storage-service')

  return (
    <div className="flex w-full items-center justify-end gap-4">
      <ul aria-label="Main navigation menu" className="flex items-center gap-6">
        {headerNavigationItems.map((item) => {
          if ('items' in item) {
            return <NavigationMenu key={item.label} {...item} />
          }

          return (
            <li key={item.href}>
              <NavigationMainLink on="desktop" {...item} />
            </li>
          )
        })}
      </ul>

      {showNetworkSelector && (
        <div className="max-w-56 grow">
          <NetworkSelector />
        </div>
      )}
    </div>
  )
}
