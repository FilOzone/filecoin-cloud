import { Input } from '@filecoin-foundation/ui-filecoin/Input'
import { Field, Label } from '@headlessui/react'

type NumberInputProps = {
  placeholder: string
  value: string
  onChange: (value: string) => void
  label: string
  min?: number
  max?: number
}

export function NumberInput({ label, ...rest }: NumberInputProps) {
  return (
    <Field className="w-full">
      <Label className="sr-only">{label}</Label>
      <Input {...rest} aria-label={label} type="number" />
    </Field>
  )
}
