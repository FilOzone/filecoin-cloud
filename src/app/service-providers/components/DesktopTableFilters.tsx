import { Button } from '@filecoin-foundation/ui-filecoin/Button'
import { Icon } from '@filecoin-foundation/ui-filecoin/Icon'
import {
  backgroundVariants,
  useBackground,
} from '@filecoin-foundation/ui-filecoin/Section/Section'
import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/react'
import { FunnelSimpleIcon } from '@phosphor-icons/react/dist/ssr'
import { clsx } from 'clsx'

import { CapacityFilter } from './CapacityFilter'
import { IpniFilter } from './IpniFilter'
import { LocationFilter } from './LocationFilter'
import { ProvingPeriodFilter } from './ProvingPeriodFilter'
import { ServiceTierFilter } from './ServiceTierFilter'
import { StatusFilter } from './StatusFilter'
import type { useFilterOptions } from '../hooks/useFilterOptions'
import { useFilterQueryState } from '../hooks/useFilterQueryState'

export type DesktopTableFiltersProps = {
  options: ReturnType<typeof useFilterOptions>
}

export function DesktopTableFilters({ options }: DesktopTableFiltersProps) {
  const { theme } = useBackground()
  const { clearFilterQueries, hasActiveFilters } = useFilterQueryState()

  const {
    location: locationOptions,
    status: statusOptions,
    ipni: ipniOptions,
    serviceTier: serviceTierOptions,
    capacityMin,
    capacityMax,
    provingPeriodMin,
    provingPeriodMax,
  } = options

  return (
    <Popover>
      {({ close }) => (
        <>
          <PopoverButton className="listbox-button">
            <span className="flex items-center gap-2">
              <Icon component={FunnelSimpleIcon} size={20} />
              Filters
            </span>
          </PopoverButton>

          <PopoverBackdrop className="fixed inset-0 bg-zinc-950/5" />

          <PopoverPanel
            anchor={{ to: 'bottom', gap: 16 }}
            className={clsx(
              backgroundVariants[theme],
              '@container w-[640px] max-h-[80vh] overflow-y-auto p-6 rounded-2xl border border-(--color-listbox-border) shadow-xs',
            )}
          >
            <div className="flex gap-16">
              <div className="shrink-0">
                <LocationFilter options={locationOptions} />
              </div>

              <div className="flex flex-col gap-8 grow">
                <CapacityFilter
                  capacityMin={capacityMin}
                  capacityMax={capacityMax}
                />
                <ProvingPeriodFilter
                  provingPeriodMin={provingPeriodMin}
                  provingPeriodMax={provingPeriodMax}
                />

                {statusOptions.length > 1 && (
                  <StatusFilter options={statusOptions} />
                )}
                {ipniOptions.length > 1 && <IpniFilter options={ipniOptions} />}
                {serviceTierOptions.length > 1 && (
                  <ServiceTierFilter options={serviceTierOptions} />
                )}
              </div>
            </div>

            <div className="pt-6 mt-6 flex justify-center border-t border-zinc-950/10">
              <Button
                variant="ghost"
                disabled={!hasActiveFilters}
                onClick={() => {
                  clearFilterQueries()
                  close()
                }}
              >
                Reset Filters
              </Button>
            </div>
          </PopoverPanel>
        </>
      )}
    </Popover>
  )
}
