import { useCallback } from 'react'

import { FiltersSectionHeading } from './FiltersSectionHeading'
import { InputsContainer } from './InputsContainer'
import { NumberInputWithLabel } from './NumberInputWithLabel'
import { useFilterQueryState } from '../hooks/useFilterQueryState'
import { parseNumericInput } from '../utils/parse-numeric-input'

type CapacityFilterProps = {
  capacityMin: number
  capacityMax: number
}

export function CapacityFilter({
  capacityMin,
  capacityMax,
}: CapacityFilterProps) {
  const { filterQueries, setFilterQueries } = useFilterQueryState()

  const updateCapacityMin = useCallback(
    (value: string) => {
      const updated = parseNumericInput(value)
      setFilterQueries({ ...filterQueries, capacityMin: updated })
    },
    [filterQueries, setFilterQueries],
  )

  const updateCapacityMax = useCallback(
    (value: string) => {
      const updated = parseNumericInput(value)
      setFilterQueries({ ...filterQueries, capacityMax: updated })
    },
    [filterQueries, setFilterQueries],
  )

  return (
    <div>
      <FiltersSectionHeading>Capacity (TiB)</FiltersSectionHeading>
      <InputsContainer>
        <NumberInputWithLabel
          label="Minimum capacity"
          placeholder={`Min (${capacityMin.toLocaleString()})`}
          value={filterQueries.capacityMin?.toString() ?? ''}
          onChange={updateCapacityMin}
          min={capacityMin}
          max={capacityMax}
        />
        <NumberInputWithLabel
          label="Maximum capacity"
          placeholder={`Max (${capacityMax.toLocaleString()})`}
          value={filterQueries.capacityMax?.toString() ?? ''}
          onChange={updateCapacityMax}
          min={capacityMin}
          max={capacityMax}
        />
      </InputsContainer>
    </div>
  )
}
