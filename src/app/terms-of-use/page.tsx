import { MarkdownContent } from '@filecoin-foundation/ui-filecoin/Markdown/MarkdownContent'
import { MarkdownPage } from '@filecoin-foundation/ui-filecoin/Markdown/MarkdownPage'
import { PageSection } from '@filecoin-foundation/ui-filecoin/PageSection'

import { Navigation } from '@/components/Navigation/Navigation'
import { StructuredDataScript } from '@/components/StructuredDataScript'

import { PATHS } from '@/constants/paths'
import { createMetadata } from '@/utils/create-metadata'

import { TERMS_OF_USE_SEO } from './constants/seo'
import termsOfUseMarkdown from './terms-of-use.md'
import { generateStructuredData } from './utils/generateStructuredData'

const { body } = termsOfUseMarkdown

export default function TermsOfUse() {
  return (
    <>
      <StructuredDataScript
        structuredData={generateStructuredData(TERMS_OF_USE_SEO)}
      />

      <Navigation backgroundVariant="light" />
      <PageSection backgroundVariant="light" paddingVariant="topCompact">
        <MarkdownPage>
          <MarkdownContent>{body}</MarkdownContent>
        </MarkdownPage>
      </PageSection>
    </>
  )
}

export const metadata = createMetadata({
  title: TERMS_OF_USE_SEO.title,
  description: TERMS_OF_USE_SEO.description,
  path: PATHS.TERMS_OF_USE.path,
})
