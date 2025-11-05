import { MarkdownPage } from '@filecoin-foundation/ui-filecoin/Markdown/MarkdownPage'
import { PageSection } from '@filecoin-foundation/ui-filecoin/PageSection'

import { MarkdownContent } from '@/components/MarkdownContent'

import privacyPolicyMarkdown from './privacy-policy.md'

const { body } = privacyPolicyMarkdown

export default function PrivacyPolicy() {
  return (
    <PageSection backgroundVariant="light">
      <MarkdownPage>
        <MarkdownContent>{body}</MarkdownContent>
      </MarkdownPage>
    </PageSection>
  )
}
