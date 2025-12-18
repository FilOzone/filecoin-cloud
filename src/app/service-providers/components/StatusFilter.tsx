import { Fieldset } from '@headlessui/react'

import { CheckboxesContainer } from '@/components/CheckboxesContainer'
import { CheckboxWithLabel } from '@/components/CheckboxWithLabel'
import { FilterHeading } from '@/components/FilterHeading'

import { useFilterQueryState } from '../hooks/useFilterQueryState'

type StatusFilterProps = {
  options: Array<string>
}

export function StatusFilter({ options }: StatusFilterProps) {
  const { filterQueries, toggleFilterQuery } = useFilterQueryState()

  return (
    <Fieldset>
      <FilterHeading>Status</FilterHeading>
      <CheckboxesContainer>
        {options.map((option) => (
          <CheckboxWithLabel
            key={option}
            checked={filterQueries.status.includes(option)}
            onChange={() => toggleFilterQuery('status', option)}
            label={option}
          />
        ))}
      </CheckboxesContainer>
    </Fieldset>
  )
}
