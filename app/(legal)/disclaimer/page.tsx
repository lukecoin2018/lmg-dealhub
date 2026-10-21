import type { Metadata } from 'next'
import Link from 'next/link'
import DisclaimerText from '@/components/legal/DisclaimerText'

export const metadata: Metadata = {
  title: 'Disclaimer · LMG Media',
}

export default function DisclaimerPage() {
  return (
    <>
      <p className="legal-kicker">Disclaimer</p>
      <h1>Disclaimers</h1>
      <p className="legal-note">
        The same text is also in the <Link href="/terms">terms of use</Link>.
      </p>
      <DisclaimerText />
    </>
  )
}
