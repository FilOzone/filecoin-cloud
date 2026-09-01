import { BASE_URL } from '@/constants/site-metadata'

/**
 * Above this, the copied agent prompt points at a downloaded cids.txt instead
 * of inlining the list: a clipboard string is the wrong shape for thousands of
 * lines. A bound on the prompt's form only. The check, the agent, and the CLI
 * have no item cap.
 */
export const PROMPT_INLINE_CAP = 500

/**
 * A hard limit: an item's CAR must fit one uploadable piece, capped at
 * 1,065,353,216 bytes (1016 MiB) by the storage SDK. A larger item cannot be
 * split without changing its CID.
 */
export const MAX_ITEM_SIZE_LABEL = '1016 MiB'

/**
 * Above this, capacity and timing are worth agreeing with providers before a
 * run starts. A prompt to coordinate, NOT a ceiling on what can be migrated.
 */
export const COORDINATION_VOLUME_LABEL = '500 GiB'

export const CLI_PACKAGE = 'ipfs2foc'
export const CLI_REPO_URL = 'https://github.com/FilOzone/ipfs2foc'

/**
 * The same migration written for a person to follow rather than an agent. The
 * runbook at RUNBOOK_PATH is the agent's copy; this is the one to hand someone
 * who would rather read the steps and run them. Deep-links to the command-line
 * walkthrough rather than the guide's landing page, which is conceptual.
 */
export const DOCS_GUIDE_URL =
  'https://docs.filecoin.io/build-on-filecoin/cookbook/filecoin-pin/migrate-ipfs-pins/command-line'

/**
 * Do not pin the install to an exact version here. The repo runs ahead of npm
 * (0.6.0 in tree while 0.4.0 was the published latest), so a pin to the tree
 * version resolves to nothing and the very first command an agent runs fails
 * with ETARGET. Installing latest is both correct and safe.
 *
 * The `upload` command this runbook is built on ships in the release cut from
 * FilOzone/ipfs2foc#71. GATE: do not merge/deploy this page until npm serves
 * a version >= this constant (`npm view ipfs2foc version`).
 */
export const CLI_VERIFIED_FROM = '0.9.0'

/** Warm storage list price, per copy. Two copies are stored by default. */
export const USD_PER_TIB_MONTH_PER_COPY = 2.5
export const COPIES = 2

/**
 * Flat fee per data set per month, charged alongside the size-based rate. It
 * does NOT scale with stored size: a data set's monthly rate is
 * `size_TiB * USD_PER_TIB_MONTH_PER_COPY + USD_FLAT_PER_DATA_SET_MONTH`.
 * Verified against live mainnet rail 2286, which stores 1.511356 TiB and pays
 * 3.8023902 USDFC/month, matching that formula to five decimal places.
 */
export const USD_FLAT_PER_DATA_SET_MONTH = 0.024

/** Held per data set, and one data set is created per copy. Unused portion returns. */
export const USD_LIFECYCLE_RESERVE_PER_DATA_SET = 0.1

/** A billing month is a 30-day period, matching how storage is charged. */
export const DAYS_PER_MONTH = 30

/**
 * Days of charges held in reserve while data is stored. Set aside rather than
 * spent, and returned when the data set is closed.
 */
export const BUFFER_DAYS = 30

/**
 * The executable runbook, at its own markdown URL. Named for what it is: a
 * procedure an agent follows, not a documentation index.
 */
export const RUNBOOK_PATH = '/ipfs2filecoin/migrate.md'
export const RUNBOOK_URL = `${BASE_URL}${RUNBOOK_PATH}`

/** The one line a user hands to a coding agent. Copying it is signal, so it is tracked. */
export const AGENT_PROMPT = `Migrate my IPFS data to Filecoin: read ${RUNBOOK_URL} and follow it.`

/**
 * The same instruction with the user's own list inlined, so a checked list is
 * something you can act on rather than just a count. Falls back to the bare
 * prompt when there is no list yet, or when the list is too long to belong
 * in a clipboard prompt; the runbook covers getting a list from the pinning
 * service.
 */
export function buildAgentPrompt(cids?: ReadonlyArray<string>): string {
  if (!cids || cids.length === 0) {
    return AGENT_PROMPT
  }

  // Past the cap the list moves to a file, so the prompt has to name the file.
  // The bare prompt would hand the largest lists, the ones most likely to
  // stall an agent, no input at all, and would make the verdict's "reads your
  // list from a file" untrue.
  if (cids.length > PROMPT_INLINE_CAP) {
    return `Migrate my IPFS data to Filecoin: read ${RUNBOOK_URL} and follow it. My CIDs are in cids.txt in the folder you are running from.`
  }

  return `Migrate my IPFS data to Filecoin: read ${RUNBOOK_URL} and follow it. My CIDs are:\n${cids.join('\n')}`
}

export const PLAUSIBLE_EVENTS = {
  cidListChecked: 'IPFS2Filecoin CID List Checked',
  estimateViewed: 'IPFS2Filecoin Estimate Viewed',
  promptCopied: 'IPFS2Filecoin Agent Prompt Copied',
} as const
