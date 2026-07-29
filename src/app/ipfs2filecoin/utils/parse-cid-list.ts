/**
 * CIDv0 (base58btc, `Qm…`) and CIDv1 (base32, `b…`). Deliberately narrow: this
 * check runs in the browser with no network access, so it only tells you
 * whether a line could be a CID, not whether the content is retrievable.
 */
const CID_PATTERN = /^(Qm[1-9A-HJ-NP-Za-km-z]{44}|b[a-z2-7]{58,})$/

const GATEWAY_PREFIX_PATTERN = /^(?:ipfs:\/\/|https?:\/\/[^/]+\/ipfs\/)/

export type CidListSummary = {
  totalLines: number
  uniqueCids: Array<string>
  duplicateCount: number
  invalidCount: number
}

function normalizeLine(line: string) {
  return line
    .trim()
    .replace(/[,;]$/, '')
    .replace(GATEWAY_PREFIX_PATTERN, '')
    .split(/[?#/]/)[0]
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
