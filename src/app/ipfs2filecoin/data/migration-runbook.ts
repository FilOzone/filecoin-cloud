import { PATHS } from '@/constants/paths'
import { BASE_URL } from '@/constants/site-metadata'

import {
  AGENT_PROMPT,
  BUFFER_DAYS,
  CLI_PACKAGE,
  CLI_REPO_URL,
  CLI_VERIFIED_FROM,
  COORDINATION_VOLUME_LABEL,
  COPIES,
  DAYS_PER_MONTH,
  MAX_ITEM_SIZE_LABEL,
  RUNBOOK_PATH,
  USD_FLAT_PER_DATA_SET_MONTH,
  USD_LIFECYCLE_RESERVE_PER_DATA_SET,
  USD_PER_TIB_MONTH_PER_COPY,
} from '../constants/migration'

const CONTACT_URL = `${BASE_URL}${PATHS.CONTACT.path}`
const LANDING_URL = `${BASE_URL}${PATHS.IPFS_TO_FILECOIN.path}`

/**
 * The executable procedure served at {@link RUNBOOK_PATH}. This is the product
 * for the agent audience, so it names the tool, states the version its commands
 * are known to work from, and makes its stop conditions explicit. Every claim
 * here should be checkable against the ipfs2foc CLI itself, not just its README:
 * the two have disagreed before.
 *
 * Built on the direct-upload flow (`ipfs2foc upload`, FilOzone/ipfs2foc#71):
 * the client downloads, packs multi-root CARs locally, streams each straight to
 * the storage providers, and batches the on-chain adds. No public HTTPS origin,
 * tunnel, or relay is involved anywhere in this procedure.
 */
