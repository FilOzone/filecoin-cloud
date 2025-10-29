import { PageHeader } from '@filecoin-foundation/ui-filecoin/PageHeader'
import { PageSection } from '@filecoin-foundation/ui-filecoin/PageSection'

import { Button } from '@/components/Button'
import { Faq } from '@/components/Faq'

import { faqs } from './data/faqs'

export default function HiddenHomepage() {
  return (
    <>
      <PageSection backgroundVariant="dark" paddingVariant="none">
        {/* TODO: Check button key issue  */}
        <PageHeader
          centered
          title="Cloud services with onchain guarantees — ownership, verifiability, and programmability"
          description="Build applications that own their data, payments, and logic."
          cta={[
            <Button key="start-building" href="#" variant="primary">
              Start building
            </Button>,
          ]}
        />
      </PageSection>

      <Faq questions={faqs} />
    </>
  )
}
