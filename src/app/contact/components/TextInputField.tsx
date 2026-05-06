import { Description, Field, Input, Label } from '@headlessui/react'
import { useId } from 'react'

import { ErrorMessage } from '@/components/ErrorMessage'

const inputClassName =
  'focus:brand-outline block w-full rounded-lg border border-(--input-border-color) p-3 text-(--color-text-base) placeholder:text-(--input-placeholder-color)'

type TextInputFieldProps = {
  name: string
  label: string
  type?: 'text' | 'email' | 'url'
  required?: boolean
  placeholder?: string
  defaultValue?: string
  autoComplete?: string
  description?: string
  error?: string
}

export function TextInputField({
  name,
  label,
  type = 'text',
  required,
  placeholder,
  defaultValue,
  autoComplete,
  description,
  error,
}: TextInputFieldProps) {
  const reactId = useId()
  const descriptionId = description ? `${reactId}-description` : undefined
  const errorId = error ? `${reactId}-error` : undefined
  const describedBy =
    [descriptionId, errorId].filter(Boolean).join(' ') || undefined

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
        <Description
          id={descriptionId}
          className="text-(--color-paragraph-text) text-sm mb-1 block"
        >
          {description}
        </Description>
      )}
      <Input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue}
        autoComplete={autoComplete}
        invalid={Boolean(error)}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        aria-errormessage={errorId}
        className={inputClassName}
      />
      {error && <ErrorMessage id={errorId} message={error} />}
    </Field>
  )
}
