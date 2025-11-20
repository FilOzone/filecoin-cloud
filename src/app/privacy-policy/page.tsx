import { MarkdownPage } from '@filecoin-foundation/ui-filecoin/Markdown/MarkdownPage'
import { PageSection } from '@filecoin-foundation/ui-filecoin/PageSection'

import { Header } from '@/components/Header'
import { MarkdownContent } from '@/components/MarkdownContent'
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
      <Header />
      <Navigation backgroundVariant="light" />

      {/* <Navigation backgroundVariant="light" /> */}
      <StructuredDataScript
        structuredData={generateStructuredData(PRIVACY_POLICY_SEO)}
      />
      <PageSection backgroundVariant="light">
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
  path: PATHS.PRIVACY_POLICY.path as `/${string}`,
})
