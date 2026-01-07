'use client'

import { LoadingStateCard } from '@filecoin-foundation/ui-filecoin/LoadingStateCard'
import { PageSection } from '@filecoin-foundation/ui-filecoin/PageSection'
import { SectionContent } from '@filecoin-foundation/ui-filecoin/SectionContent'

import { BecomeProviderSection } from '@/components/BecomeProviderSection'
import { Navigation } from '@/components/Navigation/Navigation'
import { ProvidersEmptyLoadingState } from '@/components/ProvidersEmptyLoadingState'
import { ProvidersLoadingError } from '@/components/ProvidersLoadingError'

import { useProviders } from '@/app/warm-storage-service/hooks/use-providers'

import { ServiceProvidersTable } from './ServiceProvidersTable'

export function ServiceProvidersClient() {
  const { data: providers, isLoading, error, refetch } = useProviders()

  return (
    <>
      <Navigation backgroundVariant="light" />
      <PageSection backgroundVariant="light">
        <SectionContent
          headingTag="h1"
          title="Service Providers"
          description="Explore registered service providers offering verifiable storage and data services on Filecoin Onchain Cloud."
        >
          <div className="flex flex-col gap-6">
            {isLoading && <LoadingStateCard message="Loading providers..." />}

            {error && (
              <ProvidersLoadingError message={error.message} retry={refetch} />
            )}

            {providers && providers.length > 0 && (
              <ServiceProvidersTable data={providers} />
            )}

            {providers && providers.length === 0 && !isLoading && (
              <ProvidersEmptyLoadingState />
            )}
          </div>
        </SectionContent>
      </PageSection>

      <BecomeProviderSection />
    </>
  )
}
