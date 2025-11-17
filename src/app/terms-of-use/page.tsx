import { MarkdownPage } from '@filecoin-foundation/ui-filecoin/Markdown/MarkdownPage'
import { PageSection } from '@filecoin-foundation/ui-filecoin/PageSection'

import { Header } from '@/components/Header'
import { MarkdownContent } from '@/components/MarkdownContent'
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
      <Header />
      <Navigation backgroundVariant="light" />

      {/* <Navigation backgroundVariant="light" /> */}
      <StructuredDataScript
        structuredData={generateStructuredData(TERMS_OF_USE_SEO)}
      />
      <PageSection backgroundVariant="light">
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
  path: PATHS.TERMS_OF_USE.path as `/${string}`,
})
