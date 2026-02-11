import { MarkdownContent } from '@filecoin-foundation/ui-filecoin/Markdown/MarkdownContent'
import { MarkdownPage } from '@filecoin-foundation/ui-filecoin/Markdown/MarkdownPage'
import { PageSection } from '@filecoin-foundation/ui-filecoin/PageSection'

import { Navigation } from '@/components/Navigation/Navigation'

import rfsMarkdown from '../data/open-requests/rfs-2.md'

const { body } = rfsMarkdown

export default function RFS2() {
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
