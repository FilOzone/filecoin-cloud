'use client'

import { Button } from '@filecoin-foundation/ui-filecoin/Button'
import { Icon } from '@filecoin-foundation/ui-filecoin/Icon'
import {
  backgroundVariants,
  useBackground,
} from '@filecoin-foundation/ui-filecoin/Section/Section'
import {
  Fieldset,
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/react'
import { FunnelSimpleIcon } from '@phosphor-icons/react'
import { clsx } from 'clsx'

import { CheckboxesContainer } from '@/components/CheckboxesContainer'
import { CheckboxWithLabel } from '@/components/CheckboxWithLabel'

import { useLocationQueryState } from '../hooks/use-location-query-state'

export type LocationFilterProps = {
  options: Array<string>
}

export function LocationFilter({ options }: LocationFilterProps) {
  const { theme } = useBackground()

  const {
    locations,
    hasActiveLocations,
    toggleLocation,
    isLocationActive,
    clearLocations,
  } = useLocationQueryState()

  return (
    <Popover>
      {({ close }) => (
        <>
          <PopoverButton className="listbox-button">
            <span className="flex items-center gap-2">
              <Icon component={FunnelSimpleIcon} size={20} />
              Location
              {locations.length > 0 && (
                <span className="text-sm rounded-full bg-brand-700 text-brand-50 size-5 grid place-content-center">
                  {locations.length}
                </span>
              )}
            </span>
          </PopoverButton>

          <PopoverBackdrop className="fixed inset-0 bg-zinc-950/5" />

          <PopoverPanel
            anchor={{ to: 'bottom', gap: 16 }}
            className={clsx(
              backgroundVariants[theme],
              'w-80 max-h-96 overflow-y-auto p-6 rounded-2xl border border-(--color-listbox-border) shadow-xs',
            )}
          >
            <Fieldset>
              <CheckboxesContainer>
                {options.map((option) => (
                  <CheckboxWithLabel
                    key={option}
                    checked={isLocationActive(option)}
                    onChange={() => toggleLocation(option)}
                    label={option}
                  />
                ))}
              </CheckboxesContainer>
            </Fieldset>

            <div className="pt-4 mt-6 border-t border-zinc-950/10">
              <div className="flex justify-between items-center px-2">
                <Button
                  variant="tertiary"
                  disabled={!hasActiveLocations}
                  onClick={clearLocations}
                >
                  Reset
                </Button>
                <Button variant="tertiary" onClick={close}>
                  Close
                </Button>
              </div>
            </div>
          </PopoverPanel>
        </>
      )}
    </Popover>
  )
}
