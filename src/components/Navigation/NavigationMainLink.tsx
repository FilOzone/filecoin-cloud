'use client'

import {
  type NavigationLinkProps as SharedNavigationLinkProps,
  NavigationMainLink as SharedNavigationMainLink,
} from '@filecoin-foundation/ui-filecoin/Navigation/NavigationMainLink'

import { SmartTextLink } from '../TextLink/SmartTextLink'

export {
  desktopStyle,
  mobileStyle,
} from '@filecoin-foundation/ui-filecoin/Navigation/NavigationMainLink'

type NavigationLinkProps = Omit<SharedNavigationLinkProps, 'SmartLinkComponent'>

export function NavigationMainLink(props: NavigationLinkProps) {
  return (
    <SharedNavigationMainLink SmartLinkComponent={SmartTextLink} {...props} />
  )
}
