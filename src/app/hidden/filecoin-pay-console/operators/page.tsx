import { PageSection } from '@filecoin-foundation/ui-filecoin/PageSection'
import { SectionContent } from '@filecoin-foundation/ui-filecoin/SectionContent'

import { Navigation } from '@/components/Navigation/Navigation'

export default function FilecoinPayConsoleOperators() {
  return (
    <>
      <Navigation backgroundVariant="light" />
      <PageSection backgroundVariant="light">
        <SectionContent
          title="Filecoin Pay Operators"
          description="Browse all accounts on the networks"
        />
      </PageSection>
    </>
  )
}
