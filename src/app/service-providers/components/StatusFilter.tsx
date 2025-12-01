import { useCallback } from 'react'

import { CheckboxContainer } from './CheckboxContainer'
import { CheckboxWithLabel } from './CheckboxWithLabel'
import { FiltersSectionHeading } from './FiltersSectionHeading'
import { useFilterQueryState } from '../hooks/useFilterQueryState'
import { toggleValueInArray } from '../utils/toggle-value-in-array'

type StatusFilterProps = {
  options: Array<string>
}

export function StatusFilter({ options }: StatusFilterProps) {
  const { filterQueries, setFilterQueries } = useFilterQueryState()

  const toggleStatus = useCallback(
    (status: string) => {
      const updated = toggleValueInArray(filterQueries.status, status)
      setFilterQueries({ ...filterQueries, status: updated })
    },
    [filterQueries, setFilterQueries],
  )

  return (
    <div>
      <FiltersSectionHeading>Status</FiltersSectionHeading>
      <CheckboxContainer>
        {options.map((option) => (
          <CheckboxWithLabel
            key={option}
            checked={filterQueries.status.includes(option)}
            onChange={() => toggleStatus(option)}
            label={option}
          />
        ))}
      </CheckboxContainer>
    </div>
  )
}
