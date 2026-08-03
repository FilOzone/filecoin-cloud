import { PATHS } from '@/constants/paths'
import { BASE_URL } from '@/constants/site-metadata'

import {
  BUFFER_DAYS,
  CLI_PACKAGE,
  CLI_REPO_URL,
  CLI_VERIFIED_FROM,
  COORDINATION_VOLUME_LABEL,
  COPIES,
  DAYS_PER_MONTH,
  MAX_ITEM_SIZE_LABEL,
  RUNBOOK_PATH,
  USD_LIFECYCLE_RESERVE_PER_DATA_SET,
  USD_PER_TIB_MONTH_PER_COPY,
  USD_PROVING_PER_TIB_MONTH_PER_COPY,
} from '../constants/migration'

const CONTACT_URL = `${BASE_URL}${PATHS.CONTACT.path}`
const LANDING_URL = `${BASE_URL}${PATHS.IPFS_TO_FILECOIN.path}`

/**
 * The executable procedure served at {@link RUNBOOK_PATH}. This is the product
 * for the agent audience, so it names the tool, states the version its commands
 * are known to work from, and makes its stop conditions explicit. Every claim
 * here should be checkable against the ipfs2foc CLI itself, not just its README:
 * the two have disagreed before.
 */
export const MIGRATION_RUNBOOK = `---
tool: ${CLI_PACKAGE}
tool_min_version: "${CLI_VERIFIED_FROM}"
tool_repo: ${CLI_REPO_URL}
node: ">=26"
default_network: mainnet
input: a text file of IPFS CIDs, one per line
item_size_limit: ${MAX_ITEM_SIZE_LABEL}
item_count_limit: none
stop_and_ask:
  - stage 0, before exposing a local port to the internet
  - stage 4, before any transaction that spends
never:
  - re-chunk or alter content
  - delete data from the existing provider
  - accept a private key into your context
---

# Migrate IPFS data to Filecoin — agent runbook

> You are migrating already-pinned IPFS CIDs onto Filecoin warm storage using
> the \`${CLI_PACKAGE}\` CLI. Each CID stays byte-identical and, on a data set
> created with IPFS indexing, keeps resolving over IPFS afterwards. This
> document is the whole procedure. Run these commands. Do not build a
> commitment or packing pipeline of your own — the on-chain add rejects a
> mismatched commitment, so an improvised pipeline fails late and expensively.

Every command and flag below is present from \`${CLI_PACKAGE}@${CLI_VERIFIED_FROM}\`
onward. Full command reference: ${CLI_REPO_URL}

## Rules

1. **Never re-chunk, repackage, or alter content.** An unchanged CID is the
   point of the migration.
2. **Never delete data from the current provider.** Verification comes first;
   deletion is the user's decision afterwards.
3. **Never take a private key into your context.** Not in chat, not in a file
   you read. Stage 4 is executed by the user in their own terminal.
4. **Stop and ask at the two gates below.** Exposing a local port (stage 0) and
   spending (stage 4) are the user's decisions.
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
NETWORK=mainnet        # or: NETWORK=calibration, to rehearse on the testnet
\`\`\`

Rehearsing the whole flow on calibration first is strongly recommended before
spending real funds.

### Needed now (stages 0-3)

- Node 26 or newer. Hard requirement. Check with \`node --version\`.
- A CID list, one per line. Blank lines and \`#\` comments are ignored.
- A trustless gateway that serves deterministic CARs. Stage 1 verifies this.

### Needed before stage 4, not before

- A wallet holding USDFC for storage and FIL for gas. **The user holds this
  key. You never see it.**
- A provider id from \`https://pdp.vxb.ai/\${NETWORK}/providers\`.

Do not block stages 0-3 on the wallet. Those stages are free and need no key.

## Stage 0 — settle ingress before computing anything

At submission the storage provider pulls each piece from a public HTTPS origin.
Private, loopback, and CGNAT addresses are rejected. **Resolve this first.**
Discovering it after the commitment pass wastes that entire pass, which on a
large list is hours of work.

| Option | Flag | Requires | Works with |
| --- | --- | --- | --- |
| Cloudflare quick tunnel | \`--ingress cloudflared\` | \`cloudflared\` on PATH, no account | any path |
| Tailscale Funnel or a VPS | \`--ingress funnel\` | you front the port yourself | any path |
| Shared relay | \`--source-relay <url>\` | a relay base URL | single-asset path only |

\`\`\`bash
command -v cloudflared
\`\`\`

The relay is **only** valid for the single-asset path. If stage 2 sends you to
the multi-asset path, the provider must pull assembled CAR files from your own
origin, and the relay cannot serve them.

**Gate.** If no option is available, stop and tell the user. A tunnel exposes a
local port to the internet; that is their decision to make, not yours. Do not
install a tunnel binary on their behalf.

## Stage 1 — confirm the gateway serves deterministic CARs

\`\`\`bash
${CLI_PACKAGE} probe <one-cid-from-the-list> --gateway https://trustless-gateway.link
\`\`\`

\`WARN\` means the bytes did not re-hash to the requested CID, or the response was
not a CAR. That gateway cannot be a source. Try another before continuing; the
repo's \`docs/sources.md\` lists per-provider notes. Do not proceed on a \`WARN\`:
the provider re-fetches and recomputes, so a non-deterministic source fails
every piece.

## Stage 2 — measure, then tell the user what they are in for

Free, read-only, no wallet.

\`\`\`bash
${CLI_PACKAGE} analyze --cids cids.txt --sample 100 --json
\`\`\`

Use \`--all\` instead of \`--sample 100\` only when the list is small enough that
probing every CID is affordable; it is the only way to get an exact per-CID
result at this stage.

The JSON gives you \`input.totalCount\`, \`input.estimatedTotalSizeBytes\`,
\`sourceGateway.successRate\`, \`sourceGateway.latencyP50Ms\`, per-probe \`bytes\`,
and a \`persona\` block of recommended flags. It does **not** give you a cost or a
completion time. Derive those as below; do not invent a formula.

### What to report back before going further

- CID count, and the sampled retrieval success rate. If you sampled, say so —
  you know which CIDs failed **in the sample**, not across the whole list. The
  exact per-CID result comes out of stage 3.
- Projected total size, from \`estimatedTotalSizeBytes\`.
- **Projected wall-clock time.** A rough lower bound for the commitment pass is
  \`totalCount × latencyP50Ms ÷ concurrency\`. State it as approximate, and say
  that the provider's pull rate — not this pass — dominates the total for a
  large run.
- Estimated storage cost, using the formula below.

### Cost formula

Storage is ${USD_PER_TIB_MONTH_PER_COPY} USDFC per TiB per month per copy plus
${USD_PROVING_PER_TIB_MONTH_PER_COPY} proving, across ${COPIES} copies by default:

\`\`\`
burn_per_TiB_month = (${USD_PER_TIB_MONTH_PER_COPY} + ${USD_PROVING_PER_TIB_MONTH_PER_COPY}) × ${COPIES}
storage   = size_TiB × burn_per_TiB_month × (days_funded ÷ ${DAYS_PER_MONTH})
buffer    = size_TiB × burn_per_TiB_month          # ${BUFFER_DAYS} days, refundable
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
- Use the flags \`analyze\` recommends in its \`persona\` block rather than guessing.

Above roughly ${COORDINATION_VOLUME_LABEL}, capacity and timing are worth
agreeing with providers before starting. That is coordination, not a ceiling:
mention ${CONTACT_URL} as an option and continue if the user wants to.

### Choosing a packing path

Providers advertise a **minimum piece size** (commonly 1 MiB) and enforce a pull
limit of roughly ${MAX_ITEM_SIZE_LABEL} raw per item. Read the actual values for
your chosen provider from \`https://pdp.vxb.ai/\${NETWORK}/providers\`.

The two limits behave differently, and this matters:

- The **minimum** is advisory. \`pdp-submit\` warns and proceeds by default; pass
  \`--strict-piece-size\` to refuse instead. So small items are a packing
  efficiency question, not a blocker.
- The **pull limit** is hard. An item above it cannot be migrated, because
  splitting it would change its CID. Hold those out and report them.

Evaluate against the per-probe \`bytes\` in the \`analyze\` JSON:

- **Few sampled items below the provider minimum** → single-asset path
  (the default). Each CID becomes one passthrough item pulled straight from the
  gateway. No staging disk needed.
- **A large share below the minimum** → consider the multi-asset path, which
  batches them into fewer, larger pieces. It needs disk for the assembled CARs
  and rules out the relay, so it is a trade rather than an obligation. Say which
  you chose and why.

## Stage 3 — plan

\`\`\`bash
# single-asset (default)
${CLI_PACKAGE} plan --cids cids.txt --db migrate.db

# multi-asset, when many items fall below the provider minimum
${CLI_PACKAGE} plan --cids cids.txt --db migrate.db --no-auto-pack
${CLI_PACKAGE} pack-cars --db migrate.db --car-store ./cars --pack-target-size 512MiB
\`\`\`

\`plan\` is insert-only and resumable: re-running it computes only CIDs not yet
done and never disturbs committed state. This stage produces the **exact**
per-CID result, including anything unretrievable or \`oversized\`. Report that to
the user; it supersedes the stage 2 sample.

Check progress at any time with \`${CLI_PACKAGE} status --json\`.

## Stage 4 — funding (the user runs this, not you)

**Gate. This stage spends money and requires a private key.**

Stop. Give the user these commands to run **in their own terminal**, and ask
them to paste back only the printed \`dataSetId\`. Do not offer to run these for
them, and do not accept a key if one is offered — a key pasted into a chat is a
key in a transcript.

\`\`\`bash
export PRIVATE_KEY=0x...                                  # user's terminal only
npx filecoin-pin@latest payments setup --auto --network "$NETWORK"
npx filecoin-pin@latest payments status --network "$NETWORK"
${CLI_PACKAGE} create-data-set --provider-id <id> --network "$NETWORK"
\`\`\`

\`create-data-set\` reverts if the USDFC deposit or the operator approval is
insufficient. Remind the user that the deposited amount is the ceiling on
everything downstream.

**Resume only when the user confirms funding succeeded and gives you the
\`dataSetId\`.** Submission in stage 5 also signs, so it needs the same key
available in the environment where it runs. If the user wants to keep the key
off your machine entirely, stage 5 is theirs to run too, and you read back the
report from stage 6.

## Stage 5 — submit

Two processes. The pull source must stay running for the whole submission.

\`\`\`bash
# Start in the background and read its log until it prints the public URL.
${CLI_PACKAGE} redirect-serve --db migrate.db --port 4322 --ingress cloudflared
# logs: "cloudflared ingress: ready at https://<words>.trycloudflare.com"
\`\`\`

Extract that HTTPS origin from the log output and pass it as \`--source-base\`.
It is the **origin only** — scheme and host, no path. Then:

\`\`\`bash
${CLI_PACKAGE} pdp-submit --db migrate.db --data-set-id <id> \\
  --source-base https://<public-host> --network "$NETWORK"
\`\`\`

With a relay instead of your own ingress (single-asset path only):

\`\`\`bash
${CLI_PACKAGE} pdp-submit --db migrate.db --data-set-id <id> \\
  --source-relay <relay-base> --network "$NETWORK"
\`\`\`

\`pdp-submit\` is resumable and will not double-submit. It pauses when the network
base fee is above \`--max-base-fee\`; that is congestion backoff, not a failure.
Check with \`${CLI_PACKAGE} gas --network "$NETWORK"\`.

## Stage 6 — verify

\`\`\`bash
${CLI_PACKAGE} report --db migrate.db --data-set-id <id> --network "$NETWORK" --json
\`\`\`

This reconciles local state against the pieces the data set actually holds on
chain. Hand the user the report, the data set id, and the path to \`migrate.db\`.

Tell them explicitly: **check retrieval of a few of their own CIDs, and keep the
old pinning plan until they have.** Verification is theirs to accept, not yours
to declare.

## Failure modes

| Symptom | Meaning | Action |
| --- | --- | --- |
| \`probe\` reports \`WARN\` | gateway does not serve deterministic CARs | pick another gateway |
| \`plan\` reports \`oversized\` | padded size exceeds the aggregate budget | hold that CID out, report it |
| \`below provider min piece size\` warning | items under the advertised minimum | expected; it proceeds. Use the multi-asset path only to pack more efficiently |
| provider rejects the pull | \`--source-base\` has a path, or is not a public IP | pass origin only, recheck ingress |
| submission pauses on \`spike\` | base fee above the gate | wait it out; this is expected |
| \`set PRIVATE_KEY\` error | key not in that shell's environment | the user exports it in their own terminal |
| aggregate stuck \`failed\` | see the repo's recovery commands | \`reset-failed-aggregates\` |

One unretrievable item fails everything batched with it, which is why stages 2
and 3 validate retrievability before anything is submitted.

## Links

- Tool, full command reference, and troubleshooting: ${CLI_REPO_URL}
- Rehearse on the testnet first: \`docs/tutorial-first-migration.md\` in that repo
- Landing page: ${LANDING_URL}
- Talk to the team about capacity: ${CONTACT_URL}
- This runbook: ${BASE_URL}${RUNBOOK_PATH}
`
