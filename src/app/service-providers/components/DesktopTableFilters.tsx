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
import { CountryFilter } from './CountryFilter'
import { InpiFilter } from './InpiFilter'
import { ProvingPeriodFilter } from './ProvingPeriodFilter'
import { StatusFilter } from './StatusFilter'
import type { useFilterOptions } from '../hooks/useFilterOptions'

export type DesktopTableFiltersProps = {
  options: ReturnType<typeof useFilterOptions>
}

export function DesktopTableFilters({ options }: DesktopTableFiltersProps) {
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
    <Popover>
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
          '@container bg-white w-[640px] max-h-[80vh] overflow-y-auto p-6 rounded-lg border border-(--color-listbox-border) shadow-xs flex gap-16',
        )}
      >
        <div className="shrink-0">
          <CountryFilter options={countryOptions} />
        </div>

        <div className="flex flex-col gap-8 grow">
          <CapacityFilter capacityMin={capacityMin} capacityMax={capacityMax} />
          <ProvingPeriodFilter
            provingPeriodMin={provingPeriodMin}
            provingPeriodMax={provingPeriodMax}
          />

          {statusOptions.length > 1 && <StatusFilter options={statusOptions} />}
          {ipniOptions.length > 1 && <InpiFilter options={ipniOptions} />}
        </div>
      </PopoverPanel>
    </Popover>
  )
}
