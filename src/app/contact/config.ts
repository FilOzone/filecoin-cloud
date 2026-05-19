/**
 * Google Form integration for the contact form.
 *
 * Form ID and entry IDs were extracted from the form's "Get pre-filled link"
 * URL. To re-derive: open the form editor → ⋮ → "Get pre-filled link", fill
 * each field with a unique placeholder, copy the URL, and read the
 * `entry.NNNNNNNNNN` IDs from the query string.
 *
 * The submission URL ends in `/formResponse` (not `/viewform`).
 */
export const GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSeOzDuf9UflhT_dMKEa4lwmWL-JNrhjh6ot4bUd21HR4_f-PA/formResponse'

export const GOOGLE_FORM_ENTRY_IDS = {
  firstName: 'entry.1395415855',
  lastName: 'entry.1610700810',
  company: 'entry.2016790584',
  email: 'entry.1961848032',
  projectLink: 'entry.1001477030',
  useCase: 'entry.1762795784',
  optIn: 'entry.586019531',
} as const

/**
 * Cloudflare Turnstile (managed mode) — spam protection for the contact form.
 *
 * Production keys come from environment variables on Vercel. Locally, falls
 * back to Cloudflare's published "always passes" test keys so the form can be
 * exercised without a real widget. To test the failure path locally, set
 * `TURNSTILE_SECRET_KEY=2x0000000000000000000000000000000AA` and
 * `NEXT_PUBLIC_TURNSTILE_SITE_KEY=2x00000000000000000000AB`.
 *
 * See: https://developers.cloudflare.com/turnstile/troubleshooting/testing/
 */
export const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '1x00000000000000000000AA'

export const TURNSTILE_VERIFY_URL =
  'https://challenges.cloudflare.com/turnstile/v0/siteverify'

export const TURNSTILE_SCRIPT_URL =
  'https://challenges.cloudflare.com/turnstile/v0/api.js'

/**
 * Hidden honeypot input name. Real users never see or fill this field; bots
 * that auto-complete every input will, and submissions with a non-empty value
 * are silently accepted (without forwarding to Google Forms).
 */
export const HONEYPOT_FIELD_NAME = 'website'
