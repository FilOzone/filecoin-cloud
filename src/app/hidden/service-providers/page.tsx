import { PageSection } from '@filecoin-foundation/ui-filecoin/PageSection'
import { SectionContent } from '@filecoin-foundation/ui-filecoin/SectionContent'

import { BecomeProviderSection } from '@/components/BecomeProviderSection'

export default function ServiceProviders() {
  return (
    <>
      <PageSection backgroundVariant="light">
        <SectionContent
          title="Service Providers"
          description="Explore registered service providers offering verifiable storage and data services on the Filecoin network."
        />
      </PageSection>

      <BecomeProviderSection />
    </>
  )
}
