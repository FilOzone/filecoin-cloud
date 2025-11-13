// import { Announcement } from '@filecoin-foundation/ui-filecoin/Announcement'
import { Card } from '@filecoin-foundation/ui-filecoin/Card'
import { CardGrid } from '@filecoin-foundation/ui-filecoin/CardGrid'
import { LogoSection } from '@filecoin-foundation/ui-filecoin/LogoSection/LogoSection'
import { PageHeader } from '@filecoin-foundation/ui-filecoin/PageHeader'
import { PageSection } from '@filecoin-foundation/ui-filecoin/PageSection'
import { SectionContent } from '@filecoin-foundation/ui-filecoin/SectionContent'

import { BackgroundVideo } from '@/components/BackgroundVideo'
import { Button } from '@/components/Button'
import { Faq } from '@/components/Faq'
import { LinkCard } from '@/components/LinkCard'
import { Navigation } from '@/components/Navigation/Navigation'
import { Phase } from '@/components/Phase'
import { SimpleCardWithImage } from '@/components/SimpleCardWithImage'

// import { BASE_DOMAIN, FOC_URLS } from '@/constants/site-metadata'
import { FOC_URLS } from '@/constants/site-metadata'
import CometVideoPoster from '@/public/assets/comet-video-poster.webp'

import { buildPhases } from './data/build-phases'
import { buildersLogos } from './data/builders-logos'
import { developerResources } from './data/developer-resources'
import { faqs } from './data/faqs'
import { filecoinOnchainCloudProducts } from './data/filecoin-onchain-cloud-products'
import { focFeatures } from './data/foc-features'
import { runningOnFilecoinOnchainCloud } from './data/running-on-filecoin-onchain-cloud'

export default function HiddenHomepage() {
  return (
    <>
      <div className="isolate relative">
        <BackgroundVideo
          videoPath="/comet-video.mp4"
          poster={CometVideoPoster}
        />

        <Navigation backgroundVariant="transparentDark" />
        <PageSection
          backgroundVariant="transparentDark"
          paddingVariant="medium"
        >
          <div className="space-y-10">
            {/* <Announcement baseDomain={BASE_DOMAIN} href="#" centered>
              Announcing Filecoin Onchain Cloud
            </Announcement> */}
            <PageHeader
              centered
              title="Cloud services with onchain guarantees — ownership, verifiability, and programmability"
              description="Filecoin Onchain Cloud lets you build applications that own their data, payments, and logic."
              cta={
                <Button href={FOC_URLS.documentation} variant="primary">
                  Start building
                </Button>
              }
            />
          </div>
        </PageSection>
      </div>

      <PageSection backgroundVariant="dark" paddingVariant="none">
        <LogoSection
          headingTag="h2"
          title="Already building with Filecoin Onchain Cloud"
          logos={buildersLogos}
        />
      </PageSection>

      {/* TODO: Check button key issue  */}
      <PageSection backgroundVariant="dark">
        <SectionContent
          centerCTA
          title="Own every part of what you build—verifiable by design"
          description="Ship faster. Trust your stack. Scale without dependencies. Build products people can trust because every action proves itself."
          cta={[
            <Button
              key="start-building"
              href={FOC_URLS.documentation}
              variant="primary"
            >
              Start building
            </Button>,
            <Button
              key="view-source-code"
              href={FOC_URLS.warmStorageService.synapseSdk}
              variant="ghost"
            >
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
                <Card
                  key={title}
                  as="li"
                  title={title}
                  description={description}
                  image={image}
                />
              ),
            )}
          </CardGrid>
        </SectionContent>
      </PageSection>

      <PageSection backgroundVariant="dark">
        <SectionContent
          centerCTA
          title="Filecoin Onchain Cloud Building Blocks"
          description="Modular services you can mix, match, and deploy, all built for openness, performance, and control."
        >
          <CardGrid as="ul" variant="smTwoXlFourWider">
            {filecoinOnchainCloudProducts.map(
              ({ title, description, cta, image }) => (
                <SimpleCardWithImage
                  key={title}
                  title={title}
                  description={description}
                  cta={cta}
                  image={image}
                />
              ),
            )}
          </CardGrid>
        </SectionContent>
      </PageSection>

      <PageSection backgroundVariant="light">
        <SectionContent
          centerCTA
          title="Build with us"
          description="Join us in shaping the next wave of open, verifiable cloud services."
          cta={
            <Button href={FOC_URLS.social.telegram} variant="primary">
              Get involved
            </Button>
          }
        >
          <div className="flex flex-col sm:flex-row flex-wrap xl:flex-nowrap">
            {buildPhases.map((phase, index) => {
              const { date, title, description, status } = phase
              const isLast = index === buildPhases.length - 1

              return (
                <div
                  key={title}
                  className="sm:basis-1/2 lg:basis-1/3 last:grow"
                >
                  <Phase
                    date={date}
                    title={title}
                    description={description}
                    status={status}
                    isLast={isLast}
                  />
                </div>
              )
            })}
          </div>
        </SectionContent>
      </PageSection>

      <PageSection backgroundVariant="dark" paddingVariant="topOnly">
        <Faq questions={faqs} />
      </PageSection>

      <PageSection backgroundVariant="dark">
        <SectionContent
          title="Everything you need to build on Filecoin"
          description="SDKs, docs, and a builder community working together to take back the cloud."
        >
          <CardGrid as="ul" variant="mdTwo">
            {developerResources.map(({ title, href, icon }) => (
              <LinkCard
                key={title}
                as="li"
                title={title}
                headingTag="h3"
                href={href}
                icon={{ component: icon, variant: 'filled' }}
              />
            ))}
          </CardGrid>
        </SectionContent>
      </PageSection>
    </>
  )
}
