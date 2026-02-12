import { MarkdownContent } from '@filecoin-foundation/ui-filecoin/Markdown/MarkdownContent'
import { MarkdownPage } from '@filecoin-foundation/ui-filecoin/Markdown/MarkdownPage'
import { PageSection } from '@filecoin-foundation/ui-filecoin/PageSection'

import { Navigation } from '@/components/Navigation/Navigation'
import { StructuredDataScript } from '@/components/StructuredDataScript'

import { PATHS } from '@/constants/paths'
import { createMetadata } from '@/utils/create-metadata'

import { PRIVACY_POLICY_SEO } from './constants/seo'
import privacyPolicyMarkdown from './privacy-policy.md'
import { generateStructuredData } from './utils/generateStructuredData'

const { body } = privacyPolicyMarkdown

export default function PrivacyPolicy() {
  return (
    <>
      <StructuredDataScript
        structuredData={generateStructuredData(PRIVACY_POLICY_SEO)}
      />

      <Navigation backgroundVariant="light" />
      <PageSection backgroundVariant="light" paddingVariant="topCompact">
        <MarkdownPage>
          <MarkdownContent>{body}</MarkdownContent>
        </MarkdownPage>
      </PageSection>
    </>
  )
}

export const metadata = createMetadata({
  title: PRIVACY_POLICY_SEO.title,
  description: PRIVACY_POLICY_SEO.description,
  path: PATHS.PRIVACY_POLICY.path,
})
