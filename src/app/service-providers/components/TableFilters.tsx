import { DesktopTableFilters } from './DesktopTableFilters'
import { MobileTableFilters } from './MobileTableFilters'
import type { useFilterOptions } from '../hooks/use-filter-options'

export type TableFiltersProps = {
  options: ReturnType<typeof useFilterOptions>
}

export function TableFilters({ options }: TableFiltersProps) {
  return (
    <>
      <span className="hidden md:block">
        <DesktopTableFilters options={options} />
      </span>
      <span className="block md:hidden">
        <MobileTableFilters options={options} />
      </span>
    </>
  )
}
