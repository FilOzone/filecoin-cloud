import { Fieldset } from '@headlessui/react'

import { CheckboxesContainer } from './CheckboxesContainer'
import { CheckboxWithLabel } from './CheckboxWithLabel'
import { FilterHeading } from './FilterHeading'
import { useFilterQueryState } from '../hooks/useFilterQueryState'

type LocationFilterProps = {
  options: Array<string>
}

export function LocationFilter({ options }: LocationFilterProps) {
  const { filterQueries, toggleFilterQuery } = useFilterQueryState()

  return (
    <Fieldset>
      <FilterHeading>Location</FilterHeading>
      <CheckboxesContainer>
        {options.map((option) => (
          <CheckboxWithLabel
            key={option}
            checked={filterQueries.location.includes(option)}
            onChange={() => toggleFilterQuery('location', option)}
            label={option}
          />
        ))}
      </CheckboxesContainer>
    </Fieldset>
  )
}
