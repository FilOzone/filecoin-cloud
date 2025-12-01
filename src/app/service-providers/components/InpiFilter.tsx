import { useCallback } from 'react'

import { CheckboxContainer } from './CheckboxContainer'
import { CheckboxWithLabel } from './CheckboxWithLabel'
import { FiltersSectionHeading } from './FiltersSectionHeading'
import { useFilterQueryState } from '../hooks/useFilterQueryState'
import { toggleValueInArray } from '../utils/toggle-value-in-array'

type InpiFilterProps = {
  ipniOptions: Array<string>
}

export function InpiFilter({ ipniOptions }: InpiFilterProps) {
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
      <CheckboxContainer>
        {ipniOptions.map((option) => (
          <CheckboxWithLabel
            key={option}
            checked={filterQueries.ipni.includes(option)}
            onChange={() => toggleIpni(option)}
            label={option}
          />
        ))}
      </CheckboxContainer>
    </div>
  )
}
