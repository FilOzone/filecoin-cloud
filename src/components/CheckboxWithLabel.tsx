import { Checkbox } from '@filecoin-foundation/ui-filecoin/Checkbox'
import { Field, Label } from '@headlessui/react'

type CheckboxWithLabelProps = {
  checked: boolean
  onChange: () => void
  label: string
}

export function CheckboxWithLabel({
  checked,
  onChange,
  label,
}: CheckboxWithLabelProps) {
  return (
    <Field className="flex items-center gap-2">
      <Checkbox checked={checked} onChange={onChange} />
      <Label className="text-(--color-text-base)">{label}</Label>
    </Field>
  )
}
