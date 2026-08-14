'use client'

import { Button } from '@filecoin-foundation/ui-filecoin/Button'
import { Icon } from '@filecoin-foundation/ui-filecoin/Icon'
import { Field, Input, Label, Select } from '@headlessui/react'
import { CaretDownIcon } from '@phosphor-icons/react/dist/ssr'
import { clsx } from 'clsx'
import { usePlausible } from 'next-plausible'
import { type ChangeEvent, type ReactNode, useId, useState } from 'react'

import {
  BUFFER_DAYS,
  COPIES,
  PLAUSIBLE_EVENTS,
  USD_FLAT_PER_DATA_SET_MONTH,
  USD_PER_TIB_MONTH_PER_COPY,
} from '../constants/migration'
import {
  type CostEstimate,
  estimateCost,
  formatUsd,
  toTebibytes,
  type VolumeUnit,
} from '../utils/estimate-cost'

const DURATION_OPTIONS = [
  { label: '6 months', days: 182 },
  { label: '1 year', days: 365 },
  { label: '2 years', days: 730 },
  { label: '3 years', days: 1095 },
]

const fieldClassName =
  'focus:brand-outline block w-full rounded-lg border border-(--input-border-color) p-3 text-(--color-text-base) placeholder:text-(--input-placeholder-color)'

const labelClassName =
  'mb-1 inline-block font-medium text-(--color-text-base) text-sm'

