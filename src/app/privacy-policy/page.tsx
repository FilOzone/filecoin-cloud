import { MarkdownPage } from '@filecoin-foundation/ui-filecoin/Markdown/MarkdownPage'
import { PageSection } from '@filecoin-foundation/ui-filecoin/PageSection'

import { Header } from '@/components/Header'
import { MarkdownContent } from '@/components/MarkdownContent'
import { Navigation } from '@/components/Navigation/Navigation'

import privacyPolicyMarkdown from './privacy-policy.md'

const { body } = privacyPolicyMarkdown

export default function PrivacyPolicy() {
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
