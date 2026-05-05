import { Container } from '@filecoin-foundation/ui-filecoin/Container'
import { PageHeader } from '@filecoin-foundation/ui-filecoin/PageHeader'
import { PageSection } from '@filecoin-foundation/ui-filecoin/PageSection'

import { Navigation } from '@/components/Navigation/Navigation'
import { StructuredDataScript } from '@/components/StructuredDataScript'

import { PATHS } from '@/constants/paths'
import { createMetadata } from '@/utils/create-metadata'

import { ContactForm } from './components/ContactForm'
import { CONTACT_SEO } from './constants/seo'
import { generateStructuredData } from './utils/generate-structured-data'

export default function Contact() {
  return (
    <>
      <StructuredDataScript
        structuredData={generateStructuredData(CONTACT_SEO)}
      />

      <Navigation backgroundVariant="light" />
      <PageSection backgroundVariant="light">
        <PageHeader
          centered
          title="Talk to our team"
          description="Tell us about your use case and we'll get back to you shortly."
        />
      </PageSection>

      <PageSection backgroundVariant="light" paddingVariant="topNone">
        <Container>
          <div className="mx-auto max-w-2xl">
            <ContactForm />
          </div>
        </Container>
      </PageSection>
    </>
  )
}

export const metadata = createMetadata({
  title: CONTACT_SEO.title,
  description: CONTACT_SEO.description,
  path: PATHS.CONTACT.path,
})
