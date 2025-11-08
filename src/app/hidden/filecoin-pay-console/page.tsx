import { PageSection } from '@filecoin-foundation/filecoin-ui/PageSection'
import { SectionContent } from '@filecoin-foundation/filecoin-ui/SectionContent'

import { Navigation } from '@/components/Navigation/Navigation'
// import { SectionSubContent } from '@filecoin-foundation/filecoin-ui/SectionSubContent'

export default function FilecoinPayConsole() {
  return (
    <>
      <Navigation backgroundVariant="light" />
      <PageSection backgroundVariant="light">
        <SectionContent title="Filecoin Pay Console">
          {/* <SectionSubContent headingTag="h3" title="Funds" />
        <SectionSubContent headingTag="h3" title="Payment Rails" /> */}
        </SectionContent>
      </PageSection>
    </>
  )
}
