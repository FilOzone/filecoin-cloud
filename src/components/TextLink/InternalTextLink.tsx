import {
  InternalTextLink as SharedInternalTextLink,
  type InternalTextLinkProps as SharedInternalTextLinkProps,
} from '@filecoin-foundation/filecoin-ui/TextLink/InternalTextLink'
import Link from 'next/link'

type InternalTextLinkProps = Omit<
  SharedInternalTextLinkProps,
  'LinkComponent' | 'InternalLinkComponent'
>

export function InternalTextLink(props: InternalTextLinkProps) {
  return (
    <SharedInternalTextLink
      {...props}
      // @ts-expect-error: Types of property 'href' are incompatible: string vs RouteImpl | UrlObject
      InternalLinkComponent={Link}
    />
  )
}
