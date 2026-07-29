'use client'

import { Button } from '@filecoin-foundation/ui-filecoin/Button'
import { Field, Input, Label, Select } from '@headlessui/react'
import { usePlausible } from 'next-plausible'
import { useId, useState } from 'react'

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

export function CostEstimator() {
  const volumeId = useId()
  const unitId = useId()
  const durationId = useId()
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
      <div className="grid gap-4 sm:grid-cols-3">
        <Field>
          <Label
            htmlFor={volumeId}
            className="mb-1 inline-block font-medium text-(--color-text-base) text-sm"
          >
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

        <Field>
          <Label
            htmlFor={unitId}
            className="mb-1 inline-block font-medium text-(--color-text-base) text-sm"
          >
            Unit
          </Label>
          <Select
            id={unitId}
            value={unit}
            onChange={(event) => setUnit(event.target.value as VolumeUnit)}
            className={fieldClassName}
          >
            <option value="GiB">GiB</option>
            <option value="TiB">TiB</option>
          </Select>
        </Field>

        <Field>
          <Label
            htmlFor={durationId}
            className="mb-1 inline-block font-medium text-(--color-text-base) text-sm"
          >
            Funded for
          </Label>
          <Select
            id={durationId}
            value={days}
            onChange={(event) => setDays(Number(event.target.value))}
            className={fieldClassName}
          >
            {DURATION_OPTIONS.map(({ label, days: value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </Field>
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
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-(--color-border-muted) border-b text-(--color-paragraph-text)">
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
              <td className="px-5 py-4 font-mono">{amount}</td>
              <td className="px-5 py-4">{note}</td>
            </tr>
          ))}
          <tr className="text-(--color-text-base)">
            <td className="px-5 py-4 font-medium">Deposit</td>
            <td className="px-5 py-4 font-medium font-mono text-lg">
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
