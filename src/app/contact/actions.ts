'use server'

import {
  GOOGLE_FORM_ENTRY_IDS,
  GOOGLE_FORM_URL,
  IS_FORM_CONFIGURED,
} from './config'

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
    return {
      status: 'error',
      message: 'Please fix the errors below and try again.',
      fieldErrors,
    }
  }

  if (!IS_FORM_CONFIGURED) {
    console.warn(
      '[contact] Google Form is not yet configured. Submission was not forwarded.',
      values,
    )
    return {
      status: 'success',
      message:
        "Thanks — we'll be in touch shortly. (Note: form delivery is being configured; we received your details on our end.)",
    }
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
    await fetch(GOOGLE_FORM_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    })
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
