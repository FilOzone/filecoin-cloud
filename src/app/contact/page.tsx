import { Container } from '@filecoin-foundation/ui-filecoin/Container'
import { PageHeader } from '@filecoin-foundation/ui-filecoin/PageHeader'
import { PageSection } from '@filecoin-foundation/ui-filecoin/PageSection'
import { ExternalTextLink } from '@filecoin-foundation/ui-filecoin/TextLink/ExternalTextLink'
import { SmartTextLink } from '@filecoin-foundation/ui-filecoin/TextLink/SmartTextLink'

import { Navigation } from '@/components/Navigation/Navigation'
import { StructuredDataScript } from '@/components/StructuredDataScript'

import { PATHS } from '@/constants/paths'
import { FOC_URLS } from '@/constants/site-metadata'
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
          <div className="mx-auto max-w-2xl space-y-10">
            <section
              aria-labelledby="technical-support-heading"
              className="border-y border-(--color-border-base) py-8"
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <h2
                    id="technical-support-heading"
                    className="font-semibold text-2xl text-(--color-text-base)"
                  >
                    Need technical support?
                  </h2>
                  <p className="text-(--color-paragraph-text)">
                    Use the channel that best matches what you need.
                  </p>
                  <p className="text-(--color-paragraph-text)">
                    For the full list of support and community channels, see the{' '}
                    <SmartTextLink href={PATHS.SUPPORT.path}>
                      Support page
                    </SmartTextLink>
                    .
                  </p>
                </div>

                <ul className="space-y-3 text-(--color-paragraph-text)">
                  <li>
                    <strong className="font-medium text-(--color-text-base)">
                      Quick troubleshooting:
                    </strong>{' '}
                    join the{' '}
                    <ExternalTextLink href={FOC_URLS.social.slack}>
                      #fil-foc channel on Filecoin Slack
                    </ExternalTextLink>
                    .
                  </li>
                  <li>
                    <strong className="font-medium text-(--color-text-base)">
                      Reproducible or persistent problems:
                    </strong>{' '}
                    <ExternalTextLink
                      href={FOC_URLS.filecoinCloud.problemReports}
                    >
                      report a FOC problem on GitHub
                    </ExternalTextLink>
                    .
                  </li>
                  <li>
                    <strong className="font-medium text-(--color-text-base)">
                      Outages or active incidents:
                    </strong>{' '}
                    check the{' '}
                    <ExternalTextLink href={FOC_URLS.status}>
                      Filecoin Cloud status page
                    </ExternalTextLink>
                    .
                  </li>
                  <li>
                    <strong className="font-medium text-(--color-text-base)">
                      Use cases or product feedback:
                    </strong>{' '}
                    send the team a note below.
                  </li>
                </ul>
              </div>
            </section>

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
