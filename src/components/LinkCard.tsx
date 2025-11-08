import {
  LinkCard as SharedLinkCard,
  type LinkCardProps as SharedLinkCardProps,
} from '@filecoin-foundation/filecoin-ui/LinkCard'

import { BaseLink } from './BaseLink'

export type { LinkCardData } from '@filecoin-foundation/filecoin-ui/LinkCard'

type LinkCardProps = Omit<SharedLinkCardProps, 'BaseLinkComponent'>

export function LinkCard(props: LinkCardProps) {
  return <SharedLinkCard {...props} BaseLinkComponent={BaseLink} />
}
