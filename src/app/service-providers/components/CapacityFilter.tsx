import { FiltersSectionHeading } from './FiltersSectionHeading'
import { InputsContainer } from './InputsContainer'
import { NumberInputWithLabel } from './NumberInputWithLabel'
import { useFilterQueryState } from '../hooks/useFilterQueryState'

type CapacityFilterProps = {
  capacityMin: number
  capacityMax: number
}

export function CapacityFilter({
  capacityMin,
  capacityMax,
}: CapacityFilterProps) {
  const { filterQueries, updateNumberQuery } = useFilterQueryState()

  return (
    <div>
      <FiltersSectionHeading>Capacity (TiB)</FiltersSectionHeading>
      <InputsContainer>
        <NumberInputWithLabel
          label="Minimum capacity"
          placeholder={`Min (${capacityMin.toLocaleString()})`}
          value={filterQueries.capacityMin?.toString() ?? ''}
          onChange={(value) => updateNumberQuery('capacityMin', value)}
          min={capacityMin}
          max={capacityMax}
        />
        <NumberInputWithLabel
          label="Maximum capacity"
          placeholder={`Max (${capacityMax.toLocaleString()})`}
          value={filterQueries.capacityMax?.toString() ?? ''}
          onChange={(value) => updateNumberQuery('capacityMax', value)}
          min={capacityMin}
          max={capacityMax}
        />
      </InputsContainer>
    </div>
  )
}
