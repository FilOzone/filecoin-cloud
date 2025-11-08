import { MarkdownPage } from '@filecoin-foundation/filecoin-ui/Markdown/MarkdownPage'
import { PageSection } from '@filecoin-foundation/filecoin-ui/PageSection'

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
