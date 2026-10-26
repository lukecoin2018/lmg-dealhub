import type { Metadata } from 'next'
import Link from 'next/link'
import { filled, operator } from '@/lib/legal/operator'

export const metadata: Metadata = {
  title: 'Legal Notice · LMG Media',
  robots: { index: true, follow: true },
}

export default function LegalNoticePage() {
  return (
    <>
      <p className="legal-kicker">Legal notice</p>
      <h1>Legal Notice</h1>
      <p className="legal-note">Company information for {operator.website}.</p>

      <h2>Operator of this website</h2>
      <address>
        <p>
          {operator.legalName}
          <br />
          {operator.street}
          <br />
          {operator.city}, {operator.state} {operator.zip}
          <br />
          {operator.country}
        </p>
      </address>

      <h2>Contact</h2>
      <p>
        Email: <a href={`mailto:${operator.email}`}>{operator.email}</a>
        {filled(operator.phone) && (
          <>
            <br />
            Phone: <a href={`tel:${operator.phone.replace(/[^+\d]/g, '')}`}>{operator.phone}</a>
          </>
        )}
      </p>

      <h2>About this website</h2>
      <p>
        {operator.website} offers education and tools for creators on the business side of brand partnerships: an online course, a rate calculator, a negotiation assistant and a contract template builder. The content is general information. It is not legal, tax or financial advice for your individual situation.
      </p>

      <h2>Copyright</h2>
      <p>
        All course content, text, videos, graphics and software on this website are owned by {operator.legalName} or its licensors and are protected by United States and international copyright and trademark laws. Use is subject to our <Link href="/terms">Terms of Use</Link>.
      </p>

      <h2>Questions and complaints</h2>
      <p>
        Please email <a href={`mailto:${operator.email}`}>{operator.email}</a>. We aim to reply within a reasonable time. California residents can also find information about the California Department of Consumer Affairs in section 13 of our <Link href="/terms">Terms of Use</Link>.
      </p>

      <h2>Related pages</h2>
      <p>
        <Link href="/privacy">Privacy Policy</Link> · <Link href="/terms">Terms of Use</Link> · <Link href="/disclaimer">Disclaimers</Link>
      </p>
    </>
  )
}
