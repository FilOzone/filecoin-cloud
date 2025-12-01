import { MarkdownContent } from '@filecoin-foundation/ui-filecoin/Markdown/MarkdownContent'
import { MarkdownPage } from '@filecoin-foundation/ui-filecoin/Markdown/MarkdownPage'
import { PageSection } from '@filecoin-foundation/ui-filecoin/PageSection'

import { Navigation } from '@/components/Navigation/Navigation'

import { PATHS } from '@/constants/paths'
import { createMetadata } from '@/utils/create-metadata'

import { PRIVACY_POLICY_SEO } from './constants/seo'
import privacyPolicyMarkdown from './privacy-policy.md'

const { body } = privacyPolicyMarkdown

export default function PrivacyPolicy() {
  return (
    <>
      <Navigation backgroundVariant="light" />
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
