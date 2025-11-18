import {
  Card as SharedCard,
  type CardProps as SharedCardProps,
} from '@filecoin-foundation/ui-filecoin/Card'

import { CtaLink } from './CtaLink'

type CardProps = Omit<SharedCardProps, 'cta'> & {
  cta?: Pick<NonNullable<SharedCardProps['cta']>, 'href' | 'text'>
}

export function Card(props: CardProps) {
  const { cta, ...rest } = props

  const cardProps = {
    ...rest,
    cta: cta && {
      ...cta,
      CTALinkComponent: CtaLink,
    },
  } as SharedCardProps

  return <SharedCard {...cardProps} />
}
