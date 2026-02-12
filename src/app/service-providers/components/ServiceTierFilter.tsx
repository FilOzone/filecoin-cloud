import { Fieldset } from '@headlessui/react'

import { CheckboxesContainer } from '@/components/CheckboxesContainer'
import { CheckboxWithLabel } from '@/components/CheckboxWithLabel'
import { FilterHeading } from '@/components/FilterHeading'

import { SERVICE_TIER_LABELS, type ServiceTier } from '@/utils/service-tier'

import { useFilterQueryState } from '../hooks/use-filter-query-state'

type ServiceTierFilterProps = {
  options: Array<ServiceTier>
}

export function ServiceTierFilter({ options }: ServiceTierFilterProps) {
  const { filterQueries, toggleFilterQuery } = useFilterQueryState()

  return (
    <Fieldset>
      <FilterHeading>Service Offered</FilterHeading>
      <CheckboxesContainer>
        {options.map((tier) => (
          <CheckboxWithLabel
            key={tier}
            checked={filterQueries.serviceTier.includes(tier)}
            onChange={() => toggleFilterQuery('serviceTier', tier)}
            label={SERVICE_TIER_LABELS[tier]}
          />
        ))}
      </CheckboxesContainer>
    </Fieldset>
  )
}
