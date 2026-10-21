import type { Metadata } from 'next'
import Link from 'next/link'
import DisclaimerText from '@/components/legal/DisclaimerText'
import { operator } from '@/lib/legal/operator'

export const metadata = {
  title: 'Terms of use · LMG Media',
} satisfies Metadata

export default function TermsPage() {
  return (
    <>
      <p className="legal-kicker">Terms</p>
      <h1>Terms of use</h1>
      <p className="legal-note">
        These terms cover only the free offering on creators.lmg.media (21 October 2026). There are no paid plans and no prices.
      </p>

      <h2>1. Scope and provider</h2>
      <p>
        1.1 These terms govern use of creators.lmg.media (the &quot;Platform&quot;), offered by {operator.name}, {operator.street}, {operator.postcode} Vienna, {operator.countryEn}, trading as {operator.tradingName} (a trading name, not a registered company). Contact:{' '}
        <a href={`mailto:${operator.email}`}>{operator.email}</a>. Legal notice: <Link href="/impressum">Legal notice</Link>.
      </p>
      <p>
        1.2 &quot;Consumer&quot; (<em>Verbraucher</em>) means a consumer within the meaning of §1 KSchG.
      </p>
      <p>1.3 Your own terms don&apos;t apply unless we agree to them in writing.</p>

      <h2>2. What we provide</h2>
      <p>
        2.1 <strong>Free course.</strong> Module 1 is free and does not need an account. Modules 2–10 need a free account that we approve by hand. Until we approve it, you can watch Module 1 and you see a pending page for the rest.
      </p>
      <p>
        2.2 <strong>Free tools.</strong> After approval, the DealHub tools are free: the rate calculator, the negotiation assistant, the contract builder, and the deal notes kept in your browser. The short rate estimate inside Module 1 does not need an account.
      </p>
      <p>
        2.3 <strong>Estimates and templates only.</strong> The rate calculator gives estimates. The contract builder produces general templates and is not legal advice. See the disclaimer below. We don&apos;t guarantee any income, deal or result.
      </p>
      <p>
        2.4 <strong>Availability.</strong> We aim to keep the Platform available, but we don&apos;t promise uninterrupted service. Maintenance is announced where we can. Consumers&apos; statutory warranty rights are unaffected.
      </p>

      <h2>3. Account</h2>
      <p>
        3.1 You must be at least 18 years old. The sign-up form does not check your age. Give accurate details and keep your password to yourself.
      </p>
      <p>
        3.2 You may ask us to delete your account at any time by emailing {operator.email}. Account settings have no delete button. An administrator can also delete an account.
      </p>
      <p>
        3.3 <strong>Blocking.</strong> We may block an account for a serious breach, for example abuse, illegal content or scraping the Platform. Before doing so we&apos;ll warn you, unless a warning would be unreasonable. Nothing is charged for the free account, so there is no fee to refund.
      </p>
      <p>
        3.4 New accounts are not approved automatically. Approval is a manual decision. We don&apos;t promise a time.
      </p>

      <h2>4. How the contract is formed</h2>
      <p>
        4.1 The free-account contract is formed when you complete sign-up. The form says that creating an account means you agree to these terms and the <Link href="/privacy">privacy policy</Link>.
      </p>
      <p>4.2 There is no paid order, no checkout and no price on this Platform.</p>

      <h2>5. Licence and your obligations</h2>
      <p>
        5.1 You get a non-exclusive, non-transferable right to use the course and tools for your own purposes while your account exists. Downloaded workbooks may be kept for personal use.
      </p>
      <p>5.2 You may not share logins, resell or republish the course, scrape or bulk-download the Platform, reverse-engineer it, or use it unlawfully.</p>
      <p>
        5.3 Content you enter (for example deal notes or a contract draft) stays yours. It is stored in your browser, not on our server. You grant us only the rights we need to show it back to you in that browser.
      </p>

      <h2>6. Statutory warranty</h2>
      <p>
        6.1 Consumers have the statutory warranty rights under the Verbrauchergewährleistungsgesetz (VGG). These can&apos;t be excluded or restricted to the consumer&apos;s detriment before a defect is reported.
      </p>
      <p>
        6.2 Where the law treats ongoing access as a continuous supply, we&apos;re liable for defects that appear during that supply, as the VGG provides.
      </p>
      <p>6.3 We&apos;ll provide the updates, including security updates, needed to keep the digital service in conformity where the VGG requires them.</p>
      <p>
        6.4 The free tier is provided without a price. Where you provide personal data instead of money, the VGG may still apply. Apart from those statutory rights, the free tier is provided as it is.
      </p>

      <h2>7. Stopping use</h2>
      <p>
        7.1 Nothing on this Platform is sold. We don&apos;t take a payment, so there is nothing to refund.
      </p>
      <p>
        7.2 You can stop using the Platform at any time. To close the account, email {operator.email}. We&apos;ll delete the account row. Browser data stays on your device until you clear it.
      </p>

      <h2>8. Liability</h2>
      <p>8.1 We&apos;re fully liable for personal injury, for damage caused intentionally or by gross negligence, and for claims under the Product Liability Act. These can&apos;t be excluded for consumers.</p>
      <p>
        8.2 For other damage caused by slight negligence, we&apos;re liable only for breach of essential contractual obligations, and only up to the typical, foreseeable damage.
      </p>
      <p>
        8.3 We&apos;re not liable for the results of your negotiations, contracts or rate decisions made using the tools. Those decisions are yours. This doesn&apos;t limit 8.1.
      </p>

      <h2>9. Privacy</h2>
      <p>
        See the privacy policy at <Link href="/privacy">/privacy</Link>.
      </p>

      <h2>10. Changes to these terms</h2>
      <p>
        We&apos;ll show changes on this page. A change to an essential term needs your active agreement. Silence is not treated as agreement.
      </p>

      <h2>11. Governing law and jurisdiction</h2>
      <p>
        11.1 Austrian law applies, excluding the UN Sales Convention and conflict-of-law rules. For consumers, this choice doesn&apos;t take away the protection of mandatory rules of the country where they habitually reside (Art. 6(2) Rome I Regulation).
      </p>
      <p>
        11.2 A consumer resident in Austria can only be sued at the court of their residence, employment or habitual stay (§14 KSchG). EU consumers also have Art. 18 Brussels Ia.
      </p>
      <p>
        11.3 Consumer dispute resolution: see the statement in the <Link href="/impressum">legal notice</Link>. We are not obliged and not willing to take part in dispute resolution before a consumer arbitration board.
      </p>

      <h2>12. Disclaimers</h2>
      <p>
        The same text is on <Link href="/disclaimer">/disclaimer</Link>. A short form is shown under rate-calculator results and on the contract generator before you download a file.
      </p>
      <DisclaimerText />
    </>
  )
}
