import type { Metadata } from 'next'
import DisclaimerText from '@/components/legal/DisclaimerText'

export const metadata: Metadata = {
  title: 'Disclaimer · LMG Media',
}

export default function DisclaimerPage() {
  return (
    <>
      <p className="legal-kicker">Disclaimer</p>
      <h1>Hinweise zu den Werkzeugen</h1>
      <p className="legal-note">
        Der deutsche Text ist die Fassung. Darunter steht dieselbe Aussage auf Englisch. Dieselben Texte stehen auch in den <a href="/terms">Nutzungsbedingungen</a>.
      </p>
      <DisclaimerText />
    </>
  )
}
