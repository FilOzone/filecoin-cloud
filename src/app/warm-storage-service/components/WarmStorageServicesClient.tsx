'use client'

import { Button } from '@filecoin-foundation/ui-filecoin/Button'
import { Card } from '@filecoin-foundation/ui-filecoin/Card'
import { CardGrid } from '@filecoin-foundation/ui-filecoin/CardGrid'
import { InfoCard } from '@filecoin-foundation/ui-filecoin/InfoCard'
import { LoadingStateCard } from '@filecoin-foundation/ui-filecoin/LoadingStateCard'
import { PageHeader } from '@filecoin-foundation/ui-filecoin/PageHeader'
import { PageSection } from '@filecoin-foundation/ui-filecoin/PageSection'
import { SectionContent } from '@filecoin-foundation/ui-filecoin/SectionContent'
import { ExternalTextLink } from '@filecoin-foundation/ui-filecoin/TextLink/ExternalTextLink'
import { GithubLogoIcon } from '@phosphor-icons/react/dist/ssr'

import { BecomeProviderSection } from '@/components/BecomeProviderSection'
import { InfoCardGrid } from '@/components/InfoCardGrid'
import { Navigation } from '@/components/Navigation/Navigation'
import { NetworkSelector } from '@/components/NetworkSelector'
import { ProvidersEmptyLoadingState } from '@/components/ProvidersEmptyLoadingState'
import { ProvidersLoadingError } from '@/components/ProvidersLoadingError'

import { PATHS } from '@/constants/paths'
import { FIL_BEAM_URL, FOC_URLS } from '@/constants/site-metadata'
import { truncateAddress } from '@/utils/truncate-address'

import { IntegrateStorageSection } from './IntegrateStorageSection'
import { PricingCard } from './PricingCard'
import { WarmStorageProvidersTable } from './WarmStorageProvidersTable'
import { storageFeatures } from '../data/storage-features'
import { useContractsData } from '../hooks/use-contracts-data'
import { useProviders } from '../hooks/use-providers'

export function WarmStorageServicesClient() {
  const { contractsData } = useContractsData()
  const {
    data: providers,
    isLoading,
    error,
    refetch,
  } = useProviders({ filter: 'approved' })

  return (
    <>
      <Navigation backgroundVariant="transparentDark" />
      <PageSection backgroundVariant="dark">
        <PageHeader
          centered
          title="Warm Storage Service"
          variant="highContrast"
          description={
            <p>
              New era of Filecoin storage: fast, verifiable storage powered by{' '}
              <ExternalTextLink
                href={FOC_URLS.documentation.proofOfDataPossession}
              >
                Proof of Data Possession
              </ExternalTextLink>
              , with an optional add-on for rapid data delivery through{' '}
              <ExternalTextLink href={FIL_BEAM_URL}>
                Filecoin Beam
              </ExternalTextLink>
              .
            </p>
          }
          cta={[
            <Button
              key="get-started-with-our-sdk"
              href={FOC_URLS.warmStorageService.synapseSdk}
              variant="primary"
            >
              Get started with Synapse SDK
            </Button>,
            <Button
              key="view-contract-source-code"
              href={FOC_URLS.warmStorageService.sourceCode}
              variant="ghost"
            >
              View contract source code
            </Button>,
          ]}
        />

        <div className="py-15 md:py-25" />

        <CardGrid as="ul" variant="mdThreeWider">
          {storageFeatures.map(({ title, description, icon }) => (
            <Card
              isCentered
              key={title}
              as="li"
              title={title}
              description={description}
              icon={icon}
            />
          ))}
        </CardGrid>

        <div className="pb-15 md:pb-25" />
        <IntegrateStorageSection />
      </PageSection>

      <PageSection backgroundVariant="light" paddingVariant="bottomNone">
        <SectionContent
          centerCTA
          centerTitle
          title="Pricing"
          cta={
            <Button
              href={FOC_URLS.warmStorageService.synapseSdk}
              variant="primary"
            >
              Get started with Synapse SDK
            </Button>
          }
        >
          <div className="lg:max-w-4xl lg:mx-auto">
            <PricingCard />
          </div>
        </SectionContent>
      </PageSection>

      <PageSection backgroundVariant="light">
        <SectionContent
          centerCTA
          centerTitle
          title="Warm Storage Details"
          description="View contract addresses and browse approved storage providers."
          cta={
            <Button href={PATHS.SERVICE_PROVIDERS.path} variant="ghost">
              View all service providers
            </Button>
          }
        >
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <h3 className="text-2xl font-medium">Contract Addresses</h3>
              <div className="sm:w-56 w-full">
                <NetworkSelector />
              </div>
            </div>

            <InfoCardGrid>
              {contractsData.map(({ label, address, href }) => (
                <InfoCard
                  key={label}
                  label={label}
                  text={truncateAddress(address)}
                  href={href}
                  ariaLabel={`View ${label} contract address ${address} on explorer`}
                />
              ))}
            </InfoCardGrid>

            <Button
              href={FOC_URLS.warmStorageService.contactSourceCode}
              variant="tertiary"
              icon={GithubLogoIcon}
              className="self-start"
            >
              View contract source code
            </Button>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="text-2xl font-medium">Warm Storage Providers</h3>

            {isLoading && <LoadingStateCard message="Loading providers..." />}

            {error && (
              <ProvidersLoadingError message={error.message} retry={refetch} />
            )}

            {providers && providers.length > 0 && (
              <WarmStorageProvidersTable data={providers} />
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
