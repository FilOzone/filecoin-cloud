'use client'

import {
  type NavigationLinkProps as SharedNavigationLinkProps,
  NavigationMainLink as SharedNavigationMainLink,
} from '@filecoin-foundation/ui-filecoin/Navigation/NavigationMainLink'
import Link from 'next/link'
import type { ComponentProps, ComponentType } from 'react'

type LinkProps = ComponentProps<typeof Link>
type GenericLinkProps = Omit<LinkProps, 'locale' | 'href'> & { href: string }
export type GenericLinkType = ComponentType<GenericLinkProps>

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
