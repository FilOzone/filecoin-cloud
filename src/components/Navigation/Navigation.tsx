import { Container } from '@filecoin-foundation/ui-filecoin/Container'
import { HomeLogoLink } from '@filecoin-foundation/ui-filecoin/HomeLogoLink'
import {
  Section,
  type SectionProps,
} from '@filecoin-foundation/ui-filecoin/Section'

import Logo from '@/public/foc-logo.svg'

import { DesktopNavigation } from './DesktopNavigation'

type NavigationProps = {
  backgroundVariant: SectionProps['backgroundVariant']
}

export function Navigation({ backgroundVariant }: NavigationProps) {
  return (
    <Section as="header" backgroundVariant={backgroundVariant}>
      <Container>
        <nav className="flex items-center justify-between py-8 lg:gap-24">
          <HomeLogoLink logo={Logo} height={40} /> <DesktopNavigation />
        </nav>
      </Container>
    </Section>
  )
}
