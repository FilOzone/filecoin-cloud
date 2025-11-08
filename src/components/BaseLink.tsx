import {
  BaseLink as SharedBaseLink,
  type BaseLinkProps as SharedBaseLinkProps,
} from '@filecoin-foundation/filecoin-ui/BaseLink'
import Link from 'next/link'

import { BASE_DOMAIN } from '@/constants/siteMetadata'

export type BaseLinkProps = Omit<
  SharedBaseLinkProps,
  'baseDomain' | 'InternalLinkComponent'
>

export function BaseLink(props: BaseLinkProps) {
  return (
    <SharedBaseLink
      {...props}
      baseDomain={BASE_DOMAIN}
      InternalLinkComponent={Link}
    />
  )
}
