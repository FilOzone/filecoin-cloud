'use client'

import { Button } from '@filecoin-foundation/ui-filecoin/Button'
import { SectionContent } from '@filecoin-foundation/ui-filecoin/SectionContent'
import Image from 'next/image'

import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
import synapseCodeSnippet from '@/public/assets/synapse-code-snippet.webp'

import { SYNAPSE_CODE_SNIPPET } from '../data/synapse-code-snippet'

export function IntegrateStorageSection() {
  const { copy, isCopied } = useCopyToClipboard()

  return (
    <SectionContent
      centerCTA
      centerTitle
      title="Integrate warm storage in your app"
      description="Get started with storage in just a few lines of code"
      cta={[
        <Button
          key="copy-code-snippet"
          onClick={() => copy(SYNAPSE_CODE_SNIPPET)}
          variant="primary"
          className="min-w-[200px]"
        >
          {isCopied ? 'Copied!' : 'Copy code snippet'}
        </Button>,
        <Button
          key="explore-documentation"
          href="https://github.com/FilOzone/filecoin-services/releases/tag/alpha%2Fcalibnet%2F0x80617b65FD2EEa1D7fDe2B4F85977670690ed348-v2"
          variant="ghost"
        >
          Explore documentation
        </Button>,
      ]}
    >
      <div className="max-w-4xl mx-auto">
        <Image src={synapseCodeSnippet} alt="Synapse code snippet" />
      </div>
    </SectionContent>
  )
}
