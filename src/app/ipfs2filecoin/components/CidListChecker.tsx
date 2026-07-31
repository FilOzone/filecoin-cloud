'use client'

import { Button } from '@filecoin-foundation/ui-filecoin/Button'
import { SmartTextLink } from '@filecoin-foundation/ui-filecoin/TextLink/SmartTextLink'
import { Field, Label, Textarea } from '@headlessui/react'
import { usePlausible } from 'next-plausible'
import { useId, useState } from 'react'

import { PATHS } from '@/constants/paths'

import { AgentPrompt } from './AgentPrompt'
import {
  BROWSER_CHECK_ITEM_CAP,
  MAX_ITEM_SIZE_LABEL,
  PLAUSIBLE_EVENTS,
} from '../constants/migration'
import { type CidListSummary, parseCidList } from '../utils/parse-cid-list'

const PLACEHOLDER = [
  'bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi',
  'bafkreieq5jui4j25lacwomsqgjeswwl3y5zcdrresptwgmfylxo2depppq',
  'QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG',
].join('\n')

/** The free-check facts, broken out so they scan as features rather than fine print. */
const CHECK_FACTS = [
  'Free, no wallet',
  `Up to ${BROWSER_CHECK_ITEM_CAP.toLocaleString()} items`,
  `${MAX_ITEM_SIZE_LABEL} per item`,
  'Runs in your browser',
  'Your list is never sent anywhere',
]

type Verdict =
  | { kind: 'empty' }
  | { kind: 'unreadable'; summary: CidListSummary }
  | { kind: 'ok'; summary: CidListSummary }
  | { kind: 'over-cap'; summary: CidListSummary }

function getVerdict(summary: CidListSummary): Verdict {
  if (summary.totalLines === 0) {
    return { kind: 'empty' }
  }
  if (summary.uniqueCids.length === 0) {
    return { kind: 'unreadable', summary }
  }
  if (summary.uniqueCids.length > BROWSER_CHECK_ITEM_CAP) {
    return { kind: 'over-cap', summary }
  }
  return { kind: 'ok', summary }
}

function pluralize(count: number, singular: string, plural = `${singular}s`) {
  return count === 1 ? singular : plural
}

function buildNotes({ invalidCount, duplicateCount }: CidListSummary) {
  const notes: Array<string> = []

  if (invalidCount > 0) {
    notes.push(
      `${invalidCount} ${pluralize(invalidCount, 'line')} could not be read as a CID and will be skipped`,
    )
  }
  if (duplicateCount > 0) {
    notes.push(
      `${duplicateCount} ${pluralize(duplicateCount, 'duplicate')} removed`,
    )
  }

  return notes.length > 0 ? `${notes.join('. ')}.` : null
}

export function CidListChecker() {
  const inputId = useId()
  const plausible = usePlausible()
  const [value, setValue] = useState('')
  const [verdict, setVerdict] = useState<Verdict | null>(null)

  function handleCheck() {
    const summary = parseCidList(value)
    const next = getVerdict(summary)
    setVerdict(next)

    if (next.kind === 'empty') {
      return
    }

    plausible(PLAUSIBLE_EVENTS.cidListChecked, {
      props: {
        outcome: next.kind,
        cidCount: summary.uniqueCids.length,
      },
    })
  }

  return (
    <div className="mx-auto w-full max-w-2xl text-left">
      <Field>
        <Label
          htmlFor={inputId}
          className="mb-2 flex flex-wrap items-baseline gap-x-2 text-(--color-paragraph-text) text-sm"
        >
          Paste the CIDs you want to move
          <span className="font-medium text-brand-500">one per line</span>
        </Label>
        <Textarea
          id={inputId}
          value={value}
          spellCheck={false}
          rows={4}
          placeholder={PLACEHOLDER}
          onChange={(event) => setValue(event.target.value)}
          className="focus:brand-outline block min-h-24 w-full resize-y rounded-lg border border-(--input-border-color) p-3 font-mono text-(--color-text-base) text-sm placeholder:text-(--input-placeholder-color)"
        />
      </Field>

      <div className="mt-3 flex justify-center">
        <Button type="button" variant="primary" onClick={handleCheck}>
          Check my list
        </Button>
      </div>

      {verdict && (
        <div
          role="status"
          aria-live="polite"
          className="mt-4 rounded-lg border border-(--color-border-muted) bg-(--color-card-background) p-4 text-(--color-paragraph-text) text-sm"
        >
          <VerdictMessage verdict={verdict} />
        </div>
      )}

      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-(--color-paragraph-text) text-sm">
        {CHECK_FACTS.map((fact) => (
          <li key={fact}>{fact}</li>
        ))}
      </ul>

      <p className="mt-2 text-(--color-paragraph-text) text-sm/relaxed">
        Past that,{' '}
        <SmartTextLink href={`${PATHS.IPFS_TO_FILECOIN.path}#agent`}>
          hand the migration to your agent
        </SmartTextLink>
        .
      </p>
    </div>
  )
}

/** Offers the cleaned, deduped list as the cids.txt the runbook expects. */
function DownloadCidsLink({ cids }: { cids: ReadonlyArray<string> }) {
  const href = `data:text/plain;charset=utf-8,${encodeURIComponent(`${cids.join('\n')}\n`)}`

  return (
    <a
      href={href}
      download="cids.txt"
      className="text-link focus-visible:brand-outline"
    >
      Download cids.txt
    </a>
  )
}

function VerdictMessage({ verdict }: { verdict: Verdict }) {
  if (verdict.kind === 'empty') {
    return (
      <p>
        <strong className="font-medium text-(--color-text-base)">
          Nothing to check yet.
        </strong>{' '}
        Paste one CID per line.
      </p>
    )
  }

  const { summary } = verdict
  const notes = buildNotes(summary)
  const count = summary.uniqueCids.length

  if (verdict.kind === 'unreadable') {
    return (
      <p>
        <strong className="font-medium text-(--color-text-base)">
          None of these look like CIDs.
        </strong>{' '}
        {summary.totalLines} {pluralize(summary.totalLines, 'line')} could not
        be read as a CID. Check for extra text, URLs, or commas.
      </p>
    )
  }

  if (verdict.kind === 'over-cap') {
    return (
      <div className="space-y-3">
        <p>
          <strong className="font-medium text-(--color-text-base)">
            {count.toLocaleString()} CIDs is more than a browser check handles.
          </strong>{' '}
          The limit here is {BROWSER_CHECK_ITEM_CAP.toLocaleString()} items.
          Hand the list to your agent instead: no cap, and it resumes if it
          stops. {notes}
        </p>
        <DownloadCidsLink cids={summary.uniqueCids} />
        <AgentPrompt source="verdict" />
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <p>
        <strong className="font-medium text-(--color-text-base)">
          {count.toLocaleString()} {pluralize(count, 'CID')} ready.
        </strong>{' '}
        Give this line to your agent and it will fetch each one, measure it, and
        migrate it. {notes}
      </p>
      <AgentPrompt source="verdict" cids={summary.uniqueCids} />
      <p>
        <DownloadCidsLink cids={summary.uniqueCids} />
      </p>
      <p className="text-(--color-paragraph-text-subtle)">
        A check reads the CIDs themselves, not the data behind them, so it
        cannot tell how many bytes you are holding. Enter that in the estimator
        below to price it.
      </p>
    </div>
  )
}
