import { Card } from '@filecoin-foundation/ui-filecoin/Card'
import { CardGrid } from '@filecoin-foundation/ui-filecoin/CardGrid'
import { PageHeader } from '@filecoin-foundation/ui-filecoin/PageHeader'
import { PageSection } from '@filecoin-foundation/ui-filecoin/PageSection'
import { SectionContent } from '@filecoin-foundation/ui-filecoin/SectionContent'

import { Button } from '@/components/Button'

import { storageFeatures } from './data/storageFeatures'

export default function WarmStorageService() {
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
        />
      </PageSection>

      <PageSection backgroundVariant="dark">
        <SectionContent
          centerCTA
          centerTitle
          title="Become a PDP Storage Provider"
          description="Join the network to offer verifiable warm storage service."
          cta={
            <Button
              href="https://github.com/filecoin-project"
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
