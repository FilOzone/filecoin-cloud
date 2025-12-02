import { CheckboxesContainer } from './CheckboxesContainer'
import { CheckboxWithLabel } from './CheckboxWithLabel'
import { FilterHeading } from './FilterHeading'
import { useFilterQueryState } from '../hooks/useFilterQueryState'

type InpiFilterProps = {
  options: Array<string>
}

export function InpiFilter({ options }: InpiFilterProps) {
  const { filterQueries, toggleFilterQuery } = useFilterQueryState()

  return (
    <div>
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
    </div>
  )
}
