import { Container } from '@filecoin-foundation/ui-filecoin/Container'
import { MobileNavigation } from '@filecoin-foundation/ui-filecoin/Navigation/MobileNavigation'
import { NavigationMainLink } from '@filecoin-foundation/ui-filecoin/Navigation/NavigationMainLink'
import {
  Section,
  type SectionProps,
} from '@filecoin-foundation/ui-filecoin/Section/Section'

import { HomeLogoIconLink } from './components/HomeLogoIconLink'
import { mobileNavigationItems } from './constants/navigation'
import { DesktopNavigation } from './DesktopNavigation'

type NavigationProps = {
  backgroundVariant: SectionProps['backgroundVariant']
}

export function Navigation({ backgroundVariant }: NavigationProps) {
  // To Update once @filecoin-foundation/ui-filecoin is updated to 0.1.6
  // [ ] Move responsive classes outside of MobileNavigation/DesktopNavigation and inside here. lg should be better than xl

  return (
    <Section as="header" backgroundVariant={backgroundVariant}>
      <Container>
        <nav className="flex items-center justify-between py-8 lg:gap-24">
          <HomeLogoIconLink />
          <MobileNavigation
            items={mobileNavigationItems}
            NavigationMainLinkComponent={NavigationMainLink}
            HomeLogoIconLinkComponent={HomeLogoIconLink}
          />
          <DesktopNavigation />
        </nav>
      </Container>
    </Section>
  )
}
