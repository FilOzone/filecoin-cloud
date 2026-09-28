import { clsx } from 'clsx'

import { pricingComparison } from '../data/pricing-comparison'

export function ComparisonTable() {
  return (
    <>
      <MobileComparisonCards />
      <DesktopComparisonTable />
    </>
  )
}

/**
 * The three columns do not fit a phone, and the egress value is a full sentence
 * rather than a figure, so the table would clip it and scroll sideways. Each
 * provider becomes a stacked card instead: the name and tier on top, then the
 * two figures as labelled rows, so nothing is hidden. The table returns at md,
 * where the columns have room.
 */
function MobileComparisonCards() {
  return (
    <ul className="space-y-3 md:hidden">
      {pricingComparison.map(
        ({ service, detail, storagePerTbMonth, egress, highlighted }) => (
          <li
            key={`${service} ${detail}`}
            className={clsx(
              'rounded-xl border border-(--color-border-muted) p-4',
              highlighted
                ? 'bg-(--color-surface-accent)'
                : 'bg-(--color-card-background)',
            )}
          >
            <div
              className={clsx(
                highlighted && 'font-semibold text-(--color-text-base)',
              )}
            >
              <p className="text-lg">{service}</p>
              <p className="mt-0.5 font-normal text-(--color-paragraph-text) text-sm">
                {detail}
              </p>
            </div>
            <dl className="mt-3 space-y-2 border-(--color-border-muted) border-t pt-3 text-sm text-(--color-paragraph-text)">
              <div className="flex items-baseline justify-between gap-4">
                <dt>Storage, per TB per month</dt>
                <dd className="shrink-0 tabular-nums">{storagePerTbMonth}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt>Egress</dt>
                <dd className="text-right">{egress}</dd>
              </div>
            </dl>
          </li>
        ),
      )}
    </ul>
  )
}

function DesktopComparisonTable() {
  return (
    <div className="hidden overflow-x-auto rounded-xl border border-(--color-border-muted) bg-(--color-card-background) md:block">
      <table className="w-full min-w-140 text-left text-base">
        <thead>
          {/*
            `surface-muted` is the local subtle-surface token, one step off the
            card the table sits on in every section variant. Not
            `card-background-hover`, which collapses to white inside a `gray`
            section and painted the header lighter than the rows below it.
          */}
          <tr className="border-(--color-border-muted) border-b bg-(--color-surface-muted) text-(--color-paragraph-text) text-sm">
            <th scope="col" className="px-5 py-4 font-medium">
              Where the data lives
            </th>
            <th scope="col" className="px-5 py-4 font-medium">
              Storage, per TB per month
            </th>
            <th scope="col" className="px-5 py-4 font-medium">
              Egress
            </th>
          </tr>
        </thead>
        <tbody className="text-(--color-paragraph-text)">
          {pricingComparison.map(
            ({ service, detail, storagePerTbMonth, egress, highlighted }) => (
              // Weight, colour and fill sit on the row so the highlighted line
              // reads as one emphasised entry rather than two bold cells and a
              // third that quietly drops back to the body colour. The fill is
              // the brand tint rather than `surface-muted`: sharing the header's
              // tint would merge the two, since the highlighted row is the first
              // one under it.
              <tr
                key={`${service} ${detail}`}
                className={clsx(
                  'border-(--color-border-muted) border-b last:border-b-0',
                  highlighted &&
                    'bg-(--color-surface-accent) font-semibold text-(--color-text-base)',
                )}
              >
                {/*
                  Service names carry the same typeface as the figures on purpose.
                  They were previously monospace, which read as a size jump and
                  made the names look smaller than the numbers beside them.
                */}
                <th
                  scope="row"
                  className={clsx('px-5 py-4', !highlighted && 'font-normal')}
                >
                  <span className="block text-lg">{service}</span>
                  <span className="mt-0.5 block font-normal text-(--color-paragraph-text) text-sm">
                    {detail}
                  </span>
                </th>
                <td
                  className={clsx(
                    'whitespace-nowrap px-5 py-4 tabular-nums',
                    highlighted && 'text-lg',
                  )}
                >
                  {storagePerTbMonth}
                </td>
                <td className="whitespace-nowrap px-5 py-4 tabular-nums">
                  {egress}
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  )
}
