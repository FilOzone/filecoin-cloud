import { Button } from '@filecoin-foundation/ui-filecoin/Button'
import { Card } from '@filecoin-foundation/ui-filecoin/Card'
import { CardGrid } from '@filecoin-foundation/ui-filecoin/CardGrid'
import { PageHeader } from '@filecoin-foundation/ui-filecoin/PageHeader'
import { PageSection } from '@filecoin-foundation/ui-filecoin/PageSection'
import { SectionContent } from '@filecoin-foundation/ui-filecoin/SectionContent'
import { SmartTextLink } from '@filecoin-foundation/ui-filecoin/TextLink/SmartTextLink'

import { ComparisonTable } from '@/components/ComparisonTable'
import { Faq } from '@/components/Faq'
import { Navigation } from '@/components/Navigation/Navigation'
import { StructuredDataScript } from '@/components/StructuredDataScript'

import { PATHS } from '@/constants/paths'
import { FOC_URLS } from '@/constants/site-metadata'
import {
  WARM_VS_COLD_COLUMN_LABELS,
  warmVsColdComparison,
} from '@/constants/warm-vs-cold-comparison'
import { createMetadata } from '@/utils/create-metadata'

import { COLD_STORAGE_SERVICE_SEO } from './constants/seo'
import { coldStorageAudience } from './data/cold-storage-audience'
import { coldStorageFeatures } from './data/cold-storage-features'
import { coldStorageFaqs } from './data/faqs'
import { generateStructuredData } from './utils/generate-structured-data'

export default function ColdStorageService() {
  return (
    <>
      <StructuredDataScript
        structuredData={generateStructuredData(COLD_STORAGE_SERVICE_SEO)}
      />

      <Navigation backgroundVariant="dark" />

      <PageSection backgroundVariant="dark">
        <PageHeader
          centered
          title="Filecoin Cold Storage Service (FCSS)"
          variant="highContrast"
          description={
            <p>
              Archive large datasets at low cost, sealed and proven with Proof
              of Replication (PoRep) across a decentralized network of storage
              providers. Need fast, active access instead?{' '}
              <SmartTextLink href={PATHS.WARM_STORAGE_SERVICE.path}>
                See Filecoin Warm Storage
              </SmartTextLink>
              .
            </p>
          }
          cta={[
            <Button
              key="get-a-quote"
              href={FOC_URLS.coldStorageService.externalSite}
              variant="primary"
            >
              Get a quote
            </Button>,
            <Button
              key="talk-to-our-team"
              href={PATHS.CONTACT.path}
              variant="ghost"
              className="!border-zinc-50/40 !bg-transparent hover:!border-zinc-50 hover:!bg-zinc-50/5"
            >
              Talk to our team
            </Button>,
          ]}
        />

        <div className="py-15 md:py-25" />

        <CardGrid as="ul" variant="mdThreeWider">
          {coldStorageFeatures.map(({ title, description, icon }) => (
            <Card
              isCentered
              key={title}
              as="li"
              title={title}
              description={description}
              icon={icon}
            />
          ))}
        </CardGrid>
      </PageSection>

      <PageSection backgroundVariant="light">
        <SectionContent
          centerTitle
          headingTag="h2"
          title="Who it's for"
          description="FCSS is built for datasets of 1TiB and up, where cost per TiB and durability matter more than retrieval speed."
        >
          <CardGrid as="ul" variant="smTwoLgThreeWider">
            {coldStorageAudience.map(({ title, description, icon }) => (
              <Card
                key={title}
                as="li"
                title={title}
                description={description}
                icon={icon}
              />
            ))}
          </CardGrid>
        </SectionContent>
      </PageSection>

      <PageSection backgroundVariant="light" paddingVariant="topNone">
        <SectionContent
          centerTitle
          headingTag="h2"
          title="FCSS vs FWSS"
          description="Both are part of the same Filecoin Onchain Cloud marketplace and settle through Filecoin Pay."
        >
          <ComparisonTable
            caption="Comparison of Filecoin Warm Storage and Filecoin Cold Storage"
            columnLabels={[...WARM_VS_COLD_COLUMN_LABELS]}
            rows={warmVsColdComparison}
          />
        </SectionContent>
      </PageSection>

      <PageSection backgroundVariant="dark" paddingVariant="bottomNone">
        <Faq questions={coldStorageFaqs} />
      </PageSection>

      <PageSection backgroundVariant="dark">
        <SectionContent
          centerCTA
          centerTitle
          headingTag="h2"
          title="Ready to archive your data?"
          description="Cold Storage deals are set up directly with the FCSS team, where you can request a quote based on your dataset size and retention needs."
          cta={[
            <Button
              key="get-a-quote"
              href={FOC_URLS.coldStorageService.externalSite}
              variant="primary"
            >
              Get a quote at clients.fcss.fidl.tech
            </Button>,
            <Button
              key="talk-to-our-team"
              href={PATHS.CONTACT.path}
              variant="ghost"
              className="!border-zinc-50/40 !bg-transparent hover:!border-zinc-50 hover:!bg-zinc-50/5"
            >
              Talk to our team first
            </Button>,
          ]}
        />
      </PageSection>
    </>
  )
}

export const metadata = createMetadata({
  title: COLD_STORAGE_SERVICE_SEO.title,
  description: COLD_STORAGE_SERVICE_SEO.description,
  path: PATHS.COLD_STORAGE_SERVICE.path,
})
