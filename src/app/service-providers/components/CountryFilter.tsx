import { CheckboxesContainer } from './CheckboxesContainer'
import { CheckboxWithLabel } from './CheckboxWithLabel'
import { FiltersSectionHeading } from './FiltersSectionHeading'
import { useFilterQueryState } from '../hooks/useFilterQueryState'

type CountryFilterProps = {
  options: Array<string>
}

export function CountryFilter({ options: countryOptions }: CountryFilterProps) {
  const { filterQueries, toggleFilterQuery } = useFilterQueryState()

  return (
    <div>
      <FiltersSectionHeading>Country</FiltersSectionHeading>
      <CheckboxesContainer>
        {countryOptions.map((option) => (
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
