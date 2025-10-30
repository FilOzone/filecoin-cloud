import {
  CTALink as SharedCTALink,
  type CTALinkProps as SharedCTALinkProps,
} from '@filecoin-foundation/ui-filecoin/CTALink'
import Link from 'next/link'

import { BASE_DOMAIN } from '@/constants/siteMetadata'

export type CTALinkProps = Omit<
  SharedCTALinkProps,
  'baseDomain' | 'InternalLinkComponent'
>

export function CTALink(props: CTALinkProps) {
  return (
    <SharedCTALink
      {...props}
      baseDomain={BASE_DOMAIN}
      InternalLinkComponent={Link}
    />
  )
}
