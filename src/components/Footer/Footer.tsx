import { Section } from '@filecoin-foundation/ui-filecoin/Section/Section'

import { Container } from '@/components/Container'

import { LegalSection } from './LegalSection'
import { SiteLinksSection } from './SiteLinksSection'

export function Footer() {
  return (
    <Section as="footer" backgroundVariant="dark">
      <Container>
        <SiteLinksSection />
        <LegalSection />
      </Container>
    </Section>
  )
}
