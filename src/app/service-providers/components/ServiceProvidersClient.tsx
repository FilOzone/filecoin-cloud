'use client'

import { LoadingStateCard } from '@filecoin-foundation/ui-filecoin/LoadingStateCard'
import { NetworkSelector } from '@filecoin-foundation/ui-filecoin/Network/NetworkSelector'
import { PageSection } from '@filecoin-foundation/ui-filecoin/PageSection'
import { RefreshOverlay } from '@filecoin-foundation/ui-filecoin/RefreshOverlay'
import { SectionContent } from '@filecoin-foundation/ui-filecoin/SectionContent'

import { BecomeProviderSection } from '@/components/BecomeProviderSection'
import { Navigation } from '@/components/Navigation/Navigation'
import { ProvidersLoadingError } from '@/components/ProvidersLoadingError'
import { RefreshButton } from '@/components/RefreshButton'

import { useProviders } from '@/app/warm-storage-service/hooks/use-providers'

import { ServiceProvidersTable } from './ServiceProvidersTable'

export function ServiceProvidersClient() {
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
          description="Explore registered service providers offering verifiable storage and data services on Filecoin Onchain Cloud."
        >
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-end flex-wrap gap-6">
              <div className="sm:w-56 w-full">
                <NetworkSelector />
              </div>

              <RefreshButton
                onClick={() => refetch()}
                disabled={!canRefreshTable}
              />
            </div>

            {isLoading && <LoadingStateCard message="Loading providers..." />}

            {error && (
              <ProvidersLoadingError message={error.message} retry={refetch} />
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
