import { MarkdownPage } from '@filecoin-foundation/ui-filecoin/Markdown/MarkdownPage'
import { PageSection } from '@filecoin-foundation/ui-filecoin/PageSection'

import { MarkdownContent } from '@/components/MarkdownContent'

import termsOfUseMarkdown from './terms-of-use.md'

const { body } = termsOfUseMarkdown

export default function TermsOfUse() {
  return (
    <PageSection backgroundVariant="light">
      <MarkdownPage>
        <MarkdownContent>{body}</MarkdownContent>
      </MarkdownPage>
    </PageSection>
  )
}
