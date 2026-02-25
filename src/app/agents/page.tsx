import { CardGrid } from '@filecoin-foundation/ui-filecoin/CardGrid'
import { PageHeader } from '@filecoin-foundation/ui-filecoin/PageHeader'
import { PageSection } from '@filecoin-foundation/ui-filecoin/PageSection'
import { SectionContent } from '@filecoin-foundation/ui-filecoin/SectionContent'
import { SimpleCard } from '@filecoin-foundation/ui-filecoin/SimpleCard'
import { ExternalTextLink } from '@filecoin-foundation/ui-filecoin/TextLink/ExternalTextLink'

import { Navigation } from '@/components/Navigation/Navigation'
import { StructuredDataScript } from '@/components/StructuredDataScript'

import { PATHS } from '@/constants/paths'
import { FOC_URLS } from '@/constants/site-metadata'
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
      <PageSection backgroundVariant="dark">
        <PageHeader
          centered
          title="Agents: Requests for Startups"
          description="Build the infrastructure layer where AI agents store, transact, and coordinate - without human intermediaries."
          cta={<SubmitProposalButton />}
        />
      </PageSection>

      <PageSection backgroundVariant="dark">
        <SectionContent
          headingTag="h2"
          title="Building the default cloud for AI agents"
        >
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <p className="text-xl">
              The next generation of cloud users will not be humans.
            </p>
            <div className="space-y-6">
              <p>
                They will be autonomous AI agents — long-lived, identity-aware,
                and capable of paying for their own storage, compute, and
                communication.
              </p>
              <p>
                We are seeking teams to deploy AI-native products on FOC
                mainnet: agent-owned storage, programmable payments, and new
                economic structures for autonomous agents.
              </p>
              <p>
                If you are building AI agents that need memory, identity-linked
                storage (e.g. ERC-8004), or autonomous onchain payments, then
                Filecoin Onchain Cloud is for you.
              </p>
              <p>Ship running prototypes, not architecture diagrams.</p>
            </div>
          </div>
        </SectionContent>
      </PageSection>

      <PageSection backgroundVariant="dark">
        <SectionContent headingTag="h2" title="Submission guidelines">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <p className="text-xl">Build something real. Show it running.</p>
            <div className="space-y-6">
              <p>
                If you&apos;re exploring agent-native storage, review{' '}
                <ExternalTextLink href={FOC_URLS.agents.erc8004Tutorial}>
                  Build an ERC-8004 agent using Filecoin Onchain Cloud
                </ExternalTextLink>{' '}
                and how{' '}
                <ExternalTextLink href={FOC_URLS.agents.agent0Docs}>
                  Agent0
                </ExternalTextLink>{' '}
                from the ERC-8004 team uses Filecoin Pin.
              </p>
              <p>To be considered a strong submission, teams must deliver:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  Deployment against Filecoin Onchain Cloud contracts on test,
                  extra points for mainnet
                </li>
                <li>A 2-minute demo recording showing the system in action</li>
                <li>A live, interactive example (not just docs or diagrams)</li>
                <li>
                  Clear explanation of why Filecoin is essential (not
                  incidental)
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
          </div>
        </SectionContent>
      </PageSection>

      <PageSection backgroundVariant="light">
        <SectionContent
          headingTag="h2"
          title="Open requests"
          description="For technically curious people who want to go deeper into how Filecoin actually works."
        >
          {rfsDataList.length > 0 ? (
            <CardGrid as="ul" variant="smTwoXlThreeWide">
              {rfsDataList.map(({ data, slug }) => {
                const { id, title, description } = data

                return (
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
                      textTransform: 'none',
                      variant: 'primary',
                    }}
                  />
                )
              })}
            </CardGrid>
          ) : (
            <p>There are currently no open requests.</p>
          )}
        </SectionContent>
      </PageSection>

      <PageSection backgroundVariant="dark">
        <PageHeader
          centered
          variant="highContrast"
          title="Build for autonomous agents"
          description="Deploy on Filecoin Onchain Cloud. Ship a working system that stores, pays, and verifies onchain."
          cta={<SubmitProposalButton />}
        />
      </PageSection>
    </>
  )
}

export const metadata = createMetadata({
  title: AGENTS_SEO.title,
  description: AGENTS_SEO.description,
  path: PATHS.AGENTS.path,
})
