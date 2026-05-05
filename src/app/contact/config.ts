/**
 * Google Form integration for the contact form.
 *
 * To wire up: create the Google Form, then in the form editor click ⋮ → "Get
 * pre-filled link", fill every field with a unique placeholder, copy the URL,
 * and paste each `entry.NNNNNNNNNN=value` pair below.
 *
 * The submission URL ends in `/formResponse` (not `/viewform`).
 */
export const GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/e/REPLACE_WITH_FORM_ID/formResponse'

export const GOOGLE_FORM_ENTRY_IDS = {
  firstName: 'entry.0000000001',
  lastName: 'entry.0000000002',
  company: 'entry.0000000003',
  email: 'entry.0000000004',
  projectLink: 'entry.0000000005',
  useCase: 'entry.0000000006',
  optIn: 'entry.0000000007',
} as const

export const IS_FORM_CONFIGURED = !GOOGLE_FORM_URL.includes('REPLACE_WITH')
