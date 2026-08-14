import { RUNBOOK_PATH } from '@/app/ipfs2filecoin/constants/migration'
import { PATHS } from '@/constants/paths'
import { BASE_URL, FOC_URLS } from '@/constants/site-metadata'

/**
 * Site-root llms.txt, per llmstxt.org: an index of filecoin.cloud curated for
 * language models. Subpaths may carry their own; /ipfs2filecoin/llms.txt does.
 */
const LLMS_TXT = `# Filecoin Onchain Cloud

> Cloud services with onchain guarantees: ownership, verifiability, and
> programmability. Storage is paid for on chain, proven on a schedule by storage
> providers, and owned by a wallet rather than a vendor account.

## Services

- [Warm storage service](${BASE_URL}${PATHS.WARM_STORAGE_SERVICE.path}): verifiable storage backed by Proof of Data Possession, with pricing and live provider data.
- [Filecoin Pay](${FOC_URLS.filecoinPay}): payment rails that settle storage per epoch.

## Migrate to Filecoin

- [IPFS to Filecoin](${BASE_URL}${PATHS.IPFS_TO_FILECOIN.path}): move already-pinned IPFS data without changing your CIDs.
- [Migration runbook](${BASE_URL}${RUNBOOK_PATH}): the executable procedure for an agent performing that migration.

## Build

- [Documentation](${FOC_URLS.documentation.home}): guides, core concepts, and API reference.
- [Getting started](${FOC_URLS.documentation.gettingStarted}): first steps for developers.
- [Showcase](${BASE_URL}${PATHS.SHOWCASE.path}): SDKs, reference apps, and agent tooling built on the platform.
- [Agents](${BASE_URL}${PATHS.AGENTS.path}): requests for startups building agent-native storage.

## Support

- [Support](${BASE_URL}${PATHS.SUPPORT.path}): the right channel for each kind of problem.
- [Talk to our team](${BASE_URL}${PATHS.CONTACT.path}): use-case and capacity conversations.
- [Status](${FOC_URLS.status}): current service status and incidents.
`

export function GET() {
  return new Response(LLMS_TXT, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    },
  })
}
