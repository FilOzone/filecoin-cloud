import { PageSection } from '@filecoin-foundation/ui-filecoin/PageSection'

import { Navigation } from '@/components/Navigation/Navigation'

import { FilecoinPayRailsTable } from './components/FilecoinPayRailsTable'

export default function FilecoinPayConsoleRails() {
  return (
    <>
      <Navigation backgroundVariant="light" />
      <PageSection backgroundVariant="light">
        <FilecoinPayRailsTable />
      </PageSection>
    </>
  )
}
