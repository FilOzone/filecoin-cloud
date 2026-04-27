import { Fieldset } from '@headlessui/react'

import { CheckboxesContainer } from '@/components/CheckboxesContainer'
import { CheckboxWithLabel } from '@/components/CheckboxWithLabel'
import { FilterHeading } from '@/components/FilterHeading'

import { useFilterQueryState } from '../hooks/use-filter-query-state'

const REACHABLE_FILTER_OPTIONS = [
  { value: 'true', label: 'Accessible' },
  { value: 'false', label: 'Unavailable' },
] as const

export function ReachableFilter() {
  const { filterQueries, toggleFilterQuery } = useFilterQueryState()

  return (
    <Fieldset>
      <FilterHeading>Node Accessibility</FilterHeading>
      <CheckboxesContainer>
        {REACHABLE_FILTER_OPTIONS.map((option) => (
          <CheckboxWithLabel
            key={option.value}
            checked={filterQueries.reachable.includes(option.value)}
            onChange={() => toggleFilterQuery('reachable', option.value)}
            label={option.label}
          />
        ))}
      </CheckboxesContainer>
    </Fieldset>
  )
}
