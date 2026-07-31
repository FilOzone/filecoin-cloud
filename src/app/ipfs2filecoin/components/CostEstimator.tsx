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
      <div className="grid gap-4 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,2fr)]">
        <Field>
          <Label htmlFor={volumeId} className={labelClassName}>
            How much data
          </Label>
          <Input
            id={volumeId}
            type="number"
            min="0"
            step="any"
            inputMode="decimal"
            value={volume}
            onChange={(event) => setVolume(event.target.value)}
            className={fieldClassName}
          />
        </Field>

        <SelectField
          label="Unit"
          value={unit}
          onChange={(event) => setUnit(event.target.value as VolumeUnit)}
        >
          <option value="GiB">GiB</option>
          <option value="TiB">TiB</option>
        </SelectField>
        <p className="text-(--color-paragraph-text-subtle) text-sm sm:col-span-3">
          Total across everything you are storing, not per CID. 1 TiB is 1,024
          GiB.
        </p>

        <SelectField
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

      <Button type="button" variant="primary" onClick={handleEstimate}>
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
        copy plus proving, across {COPIES} copies. Gas is separate, so you also
        need a small amount of FIL. A deposit funds a rate rather than a term:
        storing more data later spends the balance faster and moves your
        funded-until date earlier. The exact deposit is shown before you approve
        it.
      </p>
    </div>
  )
}

type SelectFieldProps = {
  label: string
  value: string | number
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void
  children: ReactNode
}

/**
 * A native select styled to match the inputs beside it. The browser's own arrow
 * is replaced so the caret keeps the same inset as the field's text instead of
 * sitting hard against the border.
 */
function SelectField({ label, value, onChange, children }: SelectFieldProps) {
  const id = useId()

  return (
    <Field>
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
      label: `Storage and proving for ${durationLabel}`,
      amount: formatUsd(estimate.storage),
      note: 'No, this is the cost',
    },
    {
      label: `Buffer held while data is live (${BUFFER_DAYS} days of charges)`,
      amount: formatUsd(estimate.buffer),
      note: 'Yes, refundable',
    },
    {
      label: 'Lifecycle reserve, per data set',
      amount: formatUsd(estimate.lifecycleReserve),
      note: 'Yes, unused portion',
    },
  ]

  return (
    <div
      role="status"
      aria-live="polite"
      className="overflow-x-auto rounded-xl border border-(--color-border-muted)"
    >
      <table className="w-full text-left text-base">
        <thead>
          <tr className="border-(--color-border-muted) border-b text-(--color-paragraph-text) text-sm">
            <th scope="col" className="px-5 py-4 font-medium">
              Line
            </th>
            <th scope="col" className="px-5 py-4 font-medium">
              Amount
            </th>
            <th scope="col" className="px-5 py-4 font-medium">
              Yours again afterwards
            </th>
          </tr>
        </thead>
        <tbody className="text-(--color-paragraph-text)">
          {rows.map(({ label, amount, note }) => (
            <tr key={label} className="border-(--color-border-muted) border-b">
              <td className="px-5 py-4">{label}</td>
              <td className="px-5 py-4 tabular-nums">{amount}</td>
              <td className="px-5 py-4">{note}</td>
            </tr>
          ))}
          <tr className="text-(--color-text-base)">
            <td className="px-5 py-4 font-medium">Deposit</td>
            <td className="px-5 py-4 font-medium text-lg tabular-nums">
              {formatUsd(estimate.deposit)}
            </td>
            <td className="px-5 py-4">
              {formatUsd(estimate.refundable)} comes back
            </td>
          </tr>
        </tbody>
      </table>
      <p className="px-5 py-4 text-(--color-paragraph-text) text-xs/relaxed">
        The buffer is set aside, not spent, and you get back whatever is unused.
        Treat your funded-until date as the date to act by rather than the date
        service stops: if the balance runs out, providers can end the service
        and keep the buffer. Depositing for longer is not a discount, it just
        means fewer trips back.
      </p>
    </div>
  )
}
