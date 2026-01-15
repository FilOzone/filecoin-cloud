import { Fieldset } from '@headlessui/react'

import { CheckboxesContainer } from '@/components/CheckboxesContainer'
import { CheckboxWithLabel } from '@/components/CheckboxWithLabel'
import { FilterHeading } from '@/components/FilterHeading'

import { ServiceTier } from '@/utils/service-tier'

import { useFilterQueryState } from '../hooks/useFilterQueryState'

type ServiceTierFilterProps = {
  options: Array<ServiceTier>
}

const SERVICE_TIER_LABELS: Record<ServiceTier, string> = {
  [ServiceTier.WARM_AND_PDP]: 'Warm Storage',
  [ServiceTier.PDP_ONLY]: 'PDP Storage',
  [ServiceTier.INACTIVE]: 'Inactive',
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
