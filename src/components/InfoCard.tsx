import {
  InfoCard as SharedInfoCard,
  type InfoCardProps as SharedInfoCardProps,
} from '@filecoin-foundation/ui-filecoin/InfoCard'

import { BASE_DOMAIN } from '@/constants/site-metadata'

export type InfoCardProps = Omit<SharedInfoCardProps, 'baseDomain'>

export function InfoCard(props: InfoCardProps) {
  const { href, ariaLabel, ...rest } = props
  if (href && ariaLabel) {
    return (
      <SharedInfoCard
        href={href}
        baseDomain={BASE_DOMAIN}
        ariaLabel={ariaLabel}
        {...rest}
      />
    )
  }

  return <SharedInfoCard {...rest} />
}
