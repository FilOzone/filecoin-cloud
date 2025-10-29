// import { Card } from '@filecoin-foundation/ui-filecoin/Card'
import { CardGrid } from '@filecoin-foundation/ui-filecoin/CardGrid'
// import {LogoSection} from '@filecoin-foundation/ui-filecoin/LogoSection'
import { PageHeader } from '@filecoin-foundation/ui-filecoin/PageHeader'
import { PageSection } from '@filecoin-foundation/ui-filecoin/PageSection'
import { SectionContent } from '@filecoin-foundation/ui-filecoin/SectionContent'

import { Button } from '@/components/Button'
import { Faq } from '@/components/Faq'

import { faqs } from './data/faqs'
import { focFeatures } from './data/focFeatures'

export default function HiddenHomepage() {
  return (
    <>
      <PageSection backgroundVariant="dark" paddingVariant="none">
        {/* TODO: Check button key issue  */}
        <PageHeader
          centered
          title="Cloud services with onchain guarantees — ownership, verifiability, and programmability"
          description="Build applications that own their data, payments, and logic."
          cta={[
            <Button key="start-building" href="#" variant="primary">
              Start building
            </Button>,
          ]}
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
              <div key={title}>
                <div>{title}</div>
                <div>{description}</div>
              </div>
              // <Card
              //   key={title}
              //   as="li"
              //   title={title}
              //   description={description}
              //   icon={icon}
              // />
            ))}
          </CardGrid>
        </SectionContent>
      </PageSection>

      <Faq questions={faqs} />
    </>
  )
}
