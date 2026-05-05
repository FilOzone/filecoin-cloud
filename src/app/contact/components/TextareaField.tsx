import { Description, Field, Label, Textarea } from '@headlessui/react'

import { ErrorMessage } from '@/components/ErrorMessage'

const textareaClassName =
  'focus:brand-outline block w-full rounded-lg border border-(--input-border-color) p-3 text-(--color-text-base) placeholder:text-(--input-placeholder-color) resize-y min-h-32'

type TextareaFieldProps = {
  name: string
  label: string
  required?: boolean
  placeholder?: string
  defaultValue?: string
  description?: string
  error?: string
  rows?: number
}

export function TextareaField({
  name,
  label,
  required,
  placeholder,
  defaultValue,
  description,
  error,
  rows = 5,
}: TextareaFieldProps) {
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
      {description && (
        <Description className="text-(--color-paragraph-text) text-sm mb-1 block">
          {description}
        </Description>
      )}
      <Textarea
        name={name}
        rows={rows}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue}
        invalid={Boolean(error)}
        aria-invalid={Boolean(error)}
        className={textareaClassName}
      />
      {error && <ErrorMessage message={error} />}
    </Field>
  )
}
