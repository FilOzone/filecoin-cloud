import { BASE_URL } from '@/constants/site-metadata'

/**
 * Cap on the in-browser check only. The agent and CLI paths have no item cap,
 * so this must never be presented as a limit on migration itself.
 */
export const BROWSER_CHECK_ITEM_CAP = 500

/** A hard limit: a larger item cannot be split without changing its CID. */
export const MAX_ITEM_SIZE_LABEL = '1 GiB'

/**
 * Above this, capacity and timing are worth agreeing with providers before a
 * run starts. A prompt to coordinate, NOT a ceiling on what can be migrated.
 */
export const COORDINATION_VOLUME_LABEL = '500 GiB'

export const CLI_PACKAGE = 'ipfs2foc'
export const CLI_REPO_URL = 'https://github.com/FilOzone/ipfs2foc'

/**
 * Do not pin the install to an exact version here. The repo runs ahead of npm
 * (0.6.0 in tree while 0.4.0 was the published latest), so a pin to the tree
 * version resolves to nothing and the very first command an agent runs fails
 * with ETARGET. Every command and flag this runbook uses is present from
 * 0.4.0 onward, so installing latest is both correct and safe.
 */
export const CLI_VERIFIED_FROM = '0.4.0'

/** Warm storage list price, per copy. Two copies are stored by default. */
export const USD_PER_TIB_MONTH_PER_COPY = 2.5
export const COPIES = 2

/** Proving buffer charged alongside storage, per TiB per month per copy. */
export const USD_PROVING_PER_TIB_MONTH_PER_COPY = 0.024

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
 * The executable runbook. Named for what it is: llms.txt is specified as a
 * documentation index, not a procedure, so the procedure lives at its own URL.
 */
export const RUNBOOK_PATH = '/ipfs2filecoin/migrate.md'
export const RUNBOOK_URL = `${BASE_URL}${RUNBOOK_PATH}`

/** Spec-conformant index for this campaign, pointing at the runbook. */
export const LLMS_TXT_PATH = '/ipfs2filecoin/llms.txt'
export const LLMS_TXT_URL = `${BASE_URL}${LLMS_TXT_PATH}`

/** The one line a user hands to a coding agent. Copying it is signal, so it is tracked. */
export const AGENT_PROMPT = `Migrate my IPFS data to Filecoin: read ${RUNBOOK_URL} and follow it. My CIDs are in cids.txt.`

export const PLAUSIBLE_EVENTS = {
  cidListChecked: 'IPFS2Filecoin CID List Checked',
  estimateViewed: 'IPFS2Filecoin Estimate Viewed',
  promptCopied: 'IPFS2Filecoin Agent Prompt Copied',
} as const
