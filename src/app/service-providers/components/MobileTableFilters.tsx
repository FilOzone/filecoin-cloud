'use client'

import { Button } from '@filecoin-foundation/ui-filecoin/Button'
import { FilterButton } from '@filecoin-foundation/ui-filecoin/FilterButton'
import {
  backgroundVariants,
  useBackground,
} from '@filecoin-foundation/ui-filecoin/Section/Section'
import { SlideOver } from '@filecoin-foundation/ui-filecoin/SlideOver'
import { FunnelSimpleIcon } from '@phosphor-icons/react'
import { clsx } from 'clsx'
import { useState } from 'react'

import { CapacityFilter } from './CapacityFilter'
import { CountryFilter } from './CountryFilter'
import { InpiFilter } from './InpiFilter'
import { ProvingPeriodFilter } from './ProvingPeriodFilter'
import { StatusFilter } from './StatusFilter'
import type { useFilterOptions } from '../hooks/useFilterOptions'
import { useFilterQueryState } from '../hooks/useFilterQueryState'

type MobileTableFiltersProps = {
  options: ReturnType<typeof useFilterOptions>
}

export function MobileTableFilters({ options }: MobileTableFiltersProps) {
  const [open, setOpen] = useState(false)
  const { clearFilterQueries, hasActiveFilters } = useFilterQueryState()

  const { theme } = useBackground()

  const {
    country: countryOptions,
    status: statusOptions,
    ipni: ipniOptions,
    capacityMin,
    capacityMax,
    provingPeriodMin,
    provingPeriodMax,
  } = options

  return (
    <>
      <FilterButton Icon={FunnelSimpleIcon} onClick={() => setOpen(true)}>
        Filters
      </FilterButton>

      <SlideOver open={open} setOpen={setOpen}>
        <div
          className={clsx(
            backgroundVariants[theme],
            '@container p-8 flex flex-col gap-8',
          )}
        >
          {statusOptions.length > 1 && <StatusFilter options={statusOptions} />}
          <CountryFilter options={countryOptions} />
          <CapacityFilter capacityMin={capacityMin} capacityMax={capacityMax} />
          <ProvingPeriodFilter
            provingPeriodMin={provingPeriodMin}
            provingPeriodMax={provingPeriodMax}
          />

          {ipniOptions.length > 1 && <InpiFilter options={ipniOptions} />}

          <div className="pt-8 flex flex-col gap-4">
            <Button variant="primary" onClick={() => setOpen(false)}>
              Close Filters Panel
            </Button>
            <Button
              variant="ghost"
              disabled={!hasActiveFilters}
              onClick={clearFilterQueries}
            >
              Reset Filters
            </Button>
          </div>
        </div>
      </SlideOver>
    </>
  )
}
