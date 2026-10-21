import type { Metadata } from 'next'
import { filled, hasTradeLicence, operator } from '@/lib/legal/operator'

export const metadata: Metadata = {
  title: 'Impressum · LMG Media',
  robots: { index: true, follow: true },
}

export default function ImpressumPage() {
  const showPurpose = filled(operator.businessPurpose)
  const showLicence = hasTradeLicence()

  return (
    <>
      <p className="legal-kicker">Impressum</p>
      <h1>Impressum und Offenlegung</h1>
      <p className="legal-note">gemäß § 5 ECG und § 25 MedienG</p>

      <h2>Diensteanbieter und Medieninhaber</h2>
      <address>
        <p>
          {operator.name}
          <br />
          Geschäftsbezeichnung „{operator.tradingName}“ (nur eine Geschäftsbezeichnung, kein Firmenbucheintrag)
          <br />
          {operator.street}
          <br />
          {operator.postcode} {operator.city}, {operator.countryDe}
        </p>
      </address>

      <h2>Kontakt</h2>
      <p>
        E-Mail: <a href={`mailto:${operator.email}`}>{operator.email}</a>
      </p>

      {showPurpose && (
        <>
          <h2>Unternehmensgegenstand</h2>
          <p>{operator.businessPurpose}</p>
        </>
      )}

      {showLicence && (
        <>
          <h2>Gewerbeberechtigung</h2>
          {filled(operator.gewerbe) && <p>{operator.gewerbe}</p>}
          {filled(operator.gewerbeExtra) && <p>{operator.gewerbeExtra}</p>}
          {filled(operator.gisa) && <p>GISA-Zahl: {operator.gisa}</p>}
          {filled(operator.tradeAuthority) && <p>Gewerbebehörde: {operator.tradeAuthority}</p>}
          {filled(operator.wkoFachgruppe) && (
            <p>Mitglied der Wirtschaftskammer Wien, {operator.wkoFachgruppe}</p>
          )}
          <p>
            Anwendbare Rechtsvorschriften: Gewerbeordnung 1994 (GewO), abrufbar unter{' '}
            <a href="https://www.ris.bka.gv.at">www.ris.bka.gv.at</a>.
          </p>
        </>
      )}

      {filled(operator.uid) && (
        <>
          <h2>Umsatzsteuer</h2>
          <p>UID-Nr.: {operator.uid}</p>
        </>
      )}

      <h2>Offenlegung gemäß § 25 MedienG</h2>
      <p>
        Medieninhaber: {operator.name}, {operator.street}, {operator.postcode} {operator.city}.
      </p>
      {showPurpose && <p>Unternehmensgegenstand: siehe oben.</p>}
      <p>
        Grundlegende Richtung: Schulung und Information für Creator zur geschäftlichen Seite von Markenkooperationen, in Form des Kurses und der begleitenden Texte auf dieser Website. Keine Beratung im Einzelfall.
      </p>

      <h2>Verbraucherstreitbeilegung</h2>
      <p>
        Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen. Beschwerden richten Sie bitte an{' '}
        <a href={`mailto:${operator.email}`}>{operator.email}</a>.
      </p>

      <h2>English</h2>
      <p className="legal-note">Courtesy translation. The German text above is the version that applies.</p>
      <p>
        <strong>Service provider and media owner:</strong> {operator.name}, trading as {operator.tradingName} (a trading name, not a registered company), {operator.street}, {operator.postcode} Vienna, {operator.countryEn}.
      </p>
      <p>
        <strong>Contact:</strong> <a href={`mailto:${operator.email}`}>{operator.email}</a>
      </p>
      {showPurpose && (
        <p>
          <strong>Business activities:</strong> {operator.businessPurpose}
        </p>
      )}
      {showLicence && (
        <p>
          <strong>Trade licence:</strong>{' '}
          {[operator.gewerbe, operator.gewerbeExtra].filter(filled).join('; ')}
          {filled(operator.gisa) ? `. GISA no. ${operator.gisa}` : ''}
          {filled(operator.tradeAuthority) ? `. Supervisory trade authority: ${operator.tradeAuthority}` : ''}
          {filled(operator.wkoFachgruppe) ? `. Member of the Vienna Economic Chamber (WKO Wien), ${operator.wkoFachgruppe}` : ''}
          . Applicable rules: Austrian Trade Act 1994 (GewO), www.ris.bka.gv.at.
        </p>
      )}
      {filled(operator.uid) && (
        <p>
          <strong>VAT:</strong> {operator.uid}
        </p>
      )}
      <p>
        <strong>Disclosure under §25 Media Act:</strong> Media owner {operator.name}, {operator.street}, {operator.postcode} Vienna, {operator.countryEn}. Editorial line: training and information for creators on the business side of brand partnerships, through the course and the accompanying text on this website. Not advice on an individual case.
      </p>
      <p>
        <strong>Consumer dispute resolution:</strong> We are not obliged and not willing to take part in dispute resolution before a consumer arbitration board. Please send complaints to {operator.email}.
      </p>
    </>
  )
}
