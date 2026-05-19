'use server'

import { headers } from 'next/headers'

import {
  GOOGLE_FORM_ENTRY_IDS,
  GOOGLE_FORM_URL,
  HONEYPOT_FIELD_NAME,
  TURNSTILE_VERIFY_URL,
} from './config'

const TURNSTILE_TEST_SECRET_PASS = '1x0000000000000000000000000000000AA'

export type ContactFormState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  fieldErrors?: Partial<Record<ContactField, string>>
}

type ContactField =
  | 'firstName'
  | 'lastName'
  | 'company'
  | 'email'
  | 'projectLink'
  | 'useCase'

const REQUIRED_FIELDS: Array<ContactField> = [
  'firstName',
  'lastName',
  'company',
  'email',
  'useCase',
]

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function submitContact(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const values = {
    firstName: getString(formData, 'firstName'),
    lastName: getString(formData, 'lastName'),
    company: getString(formData, 'company'),
    email: getString(formData, 'email'),
    projectLink: getString(formData, 'projectLink'),
    useCase: getString(formData, 'useCase'),
    optIn: formData.get('optIn') === 'on',
  }

  if (getString(formData, HONEYPOT_FIELD_NAME)) {
    return {
      status: 'success',
      message: "Thanks — we'll be in touch shortly.",
    }
  }

  const fieldErrors: ContactFormState['fieldErrors'] = {}
  for (const field of REQUIRED_FIELDS) {
    if (!values[field]) {
      fieldErrors[field] = 'This field is required.'
    }
  }
  if (values.email && !EMAIL_PATTERN.test(values.email)) {
    fieldErrors.email = 'Please enter a valid email address.'
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { status: 'error', fieldErrors }
  }

  const turnstileError = await verifyTurnstile(formData)
  if (turnstileError) {
    return turnstileError
  }

  const body = new URLSearchParams({
    [GOOGLE_FORM_ENTRY_IDS.firstName]: values.firstName,
    [GOOGLE_FORM_ENTRY_IDS.lastName]: values.lastName,
    [GOOGLE_FORM_ENTRY_IDS.company]: values.company,
    [GOOGLE_FORM_ENTRY_IDS.email]: values.email,
    [GOOGLE_FORM_ENTRY_IDS.projectLink]: values.projectLink,
    [GOOGLE_FORM_ENTRY_IDS.useCase]: values.useCase,
  })
  if (values.optIn) {
    body.append(
      GOOGLE_FORM_ENTRY_IDS.optIn,
      'I agree to receive other communications, including marketing information, from us.',
    )
  }

  try {
    const response = await fetch(GOOGLE_FORM_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    })
    if (!response.ok) {
      console.error(
        `[contact] Google Form rejected submission: ${response.status} ${response.statusText}`,
      )
      return {
        status: 'error',
        message:
          'Something went wrong submitting your message. Please try again or email us directly.',
      }
    }
  } catch (error) {
    console.error('[contact] Failed to submit Google Form:', error)
    return {
      status: 'error',
      message:
        'Something went wrong submitting your message. Please try again or email us directly.',
    }
  }

  return {
    status: 'success',
    message: "Thanks — we'll be in touch shortly.",
  }
}

function getString(formData: FormData, key: string): string {
  const value = formData.get(key)
  return typeof value === 'string' ? value.trim() : ''
}

async function verifyTurnstile(
  formData: FormData,
): Promise<ContactFormState | null> {
  const token = getString(formData, 'cf-turnstile-response')
  if (!token) {
    return {
      status: 'error',
      message: 'Please complete the verification challenge before submitting.',
    }
  }

  const secret = process.env.TURNSTILE_SECRET_KEY ?? TURNSTILE_TEST_SECRET_PASS
  const verifyBody = new URLSearchParams({ secret, response: token })

  const forwardedFor = (await headers()).get('x-forwarded-for')
  const remoteIp = forwardedFor?.split(',')[0]?.trim()
  if (remoteIp) {
    verifyBody.append('remoteip', remoteIp)
  }

  try {
    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: verifyBody,
    })
    const result = (await response.json()) as {
      success: boolean
      'error-codes'?: Array<string>
    }
    if (!result.success) {
      console.warn(
        '[contact] Turnstile verification failed:',
        result['error-codes'],
      )
      return {
        status: 'error',
        message:
          'Verification failed. Please reload the page and try submitting again.',
      }
    }
  } catch (error) {
    console.error('[contact] Turnstile verification request errored:', error)
    return {
      status: 'error',
      message:
        'Verification could not be completed. Please reload the page and try submitting again.',
    }
  }

  return null
}
