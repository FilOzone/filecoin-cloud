'use client'

import { Button } from '@filecoin-foundation/ui-filecoin/Button'
import { Checkbox } from '@filecoin-foundation/ui-filecoin/Checkbox'
import { ExternalTextLink } from '@filecoin-foundation/ui-filecoin/TextLink/ExternalTextLink'
import { Field, Label } from '@headlessui/react'
import { useActionState, useState } from 'react'

import { PATHS } from '@/constants/paths'

import { TextareaField } from './TextareaField'
import { TextInputField } from './TextInputField'
import { type ContactFormState, submitContact } from '../actions'

const INITIAL_STATE: ContactFormState = { status: 'idle' }

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContact,
    INITIAL_STATE,
  )
  const [optIn, setOptIn] = useState(false)

  if (state.status === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-lg border border-(--input-border-color) bg-(--color-card-background) p-6 text-(--color-text-base)"
      >
        <p className="font-medium">Message sent</p>
        <p className="mt-1 text-sm">{state.message}</p>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-6" noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <TextInputField
          name="firstName"
          label="First name"
          required
          autoComplete="given-name"
          placeholder="Jane"
          error={state.fieldErrors?.firstName}
        />
        <TextInputField
          name="lastName"
          label="Last name"
          required
          autoComplete="family-name"
          placeholder="Smith"
          error={state.fieldErrors?.lastName}
        />
      </div>

      <TextInputField
        name="company"
        label="Company or project name"
        required
        autoComplete="organization"
        placeholder="Acme Inc."
        error={state.fieldErrors?.company}
      />

      <TextInputField
        name="email"
        label="Work email"
        type="email"
        required
        autoComplete="email"
        placeholder="jane@acme.com"
        error={state.fieldErrors?.email}
      />

      <TextInputField
        name="projectLink"
        label="GitHub repo or project link"
        type="url"
        autoComplete="url"
        placeholder="https://github.com/your-org/your-project"
        description="Optional — share a repo, dApp, or live demo if you have one."
        error={state.fieldErrors?.projectLink}
      />

      <TextareaField
        name="useCase"
        label="Tell us about your use case"
        required
        placeholder="What are you building, and where could Filecoin Onchain Cloud help?"
        error={state.fieldErrors?.useCase}
      />

      <Field className="flex items-start gap-3">
        <Checkbox
          name="optIn"
          checked={optIn}
          onChange={() => setOptIn((value) => !value)}
        />
        <Label className="text-(--color-text-base) text-sm">
          I agree to receive other communications from the Filecoin Onchain
          Cloud team.
        </Label>
      </Field>

      <p className="text-sm text-(--color-paragraph-text)">
        You can unsubscribe at any time. By submitting, you consent to FilOz
        storing and processing the information you&apos;ve shared. See our{' '}
        <ExternalTextLink href={PATHS.PRIVACY_POLICY.path}>
          Privacy Policy
        </ExternalTextLink>
        .
      </p>

      {state.status === 'error' && state.message && !state.fieldErrors && (
        <p role="alert" className="text-(--color-brand-error) text-sm">
          {state.message}
        </p>
      )}

      <Button type="submit" variant="primary" disabled={pending}>
        {pending ? 'Sending…' : 'Submit'}
      </Button>
    </form>
  )
}
