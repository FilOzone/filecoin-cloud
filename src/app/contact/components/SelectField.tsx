import { Field, Label, Select } from '@headlessui/react'
import { useId } from 'react'

import { ErrorMessage } from '@/components/ErrorMessage'

const selectClassName =
  'focus:brand-outline block w-full rounded-lg border border-(--input-border-color) bg-transparent p-3 text-(--color-text-base)'

type SelectFieldProps = {
  name: string
  label: string
  options: ReadonlyArray<string>
  required?: boolean
  error?: string
}

export function SelectField({
  name,
  label,
  options,
  required,
  error,
}: SelectFieldProps) {
  const reactId = useId()
  const errorId = error ? `${reactId}-error` : undefined

  return (
    <Field>
      <Label className="text-(--color-text-base) text-sm font-medium mb-1 inline-block">
        {label}
        {required && (
          <span aria-hidden="true" className="ml-0.5">
            *
          </span>
        )}
      </Label>
      <Select
        name={name}
        required={required}
        defaultValue=""
        invalid={Boolean(error)}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        aria-errormessage={errorId}
        className={selectClassName}
      >
        <option value="" disabled>
          Select one
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
      {error && <ErrorMessage id={errorId} message={error} />}
    </Field>
  )
}
