'use client'

import { LoadingStateCard } from '@filecoin-foundation/ui-filecoin/LoadingStateCard'
import { PageSection } from '@filecoin-foundation/ui-filecoin/PageSection'
import { SectionContent } from '@filecoin-foundation/ui-filecoin/SectionContent'

import { BecomeProviderSection } from '@/components/BecomeProviderSection'
import { Navigation } from '@/components/Navigation/Navigation'
import { RefreshButton } from '@/components/RefreshButton'
import { RefreshOverlay } from '@filecoin-foundation/ui-filecoin/RefreshOverlay'

import { useProviders } from '@/app/hidden/warm-storage-service/hooks/use-providers'

import { ServiceProvidersTable } from './components/ServiceProvidersTable'

export default function ServiceProviders() {
  const {
    data: providers,
    isLoading,
    isRefetching,
    error,
    refetch,
  } = useProviders()

  const canRefreshTable = providers && !isRefetching

  return (
    <>
      <Navigation backgroundVariant="light" />
      <PageSection backgroundVariant="light">
        <SectionContent
          title="Service Providers"
          description="Explore registered service providers offering verifiable storage and data services on the Filecoin network."
        >
          <div className="flex flex-col gap-6">
            <div className="flex">
              <RefreshButton onClick={() => refetch()} disabled={!canRefreshTable} />
            </div>

            {isLoading && <LoadingStateCard message="Loading providers..." />}

            {error && (
              <div className="text-center py-8 text-red-600">
                Error loading providers: {error.message || 'Unknown error'}
              </div>
            )}

            {providers && providers.length > 0 && (
              <RefreshOverlay isRefetching={isRefetching}>
                <ServiceProvidersTable data={providers} />
              </RefreshOverlay>
            )}

            {providers && providers.length === 0 && !isLoading && (
              <div className="text-center py-8 text-gray-600">
                No providers available
              </div>
            )}
          </div>
        </SectionContent>
      </PageSection>

      <BecomeProviderSection />
    </>
  )
}
