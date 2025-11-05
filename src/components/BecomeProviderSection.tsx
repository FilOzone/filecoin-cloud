import { PageSection } from '@filecoin-foundation/ui-filecoin/PageSection'
import { SectionContent } from '@filecoin-foundation/ui-filecoin/SectionContent'

import { Button } from '@/components/Button'

import { FOC_URLS } from '@/constants/siteMetadata'

export function BecomeProviderSection() {
  return (
    <PageSection backgroundVariant="dark">
      <SectionContent
        centerCTA
        centerTitle
        title="Become a PDP Storage Provider"
        description="Join the network to offer verifiable warm storage service."
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
