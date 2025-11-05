import { Container } from '@filecoin-foundation/ui-filecoin/Container'
import { HomeLogoLink } from '@filecoin-foundation/ui-filecoin/HomeLogoLink'
import {
  Section,
  type SectionProps,
} from '@filecoin-foundation/ui-filecoin/Section'

import LogoDark from '@/public/foc-logo-dark.svg'
import LogoLight from '@/public/foc-logo-light.svg'

import { DesktopNavigation } from './DesktopNavigation'

type NavigationProps = {
  backgroundVariant: SectionProps['backgroundVariant']
}

export function Navigation({ backgroundVariant }: NavigationProps) {
  return (
    <Section as="header" backgroundVariant={backgroundVariant}>
      <Container>
        <nav className="flex items-center justify-between py-8 lg:gap-24">
          <HomeLogoLink
            logo={backgroundVariant === 'light' ? LogoDark : LogoLight}
            height={40}
          />{' '}
          <DesktopNavigation />
        </nav>
      </Container>
    </Section>
  )
}
