import { PageSection } from '@filecoin-foundation/ui-filecoin/PageSection'
import { SectionContent } from '@filecoin-foundation/ui-filecoin/SectionContent'

import { Button } from '@/components/Button'

import { FOC_URLS } from '@/constants/site-metadata'

export function BecomeProviderSection() {
  return (
    <PageSection backgroundVariant="dark">
      <SectionContent
        centerCTA
        centerTitle
        title="Become a Service Provider"
        description="Learn how to set up and run a storage provider node and join the network to offer verifiable warm storage service."
        cta={
          <Button
            href={FOC_URLS.warmStorageService.spDocumentation}
            variant="primary"
          >
            View SP documentation
          </Button>
        }
      />
    </PageSection>
  )
}
