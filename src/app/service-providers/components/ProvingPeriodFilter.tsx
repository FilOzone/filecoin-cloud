import { FilterHeading } from './FilterHeading'
import { InputsContainer } from './InputsContainer'
import { NumberInputWithLabel } from './NumberInputWithLabel'
import { useFilterQueryState } from '../hooks/useFilterQueryState'

type ProvingPeriodFilterProps = {
  provingPeriodMin: number
  provingPeriodMax: number
}

export function ProvingPeriodFilter({
  provingPeriodMin,
  provingPeriodMax,
}: ProvingPeriodFilterProps) {
  const { filterQueries, updateNumberQuery } = useFilterQueryState()

  return (
    <div>
      <FilterHeading>Proving Period (Epochs)</FilterHeading>
      <InputsContainer>
        <NumberInputWithLabel
          label="Minimum period"
          placeholder={`Min (${provingPeriodMin.toLocaleString()})`}
          value={filterQueries.provingPeriodMin?.toString() ?? ''}
          onChange={(value) => updateNumberQuery('provingPeriodMin', value)}
          min={provingPeriodMin}
          max={provingPeriodMax}
        />
        <NumberInputWithLabel
          label="Maximum period"
          placeholder={`Max (${provingPeriodMax.toLocaleString()})`}
          value={filterQueries.provingPeriodMax?.toString() ?? ''}
          onChange={(value) => updateNumberQuery('provingPeriodMax', value)}
          min={provingPeriodMin}
          max={provingPeriodMax}
        />
      </InputsContainer>
    </div>
  )
}
