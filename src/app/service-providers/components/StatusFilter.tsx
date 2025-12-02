import { CheckboxesContainer } from './CheckboxesContainer'
import { CheckboxWithLabel } from './CheckboxWithLabel'
import { FiltersSectionHeading } from './FiltersSectionHeading'
import { useFilterQueryState } from '../hooks/useFilterQueryState'

type StatusFilterProps = {
  options: Array<string>
}

export function StatusFilter({ options }: StatusFilterProps) {
  const { filterQueries, toggleFilterQuery } = useFilterQueryState()

  return (
    <div>
      <FiltersSectionHeading>Status</FiltersSectionHeading>
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
    </div>
  )
}
