import { Fieldset } from '@headlessui/react'

import { CheckboxesContainer } from '@/components/CheckboxesContainer'
import { CheckboxWithLabel } from '@/components/CheckboxWithLabel'
import { FilterHeading } from '@/components/FilterHeading'

import { useFilterQueryState } from '../hooks/use-filter-query-state'

type IpniFilterProps = {
  options: Array<string>
}

export function IpniFilter({ options }: IpniFilterProps) {
  const { filterQueries, toggleFilterQuery } = useFilterQueryState()

  return (
    <Fieldset>
      <FilterHeading>IPNI</FilterHeading>
      <CheckboxesContainer>
        {options.map((option) => (
          <CheckboxWithLabel
            key={option}
            checked={filterQueries.ipni.includes(option)}
            onChange={() => toggleFilterQuery('ipni', option)}
            label={option}
          />
        ))}
      </CheckboxesContainer>
    </Fieldset>
  )
}
