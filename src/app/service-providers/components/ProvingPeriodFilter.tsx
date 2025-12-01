import { useCallback } from 'react'

import { FiltersSectionHeading } from './FiltersSectionHeading'
import { InputContainer } from './InputContainer'
import { NumberInput } from './NumberInput'
import { useFilterQueryState } from '../hooks/useFilterQueryState'
import { parseNumericInput } from '../utils/parse-numeric-input'

type ProvingPeriodFilterProps = {
  provingPeriodMin: number
  provingPeriodMax: number
}

export function ProvingPeriodFilter({
  provingPeriodMin,
  provingPeriodMax,
}: ProvingPeriodFilterProps) {
  const { filterQueries, setFilterQueries } = useFilterQueryState()

  const updateProvingPeriodMin = useCallback(
    (value: string) => {
      const updated = parseNumericInput(value)
      setFilterQueries({ ...filterQueries, provingPeriodMin: updated })
    },
    [filterQueries, setFilterQueries],
  )

  const updateProvingPeriodMax = useCallback(
    (value: string) => {
      const updated = parseNumericInput(value)
      setFilterQueries({ ...filterQueries, provingPeriodMax: updated })
    },
    [filterQueries, setFilterQueries],
  )

  return (
    <div>
      <FiltersSectionHeading>Proving Period (Epochs)</FiltersSectionHeading>
      <InputContainer>
        <NumberInput
          label="Minimum period"
          placeholder={`Min (${provingPeriodMin.toLocaleString()})`}
          value={filterQueries.provingPeriodMin?.toString() ?? ''}
          onChange={updateProvingPeriodMin}
          min={provingPeriodMin}
          max={provingPeriodMax}
        />
        <NumberInput
          label="Maximum period"
          placeholder={`Max (${provingPeriodMax.toLocaleString()})`}
          value={filterQueries.provingPeriodMax?.toString() ?? ''}
          onChange={updateProvingPeriodMax}
          min={provingPeriodMin}
          max={provingPeriodMax}
        />
      </InputContainer>
    </div>
  )
}
