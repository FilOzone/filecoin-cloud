import { PageSection } from '@filecoin-foundation/filecoin-ui/PageSection'
import { SectionContent } from '@filecoin-foundation/filecoin-ui/SectionContent'

import { Navigation } from '@/components/Navigation/Navigation'

export default function FilecoinPayConsoleAccounts() {
  return (
    <>
      <Navigation backgroundVariant="light" />
      <PageSection backgroundVariant="light">
        <SectionContent
          title="Filecoin Pay Accounts"
          description="Browse all accounts on the networks"
        />
      </PageSection>
    </>
  )
}
