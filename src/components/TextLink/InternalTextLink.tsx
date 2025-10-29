import {
  InternalTextLink as SharedInternalTextLink,
  type InternalTextLinkProps as SharedInternalTextLinkProps,
} from '@filecoin-foundation/ui-filecoin/TextLink/InternalTextLink'
import Link from 'next/link'

type InternalTextLinkProps = Omit<
  SharedInternalTextLinkProps,
  'LinkComponent' | 'InternalLinkComponent'
>

export function InternalTextLink(props: InternalTextLinkProps) {
  return <SharedInternalTextLink {...props} InternalLinkComponent={Link} />
}
