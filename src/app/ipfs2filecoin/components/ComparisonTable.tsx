import { clsx } from 'clsx'

import { pricingComparison } from '../data/pricing-comparison'

export function ComparisonTable() {
  return (
    <div className="overflow-x-auto rounded-xl border border-(--color-border-muted)">
      <table className="w-full min-w-140 text-left text-sm">
        <thead>
          <tr className="border-(--color-border-muted) border-b text-(--color-paragraph-text)">
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
            ({ service, storagePerTbMonth, egress, highlighted }) => (
              <tr
                key={service}
                className="border-(--color-border-muted) border-b last:border-b-0"
              >
                <th
                  scope="row"
                  className={clsx(
                    'px-5 py-4 font-normal',
                    highlighted && 'font-medium text-(--color-text-base)',
                  )}
                >
                  {service}
                </th>
                <td
                  className={clsx(
                    'px-5 py-4 font-mono whitespace-nowrap',
                    highlighted && 'text-(--color-text-base) text-lg',
                  )}
                >
                  {storagePerTbMonth}
                </td>
                <td className="px-5 py-4 font-mono whitespace-nowrap">
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
