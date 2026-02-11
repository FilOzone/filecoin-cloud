import { Button } from '@filecoin-foundation/ui-filecoin/Button'
import { PageSection } from '@filecoin-foundation/ui-filecoin/PageSection'
import { SectionContent } from '@filecoin-foundation/ui-filecoin/SectionContent'

import { Navigation } from '@/components/Navigation/Navigation'
import { StructuredDataScript } from '@/components/StructuredDataScript'

import { PATHS } from '@/constants/paths'
import { createMetadata } from '@/utils/create-metadata'

import { REQUESTS_FOR_STARTUPS_SEO } from './constants/seo'
import { generateStructuredData } from './utils/generateStructuredData'

export default function RequestsForStartups() {
  return (
    <>
      <StructuredDataScript
        structuredData={generateStructuredData(REQUESTS_FOR_STARTUPS_SEO)}
      />

      <Navigation backgroundVariant="light" />
      <PageSection backgroundVariant="light">
        <SectionContent
          headingTag="h1"
          title="Requests for Startups"
          description={[
            'The next generation of cloud users will not be humans. They will be autonomous AI agents — long-lived, identity-aware, and capable of paying for their own storage, compute, and communication. This program exists to make Filecoin Onchain Cloud the default substrate for those agents.',
            'We are seeking teams to deploy AI-native products on FOC mainnet: agent-owned storage, programmable payments, and new economic structures for autonomous agents. Ship running prototypes, not architecture diagrams.',
          ]}
          cta={
            <Button href="https://www.plgenesis.com/" variant="primary">
              Submit a proposal
            </Button>
          }
        />
      </PageSection>
    </>
  )
}

export const metadata = createMetadata({
  title: REQUESTS_FOR_STARTUPS_SEO.title,
  description: REQUESTS_FOR_STARTUPS_SEO.description,
  path: PATHS.REQUESTS_FOR_STARTUPS.path,
})
