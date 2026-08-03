import { PATHS } from '@/constants/paths'
import { BASE_URL, FOC_URLS } from '@/constants/site-metadata'

import {
  CLI_REPO_URL,
  MAX_ITEM_SIZE_LABEL,
  RUNBOOK_PATH,
} from '../constants/migration'

/**
 * Spec-conformant llms.txt for this campaign: an H1, a blockquote summary, then
 * H2 lists of links. Per llmstxt.org this format is a documentation index, not
 * a procedure, so the procedure lives at migrate.md and this file points to it.
 */
const LLMS_TXT = `# IPFS to Filecoin

> Move already-pinned IPFS data onto Filecoin warm storage without changing your
> CIDs. Each CID stays byte-identical and keeps resolving over IPFS. Storage
> providers prove possession on chain on a schedule.

If you are an agent asked to perform a migration, read the runbook first: it is
the complete procedure, and the rest of these links are background.

## Do the migration

- [Migration runbook](${BASE_URL}${RUNBOOK_PATH}): the executable procedure — prerequisites, ordered command sequence, stop conditions, and failure modes. Start here.
- [ipfs2foc](${CLI_REPO_URL}): the CLI the runbook drives, with the full command reference and troubleshooting.

## Background

- [IPFS to Filecoin](${BASE_URL}${PATHS.IPFS_TO_FILECOIN.path}): what this is, what it costs, and what it does not do. Includes a free in-browser CID check.
- [Warm storage service](${BASE_URL}${PATHS.WARM_STORAGE_SERVICE.path}): the storage product underneath, and its pricing.
- [Service providers](${BASE_URL}${PATHS.SERVICE_PROVIDERS.path}): the providers that store and prove the data.
- [Documentation](${FOC_URLS.documentation.home}): Filecoin Onchain Cloud docs.

## Limits

- [Talk to our team](${BASE_URL}${PATHS.CONTACT.path}): for sources that are not reachable from a public gateway, or to agree capacity and timing before a large run. There is no cap on how many CIDs the agent or CLI path can migrate; individual items above ${MAX_ITEM_SIZE_LABEL} cannot be migrated, because splitting them would change their CID.
`

export function GET() {
  return new Response(LLMS_TXT, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    },
  })
}
