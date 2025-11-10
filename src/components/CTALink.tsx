import {
  CTALink as SharedCTALink,
  type CTALinkProps as SharedCTALinkProps,
} from '@filecoin-foundation/ui-filecoin/CTALink'
import Link from 'next/link'

import { BASE_DOMAIN } from '@/constants/site-metadata'

export type CtaLinkProps = Omit<
  SharedCTALinkProps,
  'baseDomain' | 'InternalLinkComponent'
>

export function CtaLink(props: CtaLinkProps) {
  return (
    <SharedCTALink
      {...props}
      baseDomain={BASE_DOMAIN}
      InternalLinkComponent={Link}
    />
  )
}