export const MIGRATION_RUNBOOK = `---
tool: ${CLI_PACKAGE}
tool_min_version: "${CLI_VERIFIED_FROM}"
tool_repo: ${CLI_REPO_URL}
node: ">=24"
default_network: mainnet
input: a text file of IPFS CIDs, one per line
item_size_limit: ${MAX_ITEM_SIZE_LABEL}
item_count_limit: none
disk: free space roughly the size of the data being migrated, for staged CARs
stop_and_ask: stage 3, before any transaction that spends
never:
  - re-chunk or alter content
  - delete data from the existing provider
  - accept a private key into your context
---

# Migrate IPFS data to Filecoin — agent runbook

> You are migrating already-pinned IPFS CIDs onto Filecoin warm storage using
> the \`${CLI_PACKAGE}\` CLI. Each CID stays byte-identical and, because data
> sets are created with IPFS indexing, keeps resolving over IPFS afterwards.
> This document is the whole procedure. Run these commands. Do not build a
> commitment, packing, or upload pipeline of your own — the on-chain add
> rejects a mismatched commitment, so an improvised pipeline fails late and
> expensively.

If you are a human reading this: you do not have to run the procedure
yourself. Hand your coding agent this one line and it does the rest.

    ${AGENT_PROMPT}

The migration runs entirely from this machine: download, pack, and upload
straight to ${COPIES} storage providers. Nothing here requires a public HTTPS
origin, a tunnel, or inbound connectivity of any kind.

Every command and flag below is present from \`${CLI_PACKAGE}@${CLI_VERIFIED_FROM}\`
onward. Full command reference: ${CLI_REPO_URL}

## Rules

1. **Never re-chunk, repackage, or alter content.** An unchanged CID is the
   point of the migration.
2. **Never delete data from the current provider.** Verification comes first;
   deletion is the user's decision afterwards.
3. **Never resolve a private key.** Never ask for one in chat, never print
   one, never read one back. Passing a key file into a command without
   inspecting it is the one permitted use; everything else is off limits.
4. **Stop and ask at the funding gate (stage 3).** Spending is the user's
   decision.
5. **The deposit is the ceiling.** A key that can sign on the account can draw
   against its balance. Advise a wallet kept for this purpose, holding what this
   migration needs and nothing else.
6. **Report failures with counts and names.** Never silently drop a CID.

## Setup

Install once, then every command below runs as \`${CLI_PACKAGE} ...\`:

\`\`\`bash
npm install -g ${CLI_PACKAGE}
${CLI_PACKAGE} --help
\`\`\`

\`--help\` is the install check. There is no \`--version\` subcommand; it exits
non-zero as an unknown command, which reads like a broken install when it is not.

If you cannot install globally, prefix **every** command in this document with
\`npx -y ${CLI_PACKAGE}@latest\` instead. Do not mix the two forms: a bare
\`${CLI_PACKAGE}\` after only an \`npx\` check is the most common first failure.

Set the network once and pass it to every on-chain command:

\`\`\`bash
NETWORK=mainnet
\`\`\`

### Needed now (stages 1-2)

- Node 24 or newer. Hard requirement. Check with \`node --version\`.
- A CID list, one per line, saved as \`cids.txt\`. Blank lines and \`#\` comments
  are ignored. If the user does not have a list, stop and ask them for one:
  you have neither their credentials nor the name of their service. Tell them
  where to look — a pinning dashboard can usually export its pinned CIDs, and
  services implementing the IPFS Pinning Service API list them at its
  \`/pins\` endpoint — and wait for the file.
- A trustless gateway that serves deterministic CARs. Stage 1 verifies this.
- Free disk roughly the size of the data being migrated. Stage 4 stages packed
  CAR files under \`--car-store\` and deletes each one as soon as every copy is
  committed onchain.
- Telemetry: each CLI command reports one anonymous run event, the command
  name and whether it succeeded, and a finished upload reports its totals
  (CID count, migrated count, bytes stored) — never CIDs, addresses, or
  paths. Disable with \`DO_NOT_TRACK=1\`, and tell the user if you do.

### Needed before stage 3, not before

A wallet holding USDFC for storage and FIL for gas. **The user holds this key.
You never see it.** Do not block stages 1-2 on the wallet — those stages are
free and need no key.

## Stage 1 — confirm the gateway serves deterministic CARs

\`\`\`bash
${CLI_PACKAGE} probe <one-cid-from-the-list> --gateway https://trustless-gateway.link
\`\`\`

\`WARN\` means the bytes did not re-hash to the requested CID, or the response was
not a CAR. That gateway cannot be a source. Try another before continuing; the
repo's \`docs/sources.md\` lists per-provider notes. Do not proceed on a \`WARN\`:
stage 4 re-fetches and recomputes, so a non-deterministic source fails every
piece it touches.

## Stage 2 — measure, then tell the user what they are in for

Free, read-only, no wallet.

\`\`\`bash
${CLI_PACKAGE} analyze --cids cids.txt --sample 100 --json
\`\`\`

Use \`--all\` instead of \`--sample 100\` only when the list is small enough that
probing every CID is affordable; it is the only way to get an exact per-CID
result at this stage.

The JSON gives you \`input.totalCount\`, \`input.estimatedTotalSizeBytes\`,
\`sourceGateway.successRate\`, \`sourceGateway.latencyP50Ms\`, and per-probe
\`bytes\`. It does **not** give you a cost or a completion time. Derive those as
below; do not invent a formula.

### What to report back before going further

- CID count, and the sampled retrieval success rate. If you sampled, say so —
  you know which CIDs failed **in the sample**, not across the whole list. The
  exact per-CID result comes out of stage 4.
- Projected total size, from \`estimatedTotalSizeBytes\`.
- **Projected wall-clock time.** The run downloads everything once and uploads
  it once, so a rough lower bound is total size ÷ the slower of download and
  upload bandwidth. State it as approximate. Upload bandwidth usually
  dominates on residential connections.
- The disk requirement: free space roughly the projected total size, freed
  progressively as pieces commit.
- Items above ${MAX_ITEM_SIZE_LABEL}. These cannot be migrated — splitting
  them would change their CID — so hold them out and name them.
- Estimated storage cost, using the formula below.

### Cost formula

Storage is ${USD_PER_TIB_MONTH_PER_COPY} USDFC per TiB per month per copy, plus
a flat ${USD_FLAT_PER_DATA_SET_MONTH} per data set per month, across ${COPIES}
copies by default. The flat fee is added ONCE per data set, not multiplied by
size. Folding it into a per-TiB rate is exact at 1 TiB and wrong at every other
size, badly so below it:

\`\`\`
burn_per_month = (size_TiB × ${USD_PER_TIB_MONTH_PER_COPY} + ${USD_FLAT_PER_DATA_SET_MONTH}) × ${COPIES}
storage   = burn_per_month × (days_funded ÷ ${DAYS_PER_MONTH})
buffer    = burn_per_month                         # ${BUFFER_DAYS} days, refundable
reserve   = ${USD_LIFECYCLE_RESERVE_PER_DATA_SET} × ${COPIES}                     # per data set, unused portion returns
deposit   = storage + buffer + reserve
\`\`\`

Gas is paid separately in FIL. A deposit funds a rate, not a term: storing more
data later spends the balance faster and moves the funded-until date earlier.
Treat these as estimates; the exact deposit is shown at funding time.

### Long runs are normal, not a limit

**There is no cap on how many CIDs this path can migrate.** A large list simply
takes a long time — often many hours. Say so plainly and let the user decide.
Do not treat duration as a blocker, and do not route a large list away on size
alone.

- A command that runs for hours is working, not hung. Do not kill it. State is
  kept in SQLite and a stopped run resumes where it left off.
- Run on a machine that stays awake. A sleeping laptop stalls the run.

Above roughly ${COORDINATION_VOLUME_LABEL}, capacity and timing are worth
agreeing with providers before starting. That is coordination, not a ceiling:
mention ${CONTACT_URL} as an option and continue if the user wants to.

## Stage 3 — funding (the user runs this, not you)

**Gate. This stage spends money and requires a private key.**

Stop. Give the user these commands to run **in their own terminal**, and ask
them to confirm when both succeed. Do not offer to run these for them, and do
not accept a key if one is offered — a key pasted into a chat is a key in a
transcript.

\`\`\`bash
export PRIVATE_KEY=0x...                                  # user's terminal only
npx filecoin-pin@latest payments setup --auto --network "$NETWORK"
npx filecoin-pin@latest payments status --network "$NETWORK"
\`\`\`

No data set needs to be provisioned by hand: stage 4 creates one per provider
copy on its first onchain commit, with IPFS indexing enabled. Remind the user
that the deposited amount is the ceiling on everything downstream.

**Resume only when the user confirms funding succeeded.** Stage 4 signs with
the same key, so it must run in a shell where \`PRIVATE_KEY\` is exported. Your
shell almost certainly does not keep exported variables between commands, and
you must not ask for the key directly, so have the user write it to a file once
and read it inline on the stage 4 command:

\`\`\`bash
# user, once, in their own terminal. Typed, not echoed: the key never appears
# on a command line, so it never reaches shell history.
(umask 077; read -rs -p 'private key: ' K && printf '%s' "$K" > ~/.foc-key && unset K)
\`\`\`

Then every command you run substitutes it without the key ever entering your
context or the transcript:

\`\`\`bash
PRIVATE_KEY=$(cat ~/.foc-key) ${CLI_PACKAGE} upload --cids cids.txt --db migrate.db --car-store ./cars --network "$NETWORK"
\`\`\`

When the migration is verified, tell the user to delete that file. Do not
delete it yourself. If the user would rather keep the key off your machine
entirely, stage 4 is theirs to run too, and you read back the summary it
prints.

## Stage 4 — upload

One command owns the rest of the migration: it downloads each CID, packs
multi-root CAR pieces (up to ~1000 MiB each), streams every piece straight to
the primary provider, has the second provider copy from the first, and commits
the adds onchain in batches of up to 40 pieces per transaction. Providers are
chosen automatically; the batching timer commits early rather than risk a
provider expiring an uncommitted piece.

\`\`\`bash
PRIVATE_KEY=$(cat ~/.foc-key) ${CLI_PACKAGE} upload --cids cids.txt --db migrate.db --car-store ./cars --network "$NETWORK"
\`\`\`

Drop the \`PRIVATE_KEY=\` prefix only if the user is running this command
themselves in a shell where they have already exported the key.

- The run is resumable: re-running the same command continues where it
  stopped, never re-uploads what is already committed, and never
  double-commits.
- The run creates fresh data sets by default, and that is what you want:
  data sets created before the network's 2026-08-24 contract upgrade miss its
  gas optimizations, so every commit into one costs more. Only pass
  \`--data-set-id\` to reuse a set this wallet created after that upgrade;
  a set's creation date is on its explorer page at
  \`https://pdp.vxb.ai/\${NETWORK}/dataset/<dataSetId>\`.
- Staged CARs under \`./cars\` are deleted during the run as each piece's
  copies are all committed. Do not delete them by hand mid-run.
- \`collected:\` lines mean a provider expired a piece before it was committed;
  the run re-uploads it automatically and tightens its timing for that
  provider. Informational, not a failure.
- Check progress from another shell at any time with
  \`${CLI_PACKAGE} status --db migrate.db --json\`.

The final JSON summary lists, per provider, the data set id, the counts of
committed and failed pieces, and how many staged CARs were cleaned up. Save it;
stage 5 uses the data set ids.

## Stage 5 — verify

Verification is against the chain and real retrievals, not the tool's own
bookkeeping.

1. **Onchain.** Open each data set from the stage 4 summary at
   \`https://pdp.vxb.ai/\${NETWORK}/dataset/<dataSetId>\` and confirm it is live
   and holds the expected pieces. There is one data set per copy, so with the
   default ${COPIES} copies there are ${COPIES} ids.
2. **Retrieval.** Fetch a handful of the user's original CIDs — spread across
   the list, not just the first few — and confirm the bytes come back. IPFS
   indexing announces migrated CIDs to the public IPFS network (via IPNI), so
   after indexing completes they resolve through ordinary IPFS gateways and
   \`https://cid.contact/routing/v1/providers/<cid>\` lists the new providers.
   Indexing lag of minutes to hours after commit is normal.
3. **Accounting.** Compare committed piece counts in the summary against the
   CID count, and name every CID that was held out or failed.

Hand the user the summary, the data set ids, and the path to \`migrate.db\`.
Tell them explicitly: **check retrieval of a few of their own CIDs, and keep
the old pinning plan until they have.** Verification is theirs to accept, not
yours to declare.

## Failure modes

| Symptom | Meaning | Action |
| --- | --- | --- |
| \`probe\` reports \`WARN\` | gateway does not serve deterministic CARs | pick another gateway |
| \`exceeds ... upload cap; not migrated\` | item larger than ${MAX_ITEM_SIZE_LABEL} | hold that CID out, report it |
| \`collected:\` during upload | provider expired an uncommitted piece | none — it re-uploads and adapts automatically |
| \`warn: secondary ... failed to pull\`, persistent | that provider cannot fetch from the primary | re-run; if it persists, pin different providers with \`--provider-id\` (ids at \`https://pdp.vxb.ai/\${NETWORK}/providers\`) |
| \`batch left add_unconfirmed\` | an onchain add's outcome is unknown | re-run the same command; it reconciles against the provider before retrying |
| \`set PRIVATE_KEY\` error | key not in that command's environment | re-run it prefixed with \`PRIVATE_KEY=$(cat ~/.foc-key)\`, or hand the command to the user |
| disk fills during the run | staged CARs plus data exceed free space | free space or use a larger disk for \`--car-store\`; committed pieces are already cleaned up |

One unretrievable item fails the piece it was packed into, which is why stages
1-2 validate retrievability before anything is uploaded, and why the run names
every affected CID rather than dropping it.

## Links

- Tool, full command reference, and troubleshooting: ${CLI_REPO_URL}
- Landing page: ${LANDING_URL}
- Talk to the team about capacity: ${CONTACT_URL}
- This runbook: ${BASE_URL}${RUNBOOK_PATH}
`
