import { DesktopTableFilters } from './DesktopTableFilters'
import type { useFilterOptions } from '../hooks/useFilterOptions'

export type TableFiltersProps = {
  options: ReturnType<typeof useFilterOptions>
}

export function TableFilters({ options }: TableFiltersProps) {
  return <DesktopTableFilters options={options} />
}
