/**
 * CIDv0 (base58btc, `Qm…`) and CIDv1 (base32, `b…`). Deliberately narrow: this
 * check runs in the browser with no network access, so it only tells you
 * whether a line could be a CID, not whether the content is retrievable.
 */
const CID_PATTERN = /^(Qm[1-9A-HJ-NP-Za-km-z]{44}|b[a-z2-7]{58,})$/

const GATEWAY_PREFIX_PATTERN = /^(?:ipfs:\/\/|https?:\/\/[^/]+\/ipfs\/)/

/**
 * Subdomain gateways (`https://<cid>.ipfs.dweb.link/…`) carry the CID as the
 * leftmost DNS label. Only case-insensitive encodings survive DNS, so this form
 * is always a base32 CIDv1, never `Qm…` — the narrow character class is
 * deliberate, and CID_PATTERN still has the final say on the captured label.
 */
const SUBDOMAIN_GATEWAY_PATTERN = /^https?:\/\/([a-z2-7]+)\.ipfs\.[^/\s]+/

export type CidListSummary = {
  totalLines: number
  uniqueCids: Array<string>
  duplicateCount: number
  invalidCount: number
}

function normalizeLine(line: string) {
  const trimmed = line.trim().replace(/[,;]$/, '')
  const subdomain = SUBDOMAIN_GATEWAY_PATTERN.exec(trimmed)
  if (subdomain) {
    return subdomain[1]
  }
  return trimmed.replace(GATEWAY_PREFIX_PATTERN, '').split(/[?#/]/)[0]
}

/**
 * Single pass over the raw text. A pasted list can run to millions of lines,
 * so the parse never materializes an intermediate array of them: each line is
 * sliced out, normalized, and folded into the counts before the next one is
 * looked at. Peak extra memory is the unique set, not a multiple of the input.
 */
export function parseCidList(input: string): CidListSummary {
  const uniqueCids: Array<string> = []
  const seen = new Set<string>()
  let totalLines = 0
  let duplicateCount = 0
  let invalidCount = 0

  let cursor = 0
  while (cursor <= input.length) {
    let newline = input.indexOf('\n', cursor)
    if (newline === -1) {
      newline = input.length
    }
    const line = normalizeLine(input.slice(cursor, newline))
    cursor = newline + 1
    if (!line || line.startsWith('#')) {
      continue
    }
    totalLines += 1
    if (!CID_PATTERN.test(line)) {
      invalidCount += 1
    } else if (seen.has(line)) {
      duplicateCount += 1
    } else {
      seen.add(line)
      uniqueCids.push(line)
    }
  }

  return { totalLines, uniqueCids, duplicateCount, invalidCount }
}
