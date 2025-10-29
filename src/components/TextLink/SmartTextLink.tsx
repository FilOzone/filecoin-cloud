import {
  SmartTextLink as SharedSmartTextLink,
  type SmartTextLinkProps as SharedSmartTextLinkProps,
} from '@filecoin-foundation/ui-filecoin/TextLink/SmartTextLink'
import Link from 'next/link'

import { BASE_DOMAIN } from '@/constants/siteMetadata'

type SmartTextLinkProps = Omit<
  SharedSmartTextLinkProps,
  'baseDomain' | 'LinkComponent' | 'InternalLinkComponent'
>

export function SmartTextLink(props: SmartTextLinkProps) {
  return (
    <SharedSmartTextLink
      {...props}
      baseDomain={BASE_DOMAIN}
      InternalLinkComponent={Link}
    />
  )
}
