'use client'

import { Card } from '@filecoin-foundation/ui-filecoin/Card'
import { CardGrid } from '@filecoin-foundation/ui-filecoin/CardGrid'
import { PageHeader } from '@filecoin-foundation/ui-filecoin/PageHeader'
import { PageSection } from '@filecoin-foundation/ui-filecoin/PageSection'
import { SectionContent } from '@filecoin-foundation/ui-filecoin/SectionContent'

import { BecomeProviderSection } from '@/components/BecomeProviderSection'
import { Button } from '@/components/Button'

import { ContractCard } from './components/ContractCard'
import { ContractCardGrid } from './components/ContractCardGrid'
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
              key="learn-more"
              href="https://github.com/filecoin-project"
              variant="primary"
            >
              Get started with our SDK
            </Button>,
            <Button
              key="view-source-code"
              href="https://github.com/filecoin-project"
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
          description="Choose the plan that fits your storage needs."
          cta={
            <Button
              href="https://github.com/filecoin-project"
              variant="primary"
            >
              Get started with our SDK
            </Button>
          }
        />
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
          <ContractCardGrid>
            {contractsData.map((contract) => {
              const { label, address, href } = contract
              return (
                <ContractCard
                  key={label}
                  label={label}
                  address={address}
                  href={href}
                />
              )
            })}
          </ContractCardGrid>
        </SectionContent>
      </PageSection>

      <BecomeProviderSection />
    </>
  )
}
