'use client'

import { Card } from '@filecoin-foundation/ui-filecoin/Card'
import { CardGrid } from '@filecoin-foundation/ui-filecoin/CardGrid'
import { PageHeader } from '@filecoin-foundation/ui-filecoin/PageHeader'
import { PageSection } from '@filecoin-foundation/ui-filecoin/PageSection'
import { SectionContent } from '@filecoin-foundation/ui-filecoin/SectionContent'
import { GithubLogoIcon } from '@phosphor-icons/react/dist/ssr'

import { BecomeProviderSection } from '@/components/BecomeProviderSection'
import { Button } from '@/components/Button'
import { Navigation } from '@/components/Navigation/Navigation'
import { RefreshButton } from '@/components/RefreshButton'
import { RefreshOverlay } from '@/components/RefreshOverlay'

import { FOC_URLS } from '@/constants/site-metadata'

import { ContractCard } from './components/ContractCard'
import { ContractCardGrid } from './components/ContractCardGrid'
import { PricingCard } from './components/PricingCard'
import { WarmStorageProvidersTable } from './components/WarmStorageProvidersTable'
import { pricingTiers } from './data/pricing-tiers'
import { storageFeatures } from './data/storage-features'
import { useContractsData } from './hooks/use-contracts-data'
import { useProviders } from './hooks/use-providers'

export default function WarmStorageService() {
  const { contractsData } = useContractsData()
  const {
    data: providers,
    isLoading,
    isRefetching,
    error,
    refetch,
  } = useProviders({ filter: 'approved' })

  const canRefreshTable = providers && !isRefetching

  return (
    <>
      <Navigation backgroundVariant="transparentDark" />
      <PageSection backgroundVariant="dark">
        <PageHeader
          centered
          title="Warm Storage Service"
          description="Verifiable storage powered by Filecoin PDP, with optional fast content delivery through Filecoin Beam, a CDN gateway add-on."
          cta={[
            <Button
              key="get-started-with-our-sdk"
              href={FOC_URLS.warmStorageService.synapseSdk}
              variant="primary"
            >
              Get started with our SDK
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

        <div className="py-25 md:py-30" />

        <CardGrid as="ul" variant="smTwoLgThreeWider">
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
      </PageSection>

      <PageSection backgroundVariant="light" paddingVariant="topOnly">
        <SectionContent
          centerCTA
          centerTitle
          title="Pricing"
          description="Choose the plan that fits your storage needs"
          cta={
            <Button
              href={FOC_URLS.warmStorageService.synapseSdk}
              variant="primary"
            >
              Get started with our SDK
            </Button>
          }
        >
          <div className="grid gap-6 lg:grid-cols-2 lg:max-w-4xl lg:mx-auto">
            {pricingTiers.map(
              ({ name, description, priceInfo, pricingFeatures, recommended }) => (
                <PricingCard
                  key={name}
                  name={name}
                  description={description}
                  priceInfo={priceInfo}
                  pricingFeatures={pricingFeatures}
                  recommended={recommended}
                />
              ),
            )}
          </div>
        </SectionContent>
      </PageSection>

      <PageSection backgroundVariant="light">
        <SectionContent
          centerCTA
          centerTitle
          title="Warm Storage Service"
          description="Lorem ipsum dolor sit amet consectetur."
          cta={
            <Button href="/hidden/service-providers" variant="ghost">
              View all service providers
            </Button>
          }
        >
          <div className="flex flex-col gap-6">
            <h3 className="text-2xl font-medium">Contract Addresses</h3>

            <ContractCardGrid>
              {contractsData.map(({ label, address, href }) => (
                <ContractCard
                  key={label}
                  label={label}
                  address={address}
                  href={href}
                />
              ))}
            </ContractCardGrid>

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
            <div className="flex">
              <RefreshButton onClick={refetch} disabled={!canRefreshTable} />
            </div>

            {isLoading && (
              <div className="text-center py-8 text-gray-600">
                Loading providers...
              </div>
            )}

            {error && (
              <div className="text-center py-8 text-red-600">
                Error loading providers: {error.message || 'Unknown error'}
              </div>
            )}

            {providers && providers.length > 0 && (
              <RefreshOverlay isRefetching={isRefetching}>
                <WarmStorageProvidersTable data={providers} />
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
