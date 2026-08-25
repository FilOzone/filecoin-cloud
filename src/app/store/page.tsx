import { Button } from '@filecoin-foundation/ui-filecoin/Button'
import { CardGrid } from '@filecoin-foundation/ui-filecoin/CardGrid'
import { PageHeader } from '@filecoin-foundation/ui-filecoin/PageHeader'
import { PageSection } from '@filecoin-foundation/ui-filecoin/PageSection'
import { SectionContent } from '@filecoin-foundation/ui-filecoin/SectionContent'
import { ExternalTextLink } from '@filecoin-foundation/ui-filecoin/TextLink/ExternalTextLink'

import { ComparisonTable } from '@/components/ComparisonTable'
import { Navigation } from '@/components/Navigation/Navigation'
import { SimpleCardWithImage } from '@/components/SimpleCardWithImage'
import { StructuredDataScript } from '@/components/StructuredDataScript'

import { PATHS } from '@/constants/paths'
import { FOC_URLS } from '@/constants/site-metadata'
import {
  WARM_VS_COLD_COLUMN_LABELS,
  warmVsColdComparison,
} from '@/constants/warm-vs-cold-comparison'
import { createMetadata } from '@/utils/create-metadata'

import { STORE_SEO } from './constants/seo'
import { storeOfferings } from './data/store-offerings'
import { generateStructuredData } from './utils/generate-structured-data'

export default function Store() {
  return (
    <>
      <StructuredDataScript
        structuredData={generateStructuredData(STORE_SEO)}
      />

      <Navigation backgroundVariant="dark" />

      <PageSection backgroundVariant="dark">
        <PageHeader
          centered
          variant="highContrast"
          title="The Filecoin Storage Marketplace"
          description="Filecoin Onchain Cloud is a marketplace of onchain-verified storage services, settled through Filecoin Pay. Choose warm storage for active data or cold storage for large archives."
          cta={[
            <Button
              key="explore-warm-storage"
              href={PATHS.WARM_STORAGE_SERVICE.path}
              variant="primary"
            >
              Explore Warm Storage
            </Button>,
            <Button
              key="explore-cold-storage"
              href={PATHS.COLD_STORAGE_SERVICE.path}
              variant="ghost"
              className="!border-zinc-50/40 !bg-transparent hover:!border-zinc-50 hover:!bg-zinc-50/5"
            >
              Explore Cold Storage
            </Button>,
          ]}
        />
      </PageSection>

      <PageSection backgroundVariant="light">
        <SectionContent
          headingTag="h2"
          title="Two storage services, one marketplace"
        >
          <CardGrid as="ul" variant="smTwoLgThreeWider">
            {storeOfferings.map(({ title, description, cta, image }) => (
              <SimpleCardWithImage
                key={title}
                title={title}
                description={description}
                cta={cta}
                image={image}
              />
            ))}
          </CardGrid>
        </SectionContent>
      </PageSection>

      <PageSection backgroundVariant="light" paddingVariant="topNone">
        <SectionContent
          centerTitle
          headingTag="h2"
          title="Which one do I need?"
          description="Both settle payment automatically through Filecoin Pay — the difference is the proof mechanism and access pattern underneath."
        >
          <ComparisonTable
            caption="Comparison of Filecoin Warm Storage and Filecoin Cold Storage"
            columnLabels={[...WARM_VS_COLD_COLUMN_LABELS]}
            rows={warmVsColdComparison}
          />
        </SectionContent>
      </PageSection>

      <PageSection backgroundVariant="dark">
        <SectionContent
          centerCTA
          centerTitle
          headingTag="h2"
          title="Every service settles through Filecoin Pay"
          description="Filecoin Pay is the payment rail underneath the marketplace, not a separate storage product. Smart contracts confirm performance before releasing funds, so you pay only for storage that's actually proven."
          cta={
            <Button href={FOC_URLS.filecoinPay} variant="primary">
              Learn about Filecoin Pay
            </Button>
          }
        />
      </PageSection>

      <PageSection backgroundVariant="light">
        <SectionContent
          centerCTA
          centerTitle
          headingTag="h2"
          title="Not sure which fits your data?"
          description="Tell us about your dataset and we'll help you pick the right storage service."
          cta={
            <Button href={PATHS.CONTACT.path} variant="primary">
              Talk to our team
            </Button>
          }
        >
          <p className="text-center text-(--color-paragraph-text)">
            Building a storage service of your own?{' '}
            <ExternalTextLink href={FOC_URLS.documentation.home}>
              See the docs
            </ExternalTextLink>{' '}
            to learn how the marketplace works.
          </p>
        </SectionContent>
      </PageSection>
    </>
  )
}

export const metadata = createMetadata({
  title: STORE_SEO.title,
  description: STORE_SEO.description,
  path: PATHS.STORE.path,
})
