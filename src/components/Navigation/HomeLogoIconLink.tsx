'use client'

import { HomeLogoLink } from '@filecoin-foundation/ui-filecoin/HomeLogoLink'
import { useBackground } from '@filecoin-foundation/ui-filecoin/Section/Section'

import { SantaHat } from '@/components/SantaHat'

import { useKonamiCode } from '@/hooks/use-konami-code'
import LogoDark from '@/public/assets/logos/foc-logo-dark.svg'
import LogoLight from '@/public/assets/logos/foc-logo-light.svg'

export function HomeLogoIconLink() {
  const { isLight } = useBackground()
  const { showHat } = useKonamiCode()

  return (
    <div className="relative">
      <HomeLogoLink logo={isLight ? LogoDark : LogoLight} height={40} />
      <SantaHat show={showHat} />
    </div>
  )
}
