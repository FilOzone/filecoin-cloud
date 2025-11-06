import { Icon } from '@filecoin-foundation/ui-filecoin/Icon'
import {
  Listbox as HeadlessListbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react'
import { CaretDownIcon, GlobeIcon } from '@phosphor-icons/react/dist/ssr'

type Option = {
  id: string
  label: string
}

type LisboxProps = {
  options: Array<Option>
  selected: Option
  setSelected: (option: Option) => void
}

export function Listbox({ options, selected, setSelected }: LisboxProps) {
  return (
    <HeadlessListbox value={selected} onChange={setSelected}>
      <ListboxButton className="relative block min-w-56 rounded-lg bg-transparent p-3 text-left font-semibold text-(--color-navigation-link-text) data-focus:brand-outline border border-(--color-listbox-border)">
        <span className="flex gap-2 items-center">
          <Icon component={GlobeIcon} size={20} />
          {selected.label}
        </span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-3">
          <Icon component={CaretDownIcon} size={20} />
        </span>
      </ListboxButton>

      <ListboxOptions
        transition
        anchor="bottom start"
        className="w-(--button-width) rounded-lg border border-(--color-listbox-border) p-2 [--anchor-gap:--spacing(1)] focus:outline-none transition duration-100 ease-in data-leave:data-closed:opacity-0 space-y-2 shadow-xs"
      >
        {options.map((option) => (
          <ListboxOption
            key={option.label}
            value={option}
            className="group flex cursor-default items-center gap-2 rounded-md px-4 py-3 select-none data-selected:bg-(--color-listbox-option-background) data-focus:bg-(--color-listbox-option-background)"
          >
            <div className="font-semibold text-(--color-navigation-link-text)">
              {option.label}
            </div>
          </ListboxOption>
        ))}
      </ListboxOptions>
    </HeadlessListbox>
  )
}
