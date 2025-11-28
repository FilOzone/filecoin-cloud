import Checkbox from '@filecoin-foundation/ui-filecoin/Checkbox'
import { Icon } from '@filecoin-foundation/ui-filecoin/Icon'
import Input from '@filecoin-foundation/ui-filecoin/Input'
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

const menuHeadingStyle = 'text-sm font-medium text-zinc-600'
const checkboxLabelStyle = 'text-(--color-text-base)'

export function TableFilters() {
  return (
    <Menu>
      <MenuButton className="listbox-button">
        <span className="flex items-center gap-2">
          <Icon component={FunnelSimpleIcon} size={20} />
          Filters
        </span>
      </MenuButton>
      <MenuItems
        anchor={{ to: 'bottom start', gap: 16 }}
        className="bg-white w-[500px] p-6 rounded-lg border border-(--color-listbox-border) shadow-xs"
      >
        <MenuSection>
          <MenuHeading className={menuHeadingStyle}>Status</MenuHeading>
          <div className="mt-4 flex flex-col gap-3">
            <Field className="flex items-center gap-2">
              <Checkbox />
              <Label className={checkboxLabelStyle}>Active Providers</Label>
            </Field>
          </div>
        </MenuSection>
      </MenuItems>
    </Menu>
  )
}
