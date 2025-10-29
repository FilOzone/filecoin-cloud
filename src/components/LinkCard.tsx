import {
  LinkCard as SharedLinkCard,
  type LinkCardProps as SharedLinkCardProps,
} from '@filecoin-foundation/ui-filecoin/LinkCard'

import { BaseLink } from './BaseLink'

export type LinkCardProps = Omit<SharedLinkCardProps, 'BaseLinkComponent'>

export function LinkCard(props: LinkCardProps) {
  return <SharedLinkCard {...props} BaseLinkComponent={BaseLink} />
}
