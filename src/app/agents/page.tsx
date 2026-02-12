import { CardGrid } from '@filecoin-foundation/ui-filecoin/CardGrid'
import { PageSection } from '@filecoin-foundation/ui-filecoin/PageSection'
import { SectionContent } from '@filecoin-foundation/ui-filecoin/SectionContent'
import { SimpleCard } from '@filecoin-foundation/ui-filecoin/SimpleCard'

import { Navigation } from '@/components/Navigation/Navigation'
import { StructuredDataScript } from '@/components/StructuredDataScript'

import { PATHS } from '@/constants/paths'
import { createMetadata } from '@/utils/create-metadata'

import { SubmitProposalButton } from './components/SubmitProposalButton'
import { AGENTS_SEO } from './constants/seo'
import { generateStructuredData } from './utils/generate-structured-data'
import { getAllRFSData } from './utils/get-rfs-data'

export default async function Agents() {
  const rfsDataList = await getAllRFSData()

  return (
    <>
      <StructuredDataScript
        structuredData={generateStructuredData(AGENTS_SEO)}
      />

      <Navigation backgroundVariant="dark" />
      <PageSection backgroundVariant="dark" paddingVariant="topCompact">
        <SectionContent
          headingTag="h1"
          title="Agents: Requests for Startups"
          description="Build the infrastructure layer where AI agents store, transact, and coordinate - without human intermediaries."
          cta={<SubmitProposalButton />}
        />
      </PageSection>

      <PageSection backgroundVariant="gray">
        <SectionContent headingTag="h2" title="Submission Guidelines">
          <div className="prose prose-xl">
            <p>To be considered a strong submission, teams must deliver:</p>
            <ul>
              <li>
                Deployment against Filecoin Onchain Cloud contracts on test,
                extra points for mainnet
              </li>
              <li>A 2-minute demo recording showing the system in action</li>
              <li>A live, interactive example (not just docs or diagrams)</li>
              <li>
                Clear explanation of why Filecoin is essential (not incidental)
              </li>
              <li>
                Working code demonstrating real storage, payments, and usage
              </li>
            </ul>
            <p>
              Submissions that only include architecture diagrams,
              documentation, mockups, or testnet-only deployments will not be
              considered sufficient.
            </p>
          </div>
        </SectionContent>
      </PageSection>

      <PageSection backgroundVariant="light">
        <SectionContent headingTag="h2" title="Open Requests">
          <CardGrid as="ul" variant="smTwoXlThreeWide">
            {rfsDataList.map(({ title, description, id, slug }) => (
              <SimpleCard
                key={title}
                as="li"
                title={title}
                headingTag="h3"
                description={description}
                cta={{
                  href: `${PATHS.AGENTS.path}/${slug}`,
                  text: 'View details',
                }}
                badge={{
                  text: `RFS-${id}`,
                  variant: 'primary',
                }}
              />
            ))}
          </CardGrid>
        </SectionContent>
      </PageSection>
    </>
  )
}

export const metadata = createMetadata({
  title: AGENTS_SEO.title,
  description: AGENTS_SEO.description,
  path: PATHS.AGENTS.path,
})
