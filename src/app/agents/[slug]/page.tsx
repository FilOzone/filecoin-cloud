import { MarkdownContent } from '@filecoin-foundation/ui-filecoin/Markdown/MarkdownContent'
import { PageSection } from '@filecoin-foundation/ui-filecoin/PageSection'
import { notFound } from 'next/navigation'

import { Navigation } from '@/components/Navigation/Navigation'

import { FOC_URLS } from '@/constants/site-metadata'
import { getMarkdownSlugs } from '@/utils/markdown'

import { SubmitProposalButton } from '../components/SubmitProposalButton'
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
        <article>
          <MarkdownContent>{rfsData.content}</MarkdownContent>

          <div className="prose sm:prose-lg md:prose-xl my-12 md:my-14">
            <h2>Key Links</h2>
            <ul>
              <li>
                <a href={FOC_URLS.warmStorageService.contactSourceCode}>
                  FOC Storage MCP
                </a>
              </li>
              <li>
                <a href={FOC_URLS.warmStorageService.synapseSdk}>Synapse SDK</a>
              </li>
            </ul>

            <h2>A Note on FOC&apos;s Storage Model</h2>
            <p>
              FOC uses PDP-based (Proof of Data Possession) warm storage with
              continuous onchain payment rails. You upload pieces to datasets,
              they get proven every period, and you pay an ongoing rate. This is
              not the traditional Filecoin storage deal model based on PoRep
              (Proof of Replication). Think of PDP as: upload data, it stays
              warm and provably available, you pay continuously.
            </p>

            <h2>SDK Maturity &amp; Builder Expectations</h2>
            <p>
              The FOC SDK is under active development. There are known issues
              pending upgrade. Mainnet-ready milestone (M4.1) is targeted for
              approximately March 14, 2025. Builders should:
            </p>
            <ul>
              <li>
                Target the latest SDK version once available; earlier versions
                may have breaking changes
              </li>
              <li>Expect API instability - interfaces may shift before M4.1</li>
              <li>
                Reach out to the FOC team when things break; active support is
                available during the build period
              </li>
            </ul>

            <p>We&apos;ll update this page as the SDK stabilizes.</p>
          </div>
        </article>

        <SubmitProposalButton />
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
