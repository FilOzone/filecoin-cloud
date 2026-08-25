type ComparisonTableProps = {
  caption?: string
  columnLabels: [dimension: string, first: string, second: string]
  rows: ReadonlyArray<{
    dimension: string
    first: string
    second: string
  }>
}

export function ComparisonTable({
  caption,
  columnLabels,
  rows,
}: ComparisonTableProps) {
  const [dimensionLabel, firstLabel, secondLabel] = columnLabels

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-(--color-border-muted)">
      <table className="w-full min-w-[640px] border-collapse text-left">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr className="border-b border-(--color-border-muted)">
            <th className="p-5 font-medium text-(--color-paragraph-text)">
              {dimensionLabel}
            </th>
            <th className="p-5 font-medium text-(--color-paragraph-text)">
              {firstLabel}
            </th>
            <th className="p-5 font-medium text-(--color-paragraph-text)">
              {secondLabel}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.dimension}
              className="border-b border-(--color-border-muted) last:border-b-0"
            >
              <th
                scope="row"
                className="p-5 align-top font-medium text-(--color-paragraph-text)"
              >
                {row.dimension}
              </th>
              <td className="p-5 align-top text-(--color-paragraph-text)">
                {row.first}
              </td>
              <td className="p-5 align-top text-(--color-paragraph-text)">
                {row.second}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
