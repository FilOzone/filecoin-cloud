'use client'

import { headerNavigationItems } from './constants/navigation'
import { NavigationLink } from './NavigationLink'
import { NavigationMenu } from './NavigationMenu/NavigationMenu'

export function DesktopNavigation() {
  return (
    <div className="hidden xl:flex xl:w-full xl:items-center xl:justify-end xl:gap-4">
      <ul aria-label="Main navigation menu" className="flex items-center gap-6">
        {headerNavigationItems.map((item) => {
          if ('items' in item) {
            return <NavigationMenu key={item.label} {...item} />
          }

          return (
            <li key={item.href}>
              <NavigationLink on="desktop" {...item} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
