/**
 * Operator details for the Impressum, privacy policy and terms.
 *
 * The postcode is a single field so it can be corrected in one place.
 * Leave a Gewerbe field as an empty string to hide that line on /impressum.
 * Do not invent a GISA number, UID or trade wording here.
 */
export const operator = {
  name: 'Luke Langer',
  /** Geschäftsbezeichnung only. Not a registered company name. */
  tradingName: 'LMG Media',
  street: 'Walcherstraße 5',
  postcode: '1020',
  city: 'Wien',
  countryDe: 'Österreich',
  countryEn: 'Austria',
  email: 'luke@lmg.media',
  /** Unternehmensgegenstand. Empty hides the trade-purpose lines. */
  businessPurpose: '',
  /** First trade-licence wording. Empty hides that line. */
  gewerbe: '',
  /** Second trade-licence wording, if there is one. */
  gewerbeExtra: '',
  /** GISA number. */
  gisa: '',
  /** Supervisory trade authority. */
  tradeAuthority: '',
  /** WKO Wien Fachgruppe. */
  wkoFachgruppe: '',
  /** UID, for example ATU12345678. Empty hides the VAT line. */
  uid: '',
}

export function filled(value: string): boolean {
  return value.trim().length > 0
}

export function hasTradeLicence(): boolean {
  return [operator.gewerbe, operator.gewerbeExtra, operator.gisa, operator.tradeAuthority, operator.wkoFachgruppe].some(filled)
}
