'use client'

import {
  type NavigationLinkProps as SharedNavigationLinkProps,
  NavigationMainLink as SharedNavigationMainLink,
} from '@filecoin-foundation/ui-filecoin/Navigation/NavigationMainLink'
import type { GenericLinkType } from '@filecoin-foundation/ui-filecoin/TextLink/types'
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
    <SharedNavigationMainLink
      InternalLinkComponent={Link as GenericLinkType}
      {...props}
    />
  )
}
