'use client'

import { Button } from '@filecoin-foundation/ui-filecoin/Button'
import { Description, Field, Label, Textarea } from '@headlessui/react'
import { usePlausible } from 'next-plausible'
import { useEffect, useMemo, useRef, useState } from 'react'

import { CidListVerdict, getVerdict, type Verdict } from './CidListVerdict'
import {
  BROWSER_CHECK_ITEM_CAP,
  MAX_ITEM_SIZE_LABEL,
  PLAUSIBLE_EVENTS,
} from '../constants/migration'
import { parseCidList } from '../utils/parse-cid-list'
import { pluralize } from '../utils/pluralize'

/**
 * One line, not three. Three full CIDs fill the field edge to edge and read as
 * a list already pasted; a single dim example reads as the prompt it is. The
 * field keeps its height from `min-h`, so it still invites a list.
 */
const PLACEHOLDER =
  'bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi'

/** The free-check facts, broken out so they scan as features rather than fine print. */
const CHECK_FACTS = [
  'Free, no wallet required',
  `Up to ${BROWSER_CHECK_ITEM_CAP.toLocaleString()} items`,
  `${MAX_ITEM_SIZE_LABEL} per item`,
  'Runs in your browser',
  'Never sent anywhere',
]

/**
 * The submit shortcut accepts Cmd or Ctrl, so the chip has to name whichever
 * one this visitor actually has. Resolved after mount rather than rendered on
 * the server, which has no way to know: `null` until then keeps the first
 * client render identical to the server's and avoids a hydration mismatch.
 */
function useShortcutLabel() {
  const [label, setLabel] = useState<string | null>(null)

  useEffect(() => {
    const isApple = /mac|iphone|ipad|ipod/i.test(
      navigator.platform || navigator.userAgent,
    )
    setLabel(isApple ? '⌘ ↵' : 'Ctrl ↵')
  }, [])

  return label
}

/**
 * What the parser makes of the list as it is typed, so the button confirms a
 * result the user can already see rather than being the first sign of one.
 */
function describeProgress(
  totalLines: number,
  recognizedCount: number,
): string | null {
  if (totalLines === 0) {
    return null
  }
  if (recognizedCount === 0) {
    return 'No CIDs recognized yet'
  }
  if (recognizedCount === totalLines) {
    return `${recognizedCount.toLocaleString()} ${pluralize(recognizedCount, 'CID')}`
  }

  return `${recognizedCount.toLocaleString()} of ${totalLines.toLocaleString()} lines are CIDs`
}

export function CidListChecker() {
  const plausible = usePlausible()
  const [value, setValue] = useState('')
  const [verdict, setVerdict] = useState<Verdict | null>(null)
  const verdictRef = useRef<HTMLDivElement>(null)

  const shortcutLabel = useShortcutLabel()
  const summary = useMemo(() => parseCidList(value), [value])
  const hasInput = value.trim().length > 0
  const progress = describeProgress(
    summary.totalLines,
    summary.uniqueCids.length,
  )

  /**
   * The panel lands below the fold on a laptop, so a check would otherwise look
   * like it did nothing. Aligning its bottom edge reveals the whole result while
   * leaving the list itself in view, which `nearest` does not: for an element
   * taller than the gap below it, the minimum scroll is barely any scroll.
   */
  useEffect(() => {
    if (verdict) {
      verdictRef.current?.scrollIntoView({
        block: 'end',
        behavior: 'smooth',
      })
    }
  }, [verdict])

  function handleCheck() {
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
        {/*
          One enclosed surface rather than a label, a field and an action loose
          on the page: the border is what says "this is the thing you use". The
          header and footer bars carry the supporting text, so the input itself
          stays uninterrupted.
        */}
        <div className="overflow-hidden rounded-xl border border-(--color-border-muted) bg-(--color-card-background) transition-colors has-[textarea:focus]:border-brand-600 has-[textarea:focus]:ring-1 has-[textarea:focus]:ring-brand-600">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-4 pt-3">
            <Label className="font-medium text-(--color-text-base) text-sm">
              Paste the CIDs you want to move
            </Label>
            {progress && (
              <span
                aria-live="polite"
                className="text-(--color-paragraph-text) text-xs tabular-nums"
              >
                {progress}
              </span>
            )}
          </div>

          {/*
            One entry per visual row: soft wrapping would render a long gateway
            URL as two rows and contradict the line count in the header, so long
            lines scroll sideways instead, the way a code editor holds them.
          */}
          <Textarea
            value={value}
            spellCheck={false}
            wrap="off"
            placeholder={PLACEHOLDER}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
                handleCheck()
              }
            }}
            className="mt-2 block max-h-64 min-h-16 w-full resize-none overflow-auto whitespace-pre field-sizing-content border-0 bg-transparent px-4 pb-3 font-mono text-(--color-text-base) text-sm/relaxed placeholder:text-(--color-paragraph-text-subtle) focus:outline-none"
          />

          <div className="flex flex-col items-stretch gap-3 border-(--color-border-muted) border-t px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-x-4">
            <Description className="text-(--color-paragraph-text) text-xs">
              One per line. Gateway URLs are fine, the prefix is stripped.
            </Description>
            <Button
              type="button"
              variant="primary"
              size="compact"
              onClick={handleCheck}
              disabled={!hasInput}
              className="w-full sm:w-auto"
            >
              Check my list
              {/* Pointer-only: a shortcut is noise without a modifier key. */}
              {shortcutLabel && (
                <kbd className="ml-2 hidden rounded border border-(--color-border-base) px-1 py-px font-sans text-(--color-paragraph-text) text-xs/none sm:inline">
                  {shortcutLabel}
                </kbd>
              )}
            </Button>
          </div>
        </div>
      </Field>

      {/* Directly under the control that produced it: the reassurance below is
          what you read before deciding, not between a question and its answer. */}
      {verdict && (
        <div ref={verdictRef} className="mt-3 scroll-mb-6">
          <CidListVerdict verdict={verdict} />
        </div>
      )}

      <ul className="mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-(--color-paragraph-text) text-xs">
        {CHECK_FACTS.map((fact) => (
          <li
            key={fact}
            className="flex items-center gap-2 before:text-(--color-border-base) before:content-['•'] first:before:hidden"
          >
            {fact}
          </li>
        ))}
      </ul>
    </div>
  )
}
