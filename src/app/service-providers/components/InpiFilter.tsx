import { useCallback } from 'react'

import { CheckboxesContainer } from './CheckboxesContainer'
import { CheckboxWithLabel } from './CheckboxWithLabel'
import { FiltersSectionHeading } from './FiltersSectionHeading'
import { useFilterQueryState } from '../hooks/useFilterQueryState'
import { toggleValueInArray } from '../utils/toggle-value-in-array'

type InpiFilterProps = {
  options: Array<string>
}

export function InpiFilter({ options }: InpiFilterProps) {
  const { filterQueries, setFilterQueries } = useFilterQueryState()

  const toggleIpni = useCallback(
    (ipni: string) => {
      const updated = toggleValueInArray(filterQueries.ipni, ipni)
      setFilterQueries({ ...filterQueries, ipni: updated })
    },
    [filterQueries, setFilterQueries],
  )

  return (
    <div>
      <FiltersSectionHeading>IPNI</FiltersSectionHeading>
      <CheckboxesContainer>
        {options.map((option) => (
          <CheckboxWithLabel
            key={option}
            checked={filterQueries.ipni.includes(option)}
            onChange={() => toggleIpni(option)}
            label={option}
          />
        ))}
      </CheckboxesContainer>
    </div>
  )
}
