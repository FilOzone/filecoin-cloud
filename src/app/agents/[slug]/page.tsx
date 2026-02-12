import { MarkdownContent } from '@filecoin-foundation/ui-filecoin/Markdown/MarkdownContent'
import { MarkdownPage } from '@filecoin-foundation/ui-filecoin/Markdown/MarkdownPage'
import { PageSection } from '@filecoin-foundation/ui-filecoin/PageSection'
import { notFound } from 'next/navigation'

import { Navigation } from '@/components/Navigation/Navigation'

import { getMarkdownSlugs } from '@/utils/markdown'

import { getRFSData, OPEN_REQUESTS_DIR } from '../utils/get-rfs-data'

type RFSPageProps = {
  params: Promise<{ slug: string }>
}

export default async function RFSPage({ params }: RFSPageProps) {
  const { slug } = await params
  const rfsData = getRFSData(slug)

  if (!rfsData) {
    notFound()
  }

  return (
    <>
      <Navigation backgroundVariant="light" />
      <PageSection backgroundVariant="light" paddingVariant="topCompact">
        <MarkdownPage>
          <MarkdownContent>{rfsData.content}</MarkdownContent>
        </MarkdownPage>
      </PageSection>
    </>
  )
}

export async function generateStaticParams() {
  const slugs = getMarkdownSlugs(OPEN_REQUESTS_DIR)
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: RFSPageProps) {
  const { slug } = await params
  const rfsData = getRFSData(slug)

  if (!rfsData) {
    return {
      title: 'Not Found',
    }
  }

  return {
    title: rfsData.data.title,
    description: rfsData.data.description,
  }
}
