import { Container } from '@filecoin-foundation/ui-filecoin/Container'
import { MobileNavigation } from '@filecoin-foundation/ui-filecoin/Navigation/MobileNavigation'
import {
  Section,
  type SectionProps,
} from '@filecoin-foundation/ui-filecoin/Section/Section'

import { headerNavigationItems } from './constants/navigation'
import { DesktopNavigation } from './DesktopNavigation'
import { HomeLogoIconLink } from './HomeLogoIconLink'

type NavigationProps = {
  backgroundVariant: SectionProps['backgroundVariant']
}

export function Navigation({ backgroundVariant }: NavigationProps) {
  return (
    <Section as="header" backgroundVariant={backgroundVariant}>
      <Container>
        <nav className="flex items-center justify-between py-8 xl:gap-24">
          <HomeLogoIconLink />

          <div className="block lg:hidden">
            <MobileNavigation
              items={headerNavigationItems}
              HomeLogoIconLinkComponent={HomeLogoIconLink}
            />
          </div>

          <div className="hidden lg:block lg:flex-1">
            <DesktopNavigation />
          </div>
        </nav>
      </Container>
    </Section>
  )
}
