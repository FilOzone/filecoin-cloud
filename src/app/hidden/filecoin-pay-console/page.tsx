import { PageSection } from '@filecoin-foundation/ui-filecoin/PageSection'
import { SectionContent } from '@filecoin-foundation/ui-filecoin/SectionContent'

import { Navigation } from '@/components/Navigation/Navigation'
// import { SectionSubContent } from '@filecoin-foundation/ui-filecoin/SectionSubContent'

export default function FilecoinPayConsole() {
  return (
    <>
      <Navigation backgroundVariant="transparentDark" />
      <PageSection backgroundVariant="light">
        <SectionContent title="Filecoin Pay Console">
          {/* <SectionSubContent headingTag="h3" title="Funds" />
        <SectionSubContent headingTag="h3" title="Payment Rails" /> */}
        </SectionContent>
      </PageSection>
    </>
  )
}
