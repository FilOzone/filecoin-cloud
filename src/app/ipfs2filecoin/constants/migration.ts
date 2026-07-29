import { BASE_URL } from '@/constants/site-metadata'

/**
 * Caps for the browser-based check. Larger inputs are steered to the CLI or to
 * the contact form, because they need capacity agreed with providers up front.
 */
export const BROWSER_CHECK_ITEM_CAP = 500
export const MAX_ITEM_SIZE_LABEL = '1 GiB'
export const SELF_SERVE_VOLUME_CAP_LABEL = '500 GiB'

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

export const LLMS_TXT_PATH = '/ipfs2filecoin/llms.txt'
export const LLMS_TXT_URL = `${BASE_URL}${LLMS_TXT_PATH}`

/** The one line a user hands to a coding agent. Copying it is signal, so it is tracked. */
export const AGENT_PROMPT = `Migrate my IPFS data to Filecoin: read ${LLMS_TXT_URL} and follow it. My CIDs are in cids.txt.`

export const PLAUSIBLE_EVENTS = {
  cidListChecked: 'IPFS2Filecoin CID List Checked',
  estimateViewed: 'IPFS2Filecoin Estimate Viewed',
  promptCopied: 'IPFS2Filecoin Agent Prompt Copied',
} as const
