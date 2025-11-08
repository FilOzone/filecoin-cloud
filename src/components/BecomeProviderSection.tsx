import { PageSection } from '@filecoin-foundation/filecoin-ui/PageSection'
import { SectionContent } from '@filecoin-foundation/filecoin-ui/SectionContent'

import { Button } from '@/components/Button'

import { FOC_URLS } from '@/constants/siteMetadata'

export function BecomeProviderSection() {
  return (
    <PageSection backgroundVariant="dark">
      <SectionContent
        centerCTA
        centerTitle
        title="Become a PDP Storage Provider"
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
