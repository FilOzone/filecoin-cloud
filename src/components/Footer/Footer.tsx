import { Section } from '@filecoin-foundation/ui-filecoin/Section/Section'

import { Container } from '@/components/Container'

import { LegalSection } from './LegalSection'

export function Footer() {
  return (
    <Section as="footer" backgroundVariant="dark">
      <Container>
        <LegalSection />
      </Container>
    </Section>
  )
}
