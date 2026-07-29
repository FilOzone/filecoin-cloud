import { PATHS } from '@/constants/paths'
import { BASE_URL, FOC_URLS } from '@/constants/site-metadata'

import {
  BROWSER_CHECK_ITEM_CAP,
  COPIES,
  MAX_ITEM_SIZE_LABEL,
  SELF_SERVE_VOLUME_CAP_LABEL,
  USD_PER_TIB_MONTH_PER_COPY,
} from '../constants/migration'

/**
 * Placeholder migration brief. The full command sequence lives with the tool
 * that runs it, in FilOzone/ipfs2foc, and replaces the body of this route once
 * it is published. Serving it from here now means the prompt on the landing
 * page resolves and we can see who is fetching it.
 */
const LLMS_TXT = `# IPFS to Filecoin — migration brief

> DRAFT. This brief is published ahead of the full command sequence. It states
> what the migration does, what it costs, and where it stops. Do not infer
> commands that are not listed here; check the tool's README instead.

## What this is

A migration of pinned IPFS data into Filecoin warm storage. Content is stored as
the CAR of the original DAG, so every CID stays byte-identical and keeps
resolving from any public IPFS gateway. Storage providers prove possession
onchain on a schedule.

## Prerequisites

- Node.js 26 or newer. This is a hard requirement.
- A list of CIDs, one per line, in a text file (conventionally cids.txt).
- Each CID must be retrievable from a public IPFS gateway. Private pinning
  accounts and authenticated endpoints are not reachable this way.
- A wallet holding USDFC for storage and a small amount of FIL for gas.
  Use a wallet kept for this purpose. The deposited balance is the ceiling on
  what any unattended run can spend.
- A public HTTPS origin the storage provider can pull pieces from. See stage 0.

## Stage 0 — check the ingress before anything else

At submission a storage provider pulls pieces from a public HTTPS origin that
you supply. Private and loopback addresses are rejected. Confirm you have one
of these BEFORE computing piece commitments, because discovering it afterwards
wastes the entire run:

- the \`cloudflared\` binary installed, for \`--ingress cloudflared\`; or
- a VPS or Tailscale fronting the port yourself, for \`--ingress funnel\`; or
- a source relay URL, for \`--source-relay\`.

If none is available, stop and report that to the user rather than choosing one
on their behalf. Installing a tunnel binary and exposing a local port to the
internet is the user's decision to make.

## Caps

- ${MAX_ITEM_SIZE_LABEL} per item. Larger assets cannot be moved yet, because
  splitting them would change their CID.
- ${SELF_SERVE_VOLUME_CAP_LABEL} total for a self-serve run. Past that, capacity
  and timing must be agreed with storage providers first: ${BASE_URL}${PATHS.CONTACT.path}
- ${BROWSER_CHECK_ITEM_CAP} items for the in-browser check on the landing page.
  The command-line tool has no item cap and resumes if a run stops.

## Cost

Storage is ${USD_PER_TIB_MONTH_PER_COPY} USDFC per TiB per month per copy, at
${COPIES} copies by default, streamed to providers per epoch. A small proving
charge is billed alongside it. Funding is a deposit covering a chosen period,
plus a refundable 30-day buffer and a per-data-set lifecycle reserve held while
the data is stored. Gas is paid separately in FIL.

A deposit funds a rate, not a term. Funded duration is the available balance
divided by the burn rate across every data set on the account, so storing more
data later moves the funded-until date earlier.

## Stages

1. analyze — read the CID list, fetch each CID from a public gateway, compute
   its Filecoin piece identifier and size. Free, no wallet, nothing charged.
2. plan — produce the deposit required for the chosen retention period, and the
   list of CIDs that could not be retrieved.
3. fund — deposit USDFC and approve spending. This step moves money and is
   handed back to the human.
4. migrate — providers pull the data and commit it onchain.
5. verify — retrieve by original CID and check the onchain proof, then keep the
   manifest mapping every IPFS CID to its Filecoin piece identifier.

## Failure modes

- Unreachable CIDs are reported with counts and recorded in the manifest. They
  are never silently dropped.
- A stopped run resumes from its recorded state. Nothing already stored is
  re-paid for.
- If the funded balance runs out, providers can end the service and keep the
  buffer. Top up before the funded-until date.

## Do not

- Re-chunk, repackage, or otherwise alter content. Changing a CID defeats the
  point of the migration.
- Delete data from the existing pinning provider until the migration has been
  verified.
- Use a key to a wallet that holds anything beyond what this migration needs.

## Links

- Landing page: ${BASE_URL}${PATHS.IPFS_TO_FILECOIN.path}
- Documentation: ${FOC_URLS.documentation.home}
- Talk to our team: ${BASE_URL}${PATHS.CONTACT.path}
`

export function GET() {
  return new Response(LLMS_TXT, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    },
  })
}
