'use client'

import { Button } from '@filecoin-foundation/ui-filecoin/Button'
import { Checkbox } from '@filecoin-foundation/ui-filecoin/Checkbox'
import { ExternalTextLink } from '@filecoin-foundation/ui-filecoin/TextLink/ExternalTextLink'
import { Field, Label } from '@headlessui/react'
import Script from 'next/script'
import { usePlausible } from 'next-plausible'
import { useActionState, useEffect, useState } from 'react'

import { PATHS } from '@/constants/paths'

import { SelectField } from './SelectField'
import { TextareaField } from './TextareaField'
import { TextInputField } from './TextInputField'
import { type ContactFormState, submitContact } from '../actions'
import {
  HONEYPOT_FIELD_NAME,
  TURNSTILE_SCRIPT_URL,
  TURNSTILE_SITE_KEY,
} from '../config'
import {
  CUSTOMERS_OPTIONS,
  INTENT_OPTIONS,
  TIMING_OPTIONS,
  VOLUME_OPTIONS,
} from '../constants/qualifying-questions'

const INITIAL_STATE: ContactFormState = { status: 'idle' }

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContact,
    INITIAL_STATE,
  )
  const [optIn, setOptIn] = useState(false)
  const plausible = usePlausible()

  useEffect(() => {
    if (state.status === 'success') {
      plausible('Contact Form Submit')
    }
  }, [state.status, plausible])

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
      <Script src={TURNSTILE_SCRIPT_URL} strategy="afterInteractive" async />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[9999px] h-px w-px overflow-hidden"
      >
        <label htmlFor={HONEYPOT_FIELD_NAME}>
          Leave this field blank
          <input
            id={HONEYPOT_FIELD_NAME}
            name={HONEYPOT_FIELD_NAME}
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>
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

      <SelectField
        name="intent"
        label="What are you looking to do?"
        options={INTENT_OPTIONS}
        required
        error={state.fieldErrors?.intent}
      />

      <TextareaField
        name="useCase"
        label="Tell us about your use case"
        required
        placeholder="What are you building, and where could Filecoin Onchain Cloud help?"
        error={state.fieldErrors?.useCase}
      />

      <SelectField
        name="volume"
        label="How much data do you expect to store in the next 12 months?"
        options={VOLUME_OPTIONS}
        required
        error={state.fieldErrors?.volume}
      />

      <SelectField
        name="timing"
        label="When will you be ready to start storing data?"
        options={TIMING_OPTIONS}
        required
        error={state.fieldErrors?.timing}
      />

      <SelectField
        name="customers"
        label="Do you have paying customers today?"
        options={CUSTOMERS_OPTIONS}
        required
        error={state.fieldErrors?.customers}
      />

      <TextareaField
        name="roadmap"
        label="What's on your roadmap for the next six months?"
        placeholder="Milestones, launches, or the point where you expect to start storing data."
        rows={3}
        error={state.fieldErrors?.roadmap}
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

      <div
        className="cf-turnstile"
        data-sitekey={TURNSTILE_SITE_KEY}
        data-appearance="always"
      />

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
