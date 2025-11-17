import { MarkdownPage } from '@filecoin-foundation/ui-filecoin/Markdown/MarkdownPage'
import { PageSection } from '@filecoin-foundation/ui-filecoin/PageSection'

import { Header } from '@/components/Header'
import { MarkdownContent } from '@/components/MarkdownContent'
import { Navigation } from '@/components/Navigation/Navigation'

import termsOfUseMarkdown from './terms-of-use.md'

const { body } = termsOfUseMarkdown

export default function TermsOfUse() {
  return (
    <>
      <Header />
      <Navigation backgroundVariant="light" />

      <PageSection backgroundVariant="light">
        <MarkdownPage>
          <MarkdownContent>{body}</MarkdownContent>
        </MarkdownPage>
      </PageSection>
    </>
  )
}
