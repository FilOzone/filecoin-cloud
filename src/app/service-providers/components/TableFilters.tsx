import { Checkbox } from '@filecoin-foundation/ui-filecoin/Checkbox'
import { Icon } from '@filecoin-foundation/ui-filecoin/Icon'
import { Input } from '@filecoin-foundation/ui-filecoin/Input'
import {
  Field,
  Label,
  Menu,
  MenuButton,
  MenuHeading,
  MenuItems,
  MenuSection,
} from '@headlessui/react'
import { FunnelSimpleIcon } from '@phosphor-icons/react/dist/ssr'
import { useCallback } from 'react'

import type { useFilterOptions } from '../hooks/useFilterOptions'
import type { FilterState } from '../hooks/useFilterQueryState'

const menuHeadingStyle = 'text-sm font-medium text-zinc-600'
const checkboxLabelStyle = 'text-(--color-text-base)'

export type TableFiltersProps = {
  state: FilterState
  setState: (value: FilterState | null) => void
  options: ReturnType<typeof useFilterOptions>
}

export function TableFilters({ state, setState, options }: TableFiltersProps) {
  const toggleStatus = useCallback(
    (status: string) => {
      const updated = toggleValueInArray(state.status, status)
      setState({ ...state, status: updated })
    },
    [state, setState],
  )

  const toggleCountry = useCallback(
    (country: string) => {
      const updated = toggleValueInArray(state.country, country)
      setState({ ...state, country: updated })
    },
    [state, setState],
  )

  const toggleIpni = useCallback(
    (ipni: string) => {
      const updated = toggleValueInArray(state.ipni, ipni)
      setState({ ...state, ipni: updated })
    },
    [state, setState],
  )

  const updateCapacityMin = useCallback(
    (value: string) => {
      const updated = parseNumericInput(value)
      setState({ ...state, capacityMin: updated })
    },
    [state, setState],
  )

  const updateCapacityMax = useCallback(
    (value: string) => {
      const updated = parseNumericInput(value)
      setState({ ...state, capacityMax: updated })
    },
    [state, setState],
  )

  const updateProvingPeriodMin = useCallback(
    (value: string) => {
      const updated = parseNumericInput(value)
      setState({ ...state, provingPeriodMin: updated })
    },
    [state, setState],
  )

  const updateProvingPeriodMax = useCallback(
    (value: string) => {
      const updated = parseNumericInput(value)
      setState({ ...state, provingPeriodMax: updated })
    },
    [state, setState],
  )

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
    <Menu>
      <MenuButton className="listbox-button">
        <span className="flex items-center gap-2">
          <Icon component={FunnelSimpleIcon} size={20} />
          Filters
        </span>
      </MenuButton>

      <MenuItems
        anchor={{ to: 'bottom', gap: 16 }}
        className="bg-white w-[640px] max-h-[80vh] overflow-y-auto p-6 rounded-lg border border-(--color-listbox-border) shadow-xs flex gap-16"
      >
        <div className="flex flex-col gap-8 shrink-0">
          <MenuSection>
            <MenuHeading className={menuHeadingStyle}>Country</MenuHeading>
            <div className="mt-4 flex flex-col gap-3 grow">
              {countryOptions.map((option) => (
                <Field key={option} className="flex items-center gap-2">
                  <Checkbox
                    checked={state.country.includes(option)}
                    onChange={() => toggleCountry(option)}
                  />
                  <Label className={checkboxLabelStyle}>{option}</Label>
                </Field>
              ))}
            </div>
          </MenuSection>
        </div>

        <div className="flex flex-col gap-8 grow">
          <MenuSection>
            <MenuHeading className={menuHeadingStyle}>
              Capacity (TiB)
            </MenuHeading>
            <div className="mt-4 flex gap-4">
              <Input
                type="number"
                placeholder={`Min (${capacityMin.toLocaleString()})`}
                value={state.capacityMin?.toString() ?? ''}
                onChange={updateCapacityMin}
                aria-label="Minimum capacity filter"
                min={capacityMin}
                max={capacityMax}
              />
              <Input
                type="number"
                placeholder={`Max (${capacityMax.toLocaleString()})`}
                value={state.capacityMax?.toString() ?? ''}
                onChange={updateCapacityMax}
                aria-label="Maximum capacity filter"
                min={capacityMin}
                max={capacityMax}
              />
            </div>
          </MenuSection>

          <MenuSection>
            <MenuHeading className={menuHeadingStyle}>
              Proving Period (Epochs)
            </MenuHeading>
            <div className="mt-4 flex gap-4">
              <Input
                type="number"
                placeholder={`Min (${provingPeriodMin.toLocaleString()})`}
                value={state.provingPeriodMin?.toString() ?? ''}
                onChange={updateProvingPeriodMin}
                aria-label="Minimum proving period filter"
                min={provingPeriodMin}
                max={provingPeriodMax}
              />

              <Input
                type="number"
                placeholder={`Max (${provingPeriodMax.toLocaleString()})`}
                value={state.provingPeriodMax?.toString() ?? ''}
                onChange={updateProvingPeriodMax}
                aria-label="Maximum proving period filter"
                min={provingPeriodMin}
                max={provingPeriodMax}
              />
            </div>
          </MenuSection>

          {hasMoreThanOneOption(statusOptions) && (
            <MenuSection>
              <MenuHeading className={menuHeadingStyle}>Status</MenuHeading>
              <div className="mt-4 flex flex-col gap-3">
                {statusOptions.map((option) => (
                  <Field key={option} className="flex items-center gap-2">
                    <Checkbox
                      checked={state.status.includes(option)}
                      onChange={() => toggleStatus(option)}
                    />
                    <Label className={checkboxLabelStyle}>{option}</Label>
                  </Field>
                ))}
              </div>
            </MenuSection>
          )}

          {hasMoreThanOneOption(ipniOptions) && (
            <MenuSection>
              <MenuHeading className={menuHeadingStyle}>IPNI</MenuHeading>
              <div className="mt-4 flex flex-col gap-3">
                {ipniOptions.map((option) => (
                  <Field key={option} className="flex items-center gap-2">
                    <Checkbox
                      checked={state.ipni.includes(option)}
                      onChange={() => toggleIpni(option)}
                    />
                    <Label className={checkboxLabelStyle}>{option}</Label>
                  </Field>
                ))}
              </div>
            </MenuSection>
          )}
        </div>
      </MenuItems>
    </Menu>
  )
}

function toggleValueInArray(current: Array<string>, value: string) {
  const updated = current.includes(value)
    ? current.filter((v) => v !== value)
    : [...current, value]

  return updated
}

function parseNumericInput(value: string) {
  const parsed = value === '' ? null : Number.parseInt(value, 10)
  return Number.isNaN(parsed) ? null : parsed
}

function hasMoreThanOneOption(options: string[]) {
  return options.length > 1
}
