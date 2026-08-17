'use client'

import { Icon } from '@filecoin-foundation/ui-filecoin/Icon'
import { SmartTextLink } from '@filecoin-foundation/ui-filecoin/TextLink/SmartTextLink'
import {
  CheckCircleIcon,
  InfoIcon,
  WarningCircleIcon,
} from '@phosphor-icons/react/dist/ssr'

import { PATHS } from '@/constants/paths'

import { AgentPrompt } from './AgentPrompt'
import { PROMPT_INLINE_CAP } from '../constants/migration'
import type { CidListSummary } from '../utils/parse-cid-list'
import { pluralize } from '../utils/pluralize'

export type Verdict =
  | { kind: 'empty' }
  | { kind: 'unreadable'; summary: CidListSummary }
  | { kind: 'ok'; summary: CidListSummary }

export function getVerdict(summary: CidListSummary): Verdict {
  if (summary.totalLines === 0) {
    return { kind: 'empty' }
  }
  if (summary.uniqueCids.length === 0) {
    return { kind: 'unreadable', summary }
  }
  return { kind: 'ok', summary }
}

/**
 * Tone per outcome, in tokens rather than literals so the panel survives being
 * mounted on a light section.
 */
const TONE = {
  empty: { icon: InfoIcon, className: 'text-(--color-paragraph-text)' },
  unreadable: {
    icon: WarningCircleIcon,
    className: 'text-(--color-brand-error)',
  },
  ok: { icon: CheckCircleIcon, className: 'text-(--color-icon-success)' },
} as const

/**
 * What the parser changed about the list. Kept as separate lines rather than a
 * run-on sentence, so two adjustments do not read as one.
 */
function buildAdjustments({ invalidCount, duplicateCount }: CidListSummary) {
  const adjustments: Array<string> = []

  if (invalidCount > 0) {
    adjustments.push(
      `${invalidCount} ${pluralize(invalidCount, 'line')} skipped, not readable as a CID`,
    )
  }
  if (duplicateCount > 0) {
    adjustments.push(
      `${duplicateCount} ${pluralize(duplicateCount, 'duplicate')} removed`,
    )
  }

  return adjustments
}

export function CidListVerdict({ verdict }: { verdict: Verdict }) {
  const tone = TONE[verdict.kind]

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-start gap-2.5 rounded-xl border border-(--color-border-muted) bg-(--color-card-background) p-4"
    >
      <span className={`shrink-0 ${tone.className}`}>
        <Icon component={tone.icon} size={16} />
      </span>
      <div className="-mt-0.5 min-w-0 flex-1 space-y-3 text-(--color-paragraph-text) text-sm/relaxed">
        <VerdictBody verdict={verdict} />
      </div>
    </div>
  )
}

function Headline({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-medium text-(--color-text-base) text-sm tabular-nums">
      {children}
    </p>
  )
}

function Adjustments({ summary }: { summary: CidListSummary }) {
  const adjustments = buildAdjustments(summary)

  if (adjustments.length === 0) {
    return null
  }

  return (
    <ul className="space-y-1 text-(--color-paragraph-text) text-xs">
      {adjustments.map((adjustment) => (
        <li key={adjustment} className="tabular-nums">
          {adjustment}
        </li>
      ))}
    </ul>
  )
}

/**
 * Offers the cleaned, deduped list as the cids.txt the runbook expects. Always
 * used inside a sentence that says what the file is for: on its own, the
 * filename tells you nothing about why you would want it.
 */
function DownloadCidsLink({
  cids,
  label,
}: {
  cids: ReadonlyArray<string>
  label: string
}) {
  const href = `data:text/plain;charset=utf-8,${encodeURIComponent(`${cids.join('\n')}\n`)}`

  return (
    <a
      href={href}
      download="cids.txt"
      className="text-link focus-visible:brand-outline"
    >
      {label}
    </a>
  )
}

function VerdictBody({ verdict }: { verdict: Verdict }) {
  if (verdict.kind === 'empty') {
    return (
      <>
        <Headline>Nothing to check yet</Headline>
        <p>Paste one CID per line to get started.</p>
      </>
    )
  }

  const { summary } = verdict
  const count = summary.uniqueCids.length

  if (verdict.kind === 'unreadable') {
    return (
      <>
        <Headline>None of these look like CIDs</Headline>
        <p className="tabular-nums">
          {summary.totalLines} {pluralize(summary.totalLines, 'line')} could not
          be read as a CID. Check for extra text, commas, or a URL that is not a
          gateway path.
        </p>
      </>
    )
  }

  // Past this size the copied prompt points at cids.txt rather than inlining
  // the list (see buildAgentPrompt), so the download stops being optional and
  // the copy has to say so.
  const promptReadsFromFile = count > PROMPT_INLINE_CAP

  return (
    <>
      <Headline>
        {count.toLocaleString()} {pluralize(count, 'CID')} ready to migrate
      </Headline>
      <Adjustments summary={summary} />
      <p>
        Give this line to your agent and it will fetch each one, measure it, and
        migrate it.
      </p>
      <AgentPrompt source="verdict" cids={summary.uniqueCids} />
      {promptReadsFromFile ? (
        <p className="text-(--color-paragraph-text) text-xs">
          That prompt reads your list from a file, so{' '}
          <DownloadCidsLink
            cids={summary.uniqueCids}
            label="download cids.txt"
          />{' '}
          and keep it in the folder your agent runs from.
        </p>
      ) : (
        <p className="text-(--color-paragraph-text) text-xs">
          Running the migration yourself instead?{' '}
          <DownloadCidsLink
            cids={summary.uniqueCids}
            label="Download cids.txt"
          />{' '}
          for the same list, cleaned and deduped, in the file the runbook reads.
        </p>
      )}
      <p className="text-(--color-paragraph-text) text-xs">
        A check reads the CIDs themselves, not the data behind them, so it
        cannot tell how many bytes you are holding. Enter that in{' '}
        <SmartTextLink href={`${PATHS.IPFS_TO_FILECOIN.path}#estimate`}>
          the deposit estimator
        </SmartTextLink>{' '}
        to price it.
      </p>
    </>
  )
}
