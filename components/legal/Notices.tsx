import Link from 'next/link'
import '@/styles/legal.css'

export function RateEstimateNotice() {
  return (
    <p className="legal-notice">
      <strong>Estimates only.</strong> This is a non-binding range from your inputs and general assumptions, shown in US dollars. It does not guarantee income, it is not an offer from a brand, and it is not financial, tax or legal advice. Amounts are before any taxes. Pricing decisions are yours.{' '}
      <Link href="/disclaimer">Full disclaimer</Link>
    </p>
  )
}

export function ContractTemplateNotice() {
  return (
    <p className="legal-notice">
      <strong>Not legal advice.</strong> The Contract Builder provides a general template that you fill in and adapt yourself. We do not review your situation or your contracts, and we do not advise whether or how to sign.{' '}
      <Link href="/disclaimer">Full disclaimer</Link>
    </p>
  )
}
