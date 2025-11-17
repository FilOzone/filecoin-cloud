'use client'

import { HomeLogoLink } from '@filecoin-foundation/ui-filecoin/HomeLogoLink'
import { useBackgroundVariant } from '@filecoin-foundation/ui-filecoin/Section/Section'

import LogoDark from '@/public/assets/logos/foc-logo-dark.svg'
import LogoLight from '@/public/assets/logos/foc-logo-light.svg'

export function HomeLogoIconLink() {
  const backgroundVariant = useBackgroundVariant()

  return (
    <HomeLogoLink
      logo={backgroundVariant === 'light' ? LogoDark : LogoLight}
      height={40}
    />
  )
}
