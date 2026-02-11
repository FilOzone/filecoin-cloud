import { MarkdownContent } from '@filecoin-foundation/ui-filecoin/Markdown/MarkdownContent'
import { MarkdownPage } from '@filecoin-foundation/ui-filecoin/Markdown/MarkdownPage'
import { PageSection } from '@filecoin-foundation/ui-filecoin/PageSection'

import { Navigation } from '@/components/Navigation/Navigation'

import rfsMarkdown from '../data/open-requests/rfs-6.md'

const { body } = rfsMarkdown

export default function RFS6() {
  return (
    <>
      <Navigation backgroundVariant="light" />
      <PageSection backgroundVariant="light" paddingVariant="topCompact">
        <MarkdownPage>
          <MarkdownContent>{body}</MarkdownContent>
        </MarkdownPage>
      </PageSection>
    </>
  )
}
