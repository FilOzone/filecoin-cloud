import { MarkdownPage } from '@filecoin-foundation/filecoin-ui/Markdown/MarkdownPage'
import { PageSection } from '@filecoin-foundation/filecoin-ui/PageSection'

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
