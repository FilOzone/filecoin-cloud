import { useCallback } from 'react'

import { CheckboxContainer } from './CheckboxContainer'
import { CheckboxWithLabel } from './CheckboxWithLabel'
import { FiltersSectionHeading } from './FiltersSectionHeading'
import { useFilterQueryState } from '../hooks/useFilterQueryState'
import { toggleValueInArray } from '../utils/toggle-value-in-array'

type CountryFilterProps = {
  options: Array<string>
}

export function CountryFilter({ options: countryOptions }: CountryFilterProps) {
  const { filterQueries, setFilterQueries } = useFilterQueryState()

  const toggleCountry = useCallback(
    (country: string) => {
      const updated = toggleValueInArray(filterQueries.country, country)
      setFilterQueries({ ...filterQueries, country: updated })
    },
    [filterQueries, setFilterQueries],
  )

  return (
    <div>
      <FiltersSectionHeading>Country</FiltersSectionHeading>
      <CheckboxContainer>
        {countryOptions.map((option) => (
          <CheckboxWithLabel
            key={option}
            checked={filterQueries.country.includes(option)}
            onChange={() => toggleCountry(option)}
            label={option}
          />
        ))}
      </CheckboxContainer>
    </div>
  )
}
