import { CheckboxesContainer } from './CheckboxesContainer'
import { CheckboxWithLabel } from './CheckboxWithLabel'
import { FilterHeading } from './FilterHeading'
import { useFilterQueryState } from '../hooks/useFilterQueryState'

type CountryFilterProps = {
  options: Array<string>
}

export function CountryFilter({ options }: CountryFilterProps) {
  const { filterQueries, toggleFilterQuery } = useFilterQueryState()

  return (
    <div>
      <FilterHeading>Location</FilterHeading>
      <CheckboxesContainer>
        {options.map((option) => (
          <CheckboxWithLabel
            key={option}
            checked={filterQueries.country.includes(option)}
            onChange={() => toggleFilterQuery('country', option)}
            label={option}
          />
        ))}
      </CheckboxesContainer>
    </div>
  )
}
