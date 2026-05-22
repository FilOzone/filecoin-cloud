import { CardGrid } from '@filecoin-foundation/ui-filecoin/CardGrid'
import { Container } from '@filecoin-foundation/ui-filecoin/Container'
import { LinkCard } from '@filecoin-foundation/ui-filecoin/LinkCard'
import { PageHeader } from '@filecoin-foundation/ui-filecoin/PageHeader'
import { PageSection } from '@filecoin-foundation/ui-filecoin/PageSection'
import { SectionContent } from '@filecoin-foundation/ui-filecoin/SectionContent'
import {
  ChatCircleIcon,
  GithubLogoIcon,
  LightbulbIcon,
  PulseIcon,
  TelegramLogoIcon,
} from '@phosphor-icons/react/dist/ssr'

import { Navigation } from '@/components/Navigation/Navigation'
import { StructuredDataScript } from '@/components/StructuredDataScript'

import { PATHS } from '@/constants/paths'
import { FOC_URLS } from '@/constants/site-metadata'
import { createMetadata } from '@/utils/create-metadata'

import { SUPPORT_SEO } from './constants/seo'
import { generateStructuredData } from './utils/generate-structured-data'

const supportOptions = [
  {
    title: 'Quick troubleshooting',
    description:
      'Use #fil-foc on Filecoin Slack when you are stuck and need fast back-and-forth with the team or other builders.',
    href: FOC_URLS.social.slack,
    icon: ChatCircleIcon,
  },
  {
    title: 'Join the builder community',
    description:
      'Use the FOC Builders Telegram group for community discussion, ideas, and updates with other builders.',
    href: FOC_URLS.social.telegram,
    icon: TelegramLogoIcon,
  },
  {
    title: 'Report a FOC problem',
    description:
      'Use the public GitHub intake form for reproducible bugs or persistent issues so context stays searchable and triageable.',
    href: FOC_URLS.filecoinCloud.problemReports,
    icon: GithubLogoIcon,
  },
  {
    title: 'Check service status',
    description:
      'Use the status page for outages, active incidents, and high-level service availability updates.',
    href: FOC_URLS.status,
    icon: PulseIcon,
  },
  {
    title: 'Share your use case',
    description:
      'Use the contact form for product feedback, partnerships, and ideas about what you want to build with Filecoin Onchain Cloud.',
    href: PATHS.CONTACT.path,
    icon: LightbulbIcon,
  },
] as const

export default function Support() {
  return (
    <>
      <StructuredDataScript
        structuredData={generateStructuredData(SUPPORT_SEO)}
      />

      <Navigation backgroundVariant="light" />
      <PageSection backgroundVariant="light">
        <PageHeader
          centered
          title="Support"
          description="Find the right channel for Filecoin Onchain Cloud help, community discussion, problem reports, service status, and product feedback."
        />
      </PageSection>

      <PageSection backgroundVariant="light" paddingVariant="topNone">
        <Container>
          <SectionContent
            headingTag="h2"
            title="Choose the best path"
            description="Different requests need different channels. Start here so the team can respond in the place that fits the work."
          >
            <CardGrid as="ul" variant="mdTwo">
              {supportOptions.map(({ title, description, href, icon }) => (
                <LinkCard
                  key={title}
                  as="li"
                  title={title}
                  headingTag="h3"
                  description={description}
                  href={href}
                  icon={{ component: icon, variant: 'filled' }}
                />
              ))}
            </CardGrid>
          </SectionContent>
        </Container>
      </PageSection>
    </>
  )
}

export const metadata = createMetadata({
  title: SUPPORT_SEO.title,
  description: SUPPORT_SEO.description,
  path: PATHS.SUPPORT.path,
})
