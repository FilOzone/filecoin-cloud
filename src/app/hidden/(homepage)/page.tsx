import { Card } from '@filecoin-foundation/ui-filecoin/Card'
import { CardGrid } from '@filecoin-foundation/ui-filecoin/CardGrid'
// import {LogoSection} from '@filecoin-foundation/ui-filecoin/LogoSection'
import { PageHeader } from '@filecoin-foundation/ui-filecoin/PageHeader'
import { PageSection } from '@filecoin-foundation/ui-filecoin/PageSection'
import { SectionContent } from '@filecoin-foundation/ui-filecoin/SectionContent'

// import { SimpleCard } from '@filecoin-foundation/ui-filecoin/SimpleCard'

import { Button } from '@/components/Button'
import { Faq } from '@/components/Faq'

import { developerResources } from './data/developerResources'
import { faqs } from './data/faqs'
import { filecoinOnchainCloudProducts } from './data/filecoinOnchainCloudProducts'
import { focFeatures } from './data/focFeatures'
import { runningOnFilecoinOnchainCloud } from './data/runningOnFilecoinOnchainCloud'

export default function HiddenHomepage() {
  return (
    <>
      <PageSection backgroundVariant="dark" paddingVariant="none">
        <PageHeader
          centered
          title="Cloud services with onchain guarantees — ownership, verifiability, and programmability"
          description="Build applications that own their data, payments, and logic."
          cta={
            <Button href="#" variant="primary">
              Start building
            </Button>
          }
        />
      </PageSection>

      <PageSection backgroundVariant="dark" paddingVariant="none">
        <div className="py-24" />
        {/* <LogoSection
          headingTag="h2"
          title="Built on Filecoin Onchain Cloud"
          logos={buildersLogos}
        /> */}
      </PageSection>

      {/* TODO: Check button key issue  */}
      <PageSection backgroundVariant="dark">
        <SectionContent
          centerCTA
          title="Own every part of what you build—verifiable by design"
          description="Ship faster. Trust your stack. Scale without dependencies. Build products people can trust because every action proves itself."
          cta={[
            <Button key="start-building" href="#" variant="primary">
              Start building
            </Button>,
            <Button key="view-source-code" href="#" variant="ghost">
              View source code
            </Button>,
          ]}
        >
          <CardGrid as="ul" variant="smTwoLgThreeWider">
            {focFeatures.map(({ title, description, icon }) => (
              <Card
                key={title}
                as="li"
                title={title}
                description={description}
                icon={icon}
              />
            ))}
          </CardGrid>
        </SectionContent>
      </PageSection>

      <PageSection backgroundVariant="light">
        <SectionContent
          title="Running on Filecoin Onchain Cloud"
          description="Projects using Filecoin Onchain Cloud to power verifiable, onchain applications and infrastructure."
        >
          <CardGrid as="ul" variant="mdTwoWider">
            {runningOnFilecoinOnchainCloud.map(
              ({ title, description, image }) => (
                <div key={title}>
                  <div>{title}</div>
                  <div>{description}</div>
                </div>
                // <Card
                //   key={title}
                //   as="li"
                //   title={title}
                //   description={description}
                //   image={image}
                // />
              ),
            )}
          </CardGrid>
        </SectionContent>
      </PageSection>

      <PageSection backgroundVariant="dark">
        <SectionContent
          centerCTA
          title="Compose the Building Blocks"
          description="Modular services you can mix, match, and deploy, all built for openness, performance, and control."
        >
          <CardGrid as="ul" variant="smTwoXlFourWider">
            {filecoinOnchainCloudProducts.map(({ title, description, cta }) => (
              <div key={title}>
                <div>{title}</div>
                <div>{description}</div>
              </div>
              // <SimpleCard
              //   key={title}
              //   as="li"
              //   title={title}
              //   description={description}
              //   cta={cta}
              // />
            ))}
          </CardGrid>
        </SectionContent>
      </PageSection>

      <PageSection backgroundVariant="light">
        <SectionContent
          centerCTA
          title="Build with us"
          description="Join us in shaping the next wave of open, verifiable cloud services."
          cta={
            <Button
              href="https://filecoinproject.slack.com/archives/C07CGTXHHT4?utm_source=www.filecoin.cloud"
              variant="primary"
            >
              Join the community
            </Button>
          }
        />
      </PageSection>

      <PageSection backgroundVariant="dark">
        <Faq questions={faqs} />
      </PageSection>

      <PageSection backgroundVariant="dark">
        <SectionContent
          title="Feugiat non pulvinar senectus bibendum vitae"
          description="Lorem ipsum dolor sit amet consectetur. Feugiat non pulvinar senectus bibendum vitae."
        >
          <CardGrid as="ul" variant="mdTwo">
            {developerResources.map(({ title, href, icon }) => (
              <div key={title}>
                <div>{title}</div>
              </div>
              // <LinkCard
              //   key={title}
              //   as="li"
              //   title={title}
              //   headingTag="h3"
              //   href={href}
              //   icon={{ component: icon, variant: 'filled' }}
              // />
            ))}
          </CardGrid>
        </SectionContent>
      </PageSection>
    </>
  )
}
