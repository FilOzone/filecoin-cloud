'use client'

import { Card } from '@filecoin-foundation/ui-filecoin/Card'
import { CardGrid } from '@filecoin-foundation/ui-filecoin/CardGrid'
import { LoadingStateCard } from '@filecoin-foundation/ui-filecoin/LoadingStateCard'
import { PageHeader } from '@filecoin-foundation/ui-filecoin/PageHeader'
import { PageSection } from '@filecoin-foundation/ui-filecoin/PageSection'
import { RefreshOverlay } from '@filecoin-foundation/ui-filecoin/RefreshOverlay'
import { SectionContent } from '@filecoin-foundation/ui-filecoin/SectionContent'
import { ExternalTextLink } from '@filecoin-foundation/ui-filecoin/TextLink/ExternalTextLink'
import { GithubLogoIcon } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import { useState } from 'react'

import { BecomeProviderSection } from '@/components/BecomeProviderSection'
import { Button } from '@/components/Button'
import { InfoCard } from '@/components/InfoCard'
import { InfoCardGrid } from '@/components/InfoCardGrid'
import { Navigation } from '@/components/Navigation/Navigation'
import { NetworkSelector } from '@/components/NetworkSelector'
import { ProvidersLoadingError } from '@/components/ProvidersLoadingError'
import { RefreshButton } from '@/components/RefreshButton'

import { PATHS } from '@/constants/paths'
import { FIL_BEAM_URL, FOC_URLS } from '@/constants/site-metadata'
import synapseCodeSnippet from '@/public/assets/synapse-code-snippet.webp'
import { truncateAddress } from '@/utils/truncate-address'

import { PricingCard } from './components/PricingCard'
import { WarmStorageProvidersTable } from './components/WarmStorageProvidersTable'
import { storageFeatures } from './data/storage-features'
import { SYNAPSE_CODE_SNIPPET } from './data/synapse-code-snippet'
import { useContractsData } from './hooks/use-contracts-data'
import { useProviders } from './hooks/use-providers'

export default function WarmStorageService() {
  const [isCopied, setIsCopied] = useState(false)
  const { contractsData } = useContractsData()
  const {
    data: providers,
    isLoading,
    isRefetching,
    error,
    refetch,
  } = useProviders({ filter: 'approved' })

  const canRefreshTable = providers && !isRefetching

  async function handleCopyCode() {
    try {
      await navigator.clipboard.writeText(SYNAPSE_CODE_SNIPPET)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code snippet:', err)
    }
  }

  return (
    <>
      <Navigation backgroundVariant="transparentDark" />
      <PageSection backgroundVariant="dark">
        <PageHeader
          centered
          title="Warm Storage Service"
          description={
            <>
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
            </>
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

        <div className="py-15 md:pb-25" />

        <SectionContent
          centerCTA
          centerTitle
          title="Integrate warm storage in your app"
          description="Get started with storage in just a few lines of code"
          cta={[
            <Button
              key="copy-code-snippet"
              onClick={handleCopyCode}
              variant="primary"
              className="min-w-[200px]"
            >
              {isCopied ? 'Copied!' : 'Copy code snippet'}
            </Button>,
            <Button
              key="explore-documentation"
              href="https://github.com/FilOzone/filecoin-services/releases/tag/alpha%2Fcalibnet%2F0x80617b65FD2EEa1D7fDe2B4F85977670690ed348-v2"
              variant="ghost"
            >
              Explore documentation
            </Button>,
          ]}
        >
          <div className="max-w-4xl mx-auto">
            <Image src={synapseCodeSnippet} alt="Synapse code snippet" />
          </div>
        </SectionContent>
      </PageSection>

      <PageSection backgroundVariant="light" paddingVariant="topOnly">
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
            <div className="flex justify-end">
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
