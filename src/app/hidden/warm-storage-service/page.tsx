'use client'

import { Card } from '@filecoin-foundation/ui-filecoin/Card'
import { CardGrid } from '@filecoin-foundation/ui-filecoin/CardGrid'
import { PageHeader } from '@filecoin-foundation/ui-filecoin/PageHeader'
import { PageSection } from '@filecoin-foundation/ui-filecoin/PageSection'
import { SectionContent } from '@filecoin-foundation/ui-filecoin/SectionContent'
import { GithubLogoIcon } from '@phosphor-icons/react/dist/ssr'

import { Button } from '@/components/Button'

import { FOC_URLS } from '@/constants/siteMetadata'

import { ContractCard } from './components/ContractCard'
import { ContractCardGrid } from './components/ContractCardGrid'
import { IconLink } from './components/IconLink'
import { PricingCard } from './components/PricingCard'
import { pricingTiers } from './data/pricingTiers'
import { storageFeatures } from './data/storageFeatures'
import { useContractsData } from './hooks/useContractsData'

export default function WarmStorageService() {
  const { contractsData } = useContractsData()

  return (
    <>
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
              ({ name, description, price, pricingFeatures, recommended }) => (
                <PricingCard
                  key={name}
                  name={name}
                  description={description}
                  price={price}
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
            <Button href="https://github.com/filecoin-project" variant="ghost">
              View all service providers
            </Button>
          }
        >
          <div className="flex flex-col gap-6">
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

            <IconLink
              icon={GithubLogoIcon}
              href="https://github.com/FilOzone/filecoin-services/releases/tag/alpha%2Fcalibnet%2F0x80617b65FD2EEa1D7fDe2B4F85977670690ed348-v2"
              label="View contract source code"
            />
          </div>
        </SectionContent>
      </PageSection>

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
        >
          <p className="text-center text-sm text-zinc-400">
            Learn how to set up and run a storage provider node.
          </p>
        </SectionContent>
      </PageSection>
    </>
  )
}
