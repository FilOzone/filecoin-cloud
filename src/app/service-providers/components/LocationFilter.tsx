import { Fieldset } from '@headlessui/react'

import { CheckboxesContainer } from '@/components/CheckboxesContainer'
import { CheckboxWithLabel } from '@/components/CheckboxWithLabel'
import { FilterHeading } from '@/components/FilterHeading'

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
