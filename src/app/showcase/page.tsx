import { Button } from '@filecoin-foundation/ui-filecoin/Button'
import { CardGrid } from '@filecoin-foundation/ui-filecoin/CardGrid'
import { PageHeader } from '@filecoin-foundation/ui-filecoin/PageHeader'
import { PageSection } from '@filecoin-foundation/ui-filecoin/PageSection'
import { SectionContent } from '@filecoin-foundation/ui-filecoin/SectionContent'

import { Navigation } from '@/components/Navigation/Navigation'
import { ShowcaseCard, type ShowcaseCardData } from '@/components/ShowcaseCard'
import { StructuredDataScript } from '@/components/StructuredDataScript'

import { PATHS } from '@/constants/paths'
import { BASE_URL, FOC_URLS } from '@/constants/site-metadata'
import { createMetadata } from '@/utils/create-metadata'

import { SHOWCASE_SEO } from './constants/seo'
import { agentResources } from './data/agent-resources'
import { buildingBlocks } from './data/building-blocks'
import { communityDemos } from './data/community-demos'
import { generateStructuredData } from './utils/generate-structured-data'

const ghostOnDark =
  '!border-zinc-50/40 !bg-transparent hover:!border-zinc-50 hover:!bg-zinc-50/5'

const allShowcaseItems: Array<ShowcaseCardData> = [
  ...agentResources,
  ...buildingBlocks,
  ...communityDemos,
]

const showcaseItems = allShowcaseItems.map(
  ({ title, description, primary, source }) => ({
    title,
    description,
    url: (primary ?? source)?.href ?? `${BASE_URL}${PATHS.SHOWCASE.path}`,
  }),
)

export default function Showcase() {
  return (
    <>
      <StructuredDataScript
        structuredData={generateStructuredData(SHOWCASE_SEO, showcaseItems)}
      />

      <Navigation backgroundVariant="dark" />

      <PageSection backgroundVariant="dark">
        <PageHeader
          centered
          variant="highContrast"
          title="Built with Filecoin Onchain Cloud"
          description="Explore the tools, SDKs, and apps the community is building on FOC. Fork a reference app, drop storage into your agent, or get inspired by what's already shipping."
          cta={[
            <Button
              key="start-building"
              href={FOC_URLS.documentation.gettingStarted}
              variant="primary"
            >
              Start building
            </Button>,
            <Button
              key="submit-project"
              href={PATHS.CONTACT.path}
              variant="ghost"
              className={ghostOnDark}
            >
              Submit your project
            </Button>,
          ]}
        />
      </PageSection>

      <PageSection backgroundVariant="gray">
        <SectionContent
          headingTag="h2"
          title="Plug your agents into Filecoin"
          description="Give AI agents Filecoin storage in minutes. A drop-in CLI, an MCP server, and an installable skill, all speaking the Synapse SDK."
        >
          <CardGrid as="ul" variant="smTwoLgThreeWider">
            {agentResources.map((resource) => (
              <ShowcaseCard key={resource.title} {...resource} />
            ))}
          </CardGrid>
        </SectionContent>
      </PageSection>

      <PageSection backgroundVariant="light">
        <SectionContent
          headingTag="h2"
          title="SDKs & reference apps"
          description="Official building blocks and starter apps to fork, from the core SDK to a full-stack upload dApp."
        >
          <CardGrid as="ul" variant="smTwoLgThreeWider">
            {buildingBlocks.map((block) => (
              <ShowcaseCard key={block.title} {...block} />
            ))}
          </CardGrid>
        </SectionContent>
      </PageSection>

      <PageSection backgroundVariant="gray">
        <SectionContent
          headingTag="h2"
          title="Built by the community"
          description="Real applications shipping on Filecoin Onchain Cloud. Explore what's possible, then build your own."
        >
          <CardGrid as="ul" variant="smTwoLgThreeWider">
            {communityDemos.map((demo) => (
              <ShowcaseCard key={demo.title} {...demo} />
            ))}
          </CardGrid>
        </SectionContent>
      </PageSection>

      <PageSection backgroundVariant="dark">
        <PageHeader
          centered
          variant="highContrast"
          title="Building on Filecoin Onchain Cloud?"
          description="Ship a working app on FOC and we'll feature it here. Tell us what you're building."
          cta={[
            <Button
              key="submit-project"
              href={PATHS.CONTACT.path}
              variant="primary"
            >
              Submit your project
            </Button>,
            <Button
              key="read-docs"
              href={FOC_URLS.documentation.home}
              variant="ghost"
              className={ghostOnDark}
            >
              Browse the docs
            </Button>,
          ]}
        />
      </PageSection>
    </>
  )
}

export const metadata = createMetadata({
  title: SHOWCASE_SEO.title,
  description: SHOWCASE_SEO.description,
  path: PATHS.SHOWCASE.path,
})
