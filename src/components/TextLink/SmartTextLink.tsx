import {
  SmartTextLink as SharedSmartTextLink,
  type SmartTextLinkProps as SharedSmartTextLinkProps,
} from '@filecoin-foundation/ui-filecoin/TextLink/SmartTextLink'
import Link from 'next/link'

import { BASE_DOMAIN } from '@/constants/site-metadata'

type SmartTextLinkProps = Omit<
  SharedSmartTextLinkProps,
  'baseDomain' | 'InternalLinkComponent'
>

export function SmartTextLink(props: SmartTextLinkProps) {
  return (
    <SharedSmartTextLink
      {...props}
      baseDomain={BASE_DOMAIN}
      // @ts-expect-error: Types of property 'href' are incompatible: string vs RouteImpl | UrlObject
      InternalLinkComponent={Link}
    />
  )
}
