import { Fieldset } from '@headlessui/react'

import { ErrorMessage } from './ErrorMessage'
import { FilterHeading } from './FilterHeading'
import { InputsContainer } from './InputsContainer'
import { NumberInputWithLabel } from './NumberInputWithLabel'
import { useFilterQueryState } from '../hooks/useFilterQueryState'
import { isMinAboveMax } from '../utils/is-min-above-max'

type CapacityFilterProps = {
  capacityMin: number
  capacityMax: number
}

export function CapacityFilter({
  capacityMin,
  capacityMax,
}: CapacityFilterProps) {
  const { filterQueries, updateNumberQuery } = useFilterQueryState()

  const minAboveMax = isMinAboveMax(
    filterQueries.capacityMin,
    filterQueries.capacityMax,
  )

  return (
    <Fieldset>
      <FilterHeading>Capacity (TiB)</FilterHeading>
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
      {minAboveMax && (
        <ErrorMessage message="Minimum period must be less than or equal to maximum" />
      )}
    </Fieldset>
  )
}
