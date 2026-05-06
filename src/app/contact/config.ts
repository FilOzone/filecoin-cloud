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
