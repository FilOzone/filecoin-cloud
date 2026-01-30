'use client'

import { Button } from '@filecoin-foundation/ui-filecoin/Button'
import { FilterButton } from '@filecoin-foundation/ui-filecoin/FilterButton'
import { IconButton } from '@filecoin-foundation/ui-filecoin/IconButton'
import {
  backgroundVariants,
  useBackground,
} from '@filecoin-foundation/ui-filecoin/Section/Section'
import { SlideOver } from '@filecoin-foundation/ui-filecoin/SlideOver'
import { FunnelSimpleIcon, XIcon } from '@phosphor-icons/react'
import { clsx } from 'clsx'
import { useState } from 'react'

import { CountBadge } from '@/components/CountBadge'

import { CapacityFilter } from './CapacityFilter'
import { IpniFilter } from './IpniFilter'
import { LocationFilter } from './LocationFilter'
import { ProvingPeriodFilter } from './ProvingPeriodFilter'
import { StatusFilter } from './StatusFilter'
import type { useFilterOptions } from '../hooks/useFilterOptions'
import { useFilterQueryState } from '../hooks/useFilterQueryState'

type MobileTableFiltersProps = {
  options: ReturnType<typeof useFilterOptions>
}

export function MobileTableFilters({ options }: MobileTableFiltersProps) {
  const [open, setOpen] = useState(false)
  const { clearFilterQueries, hasActiveFilters, activeFilterCount } =
    useFilterQueryState()

  const { theme } = useBackground()

  const {
    location: locationOptions,
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
        {activeFilterCount > 0 && <CountBadge count={activeFilterCount} />}
      </FilterButton>

      <SlideOver open={open} setOpen={setOpen}>
        <div
          className={clsx(
            backgroundVariants[theme],
            '@container p-8 flex flex-col gap-8 relative',
          )}
        >
          <div className="absolute top-8 right-8">
            <IconButton
              icon={XIcon}
              label="Close filters"
              onClick={() => setOpen(false)}
            />
          </div>

          {statusOptions.length > 1 && <StatusFilter options={statusOptions} />}
          <LocationFilter options={locationOptions} />
          <CapacityFilter capacityMin={capacityMin} capacityMax={capacityMax} />
          <ProvingPeriodFilter
            provingPeriodMin={provingPeriodMin}
            provingPeriodMax={provingPeriodMax}
          />

          {ipniOptions.length > 1 && <IpniFilter options={ipniOptions} />}

          <div className="pt-8 flex flex-col gap-4">
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
