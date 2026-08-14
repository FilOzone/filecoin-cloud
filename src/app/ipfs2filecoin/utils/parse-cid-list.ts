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

export function parseCidList(input: string): CidListSummary {
  const lines = input
    .split('\n')
    .map(normalizeLine)
    .filter((line) => line && !line.startsWith('#'))

  const valid = lines.filter((line) => CID_PATTERN.test(line))
  const uniqueCids = [...new Set(valid)]

  return {
    totalLines: lines.length,
    uniqueCids,
    duplicateCount: valid.length - uniqueCids.length,
    invalidCount: lines.length - valid.length,
  }
}
