import { useCallback } from 'react'

import { FiltersSectionHeading } from './FiltersSectionHeading'
import { InputContainer } from './InputContainer'
import { NumberInput } from './NumberInput'
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
      <InputContainer>
        <NumberInput
          label="Minimum capacity"
          placeholder={`Min (${capacityMin.toLocaleString()})`}
          value={filterQueries.capacityMin?.toString() ?? ''}
          onChange={updateCapacityMin}
          min={capacityMin}
          max={capacityMax}
        />
        <NumberInput
          label="Maximum capacity"
          placeholder={`Max (${capacityMax.toLocaleString()})`}
          value={filterQueries.capacityMax?.toString() ?? ''}
          onChange={updateCapacityMax}
          min={capacityMin}
          max={capacityMax}
        />
      </InputContainer>
    </div>
  )
}