export function CostEstimator() {
  const volumeId = useId()
  const plausible = usePlausible()

  const [volume, setVolume] = useState('1')
  const [unit, setUnit] = useState<VolumeUnit>('TiB')
  const [days, setDays] = useState(730)
  const [estimate, setEstimate] = useState<CostEstimate | null>(null)
  const [error, setError] = useState<string | null>(null)

  function handleEstimate() {
    const parsed = Number(volume)

    if (!Number.isFinite(parsed) || parsed <= 0) {
      setEstimate(null)
      setError('Enter how much data you want to store, as a number above zero.')
      return
    }

    const tebibytes = toTebibytes(parsed, unit)
    const next = estimateCost(tebibytes, days)

    setError(null)
    setEstimate(next)

    plausible(PLAUSIBLE_EVENTS.estimateViewed, {
      props: {
        volume: `${parsed} ${unit}`,
        days,
        deposit: Math.round(next.deposit),
      },
    })
  }

  return (
    <div className="space-y-6">
      {/*
        Two controls for two questions, sharing one row inside the card. The
        amount carries its unit inside one bordered box rather than beside a
        separate field, so "How much data" reads as a single control; the "Unit"
        label goes with it, since a select holding "TiB" needs no caption. A
        two-column grid keeps the pair side by side and lets each fill its half
        rather than being sized to the few characters it holds.
      */}
      <div className="space-y-2">
        <div className="grid grid-cols-2 items-end gap-3">
          <Field>
            <Label htmlFor={volumeId} className={labelClassName}>
              How much data
            </Label>
            <div className="focus-within:brand-outline flex w-full items-stretch rounded-lg border border-(--input-border-color)">
              <Input
                id={volumeId}
                type="number"
                min="0"
                step="any"
                inputMode="decimal"
                value={volume}
                onChange={(event) => setVolume(event.target.value)}
                className="w-full min-w-0 border-0 bg-transparent p-3 text-(--color-text-base) focus:outline-none"
              />
              <div className="relative flex items-center border-(--input-border-color) border-l">
                <Select
                  aria-label="Unit"
                  value={unit}
                  onChange={(event) =>
                    setUnit(event.target.value as VolumeUnit)
                  }
                  className="appearance-none bg-transparent py-3 pr-10 pl-3 text-(--color-text-base) focus:outline-none"
                >
                  <option value="GiB">GiB</option>
                  <option value="TiB">TiB</option>
                </Select>
                <span className="pointer-events-none absolute right-0 flex items-center pr-3 text-(--color-paragraph-text)">
                  <Icon component={CaretDownIcon} size={20} />
                </span>
              </div>
            </div>
          </Field>

          <SelectField
            className="w-full"
            label="Funded for"
            value={days}
            onChange={(event) => setDays(Number(event.target.value))}
          >
            {DURATION_OPTIONS.map(({ label, days: value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </SelectField>
        </div>

        <p className="text-(--color-paragraph-text-subtle) text-sm">
          Total across everything you are storing, not per CID. 1 TiB is 1,024
          GiB.
        </p>
      </div>

      <Button
        type="button"
        variant="primary"
        onClick={handleEstimate}
        className="w-full"
      >
        Estimate my deposit
      </Button>

      {error && (
        <p role="alert" className="text-(--color-brand-error) text-sm">
          {error}
        </p>
      )}

      {estimate && <EstimateBreakdown estimate={estimate} />}

      <p className="text-(--color-paragraph-text) text-sm/relaxed">
        Based on {formatUsd(USD_PER_TIB_MONTH_PER_COPY)} per TiB per month per
        copy, plus a flat {formatUsd(USD_FLAT_PER_DATA_SET_MONTH)} per data set
        per month, across {COPIES} copies. Gas is separate, so you also need a
        small amount of FIL. A deposit funds a rate rather than a term: storing
        more data later spends the balance faster and moves your funded-until
        date earlier. The exact deposit is shown before you approve it.
      </p>
    </div>
  )
}

type SelectFieldProps = {
  label: string
  value: string | number
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void
  children: ReactNode
  /** Width of the field, set by the caller so it matches what it holds. */
  className?: string
}

/**
 * A native select styled to match the inputs beside it. The browser's own arrow
 * is replaced so the caret keeps the same inset as the field's text instead of
 * sitting hard against the border.
 */
function SelectField({
  label,
  value,
  onChange,
  children,
  className,
}: SelectFieldProps) {
  const id = useId()

  return (
    <Field className={className}>
      <Label htmlFor={id} className={labelClassName}>
        {label}
      </Label>
      <div className="relative">
        <Select
          id={id}
          value={value}
          onChange={onChange}
          className={clsx(fieldClassName, 'appearance-none pr-11')}
        >
          {children}
        </Select>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-(--color-paragraph-text)">
          <Icon component={CaretDownIcon} size={20} />
        </span>
      </div>
    </Field>
  )
}

function EstimateBreakdown({ estimate }: { estimate: CostEstimate }) {
  const durationLabel =
    DURATION_OPTIONS.find(({ days }) => days === estimate.days)?.label ??
    `${estimate.days} days`

  const rows = [
    {
      label: `Storage for ${durationLabel}`,
      amount: formatUsd(estimate.storage),
      note: 'Not refundable, this is the cost',
    },
    {
      label: `Buffer held while data is live (${BUFFER_DAYS} days of charges)`,
      amount: formatUsd(estimate.buffer),
      note: 'Refundable',
    },
    {
      label: 'Lifecycle reserve, per data set',
      amount: formatUsd(estimate.lifecycleReserve),
      note: 'Unused portion refundable',
    },
  ]

  // Stacked rather than a table: the card column is too narrow for the
  // three-column breakdown, so each line reads label over its refundable note
  // on the left and the figure on the right, the way a receipt totals up.
  return (
    <div
      role="status"
      aria-live="polite"
      className="space-y-4 rounded-xl border border-(--color-border-muted) bg-(--color-card-background) p-5"
    >
      <dl className="space-y-3 text-(--color-paragraph-text)">
        {rows.map(({ label, amount, note }) => (
          <div
            key={label}
            className="flex items-baseline justify-between gap-4"
          >
            <dt>
              <span className="block text-sm">{label}</span>
              <span className="block text-(--color-paragraph-text-subtle) text-xs">
                {note}
              </span>
            </dt>
            <dd className="shrink-0 text-sm tabular-nums">{amount}</dd>
          </div>
        ))}
        <div className="flex items-baseline justify-between gap-4 border-(--color-border-muted) border-t pt-3 text-(--color-text-base)">
          <dt className="font-medium">Deposit</dt>
          <dd className="shrink-0 font-medium text-lg tabular-nums">
            {formatUsd(estimate.deposit)}
          </dd>
        </div>
      </dl>
      <p className="text-(--color-paragraph-text) text-xs/relaxed">
        {formatUsd(estimate.refundable)} of this comes back. The buffer is set
        aside, not spent. Treat your funded-until date as the date to act by: if
        the balance runs out, providers can end the service and keep the buffer.
      </p>
    </div>
  )
}
