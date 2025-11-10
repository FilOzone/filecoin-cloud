import {
  SimpleCard as SharedSimpleCard,
  type SimpleCardProps as SharedSimpleCardProps,
} from '@filecoin-foundation/ui-filecoin/SimpleCard'

import { CtaLink } from './CtaLink'

export type { SimpleCardData } from '@filecoin-foundation/ui-filecoin/SimpleCard'

export type SimpleCardProps = Omit<SharedSimpleCardProps, 'CTALinkComponent'>

export function SimpleCard(props: SimpleCardProps) {
  return <SharedSimpleCard {...props} CTALinkComponent={CtaLink} />
}
