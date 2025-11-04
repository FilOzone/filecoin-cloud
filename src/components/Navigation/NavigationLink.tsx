'use client'

import {
  type NavigationLinkProps as SharedNavigationLinkProps,
  NavigationMainLink as SharedNavigationMainLink,
} from '@filecoin-foundation/ui-filecoin/Navigation/NavigationMainLink'
import Link from 'next/link'

export {
  desktopStyle,
  mobileStyle,
} from '@filecoin-foundation/ui-filecoin/Navigation/NavigationMainLink'

type NavigationLinkProps = Omit<
  SharedNavigationLinkProps,
  'InternalLinkComponent'
>

export function NavigationLink(props: NavigationLinkProps) {
  return (
    <SharedNavigationMainLink InternalLinkComponent={Link as any} {...props} />
  )
}
