/**
 * Company details used on /impressum (Legal Notice), /privacy and /terms.
 *
 * Change a value here and it updates on all three pages.
 * Leave `phone` as an empty string to hide the phone line.
 */
export const operator = {
  /** Full legal name of the company. */
  legalName: 'LMG Media LLC',
  /** Short brand name used in running text. */
  brandName: 'LMG Media',
  street: '8383 Wilshire Blvd #803',
  city: 'Beverly Hills',
  state: 'CA',
  zip: '90211',
  country: 'United States',
  email: 'brands@lmg.media',
  /** Optional, for example '+1 (310) 555-0100'. Empty hides the line. */
  phone: '',
  website: 'creators.lmg.media',
}

/** One-line postal address, e.g. "8383 Wilshire Blvd #803, Beverly Hills, CA 90211, United States". */
export const operatorAddress = `${operator.street}, ${operator.city}, ${operator.state} ${operator.zip}, ${operator.country}`

export function filled(value: string): boolean {
  return value.trim().length > 0
}
