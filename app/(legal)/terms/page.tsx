import type { Metadata } from 'next'
import Link from 'next/link'
import DisclaimerText from '@/components/legal/DisclaimerText'
import { filled, operator, operatorAddress } from '@/lib/legal/operator'

export const metadata = {
  title: 'Terms of Use · LMG Media',
} satisfies Metadata

const EFFECTIVE_DATE = 'October 26, 2026'

export default function TermsPage() {
  const mail = <a href={`mailto:${operator.email}`}>{operator.email}</a>

  return (
    <>
      <p className="legal-kicker">Terms</p>
      <h1>Terms of Use</h1>
      <p className="legal-note">Effective date and last updated: {EFFECTIVE_DATE}.</p>

      <h2>1. Agreement to these terms</h2>
      <p>
        1.1 These Terms of Use (&quot;Terms&quot;) govern your use of {operator.website} (the &quot;Platform&quot;), operated by {operator.legalName}, {operatorAddress} (&quot;{operator.brandName},&quot; &quot;we,&quot; &quot;us&quot; or &quot;our&quot;).
      </p>
      <p>
        1.2 By creating an account or using the Platform, you agree to these Terms and acknowledge our <Link href="/privacy">Privacy Policy</Link>. If you do not agree, do not use the Platform.
      </p>

      <h2>2. Eligibility</h2>
      <p>
        You must be at least 18 years old and able to form a binding contract to create an account. By signing up you confirm that you meet these requirements and that the information you give us is accurate.
      </p>

      <h2>3. What we provide</h2>
      <p>
        3.1 <strong>Course.</strong> Module 1 is free and does not require an account. Modules 2–10 require a free account that we approve manually.
      </p>
      <p>
        3.2 <strong>Tools.</strong> After approval, you can use the DealHub tools free of charge: the rate calculator, the negotiation assistant, the contract builder and deal notes.
      </p>
      <p>
        3.3 <strong>No fees.</strong> The Platform is currently free. There are no paid plans, and we do not collect payment information. If we introduce paid features, we will tell you the price and terms before you are charged.
      </p>
      <p>
        3.4 <strong>Availability.</strong> We may change, suspend or discontinue any part of the Platform at any time. We do not promise that the Platform will be available without interruption.
      </p>

      <h2>4. Your account</h2>
      <p>
        4.1 Keep your password confidential. You are responsible for activity under your account. Tell us promptly at {mail} if you believe your account has been used without permission.
      </p>
      <p>
        4.2 Account approval is at our discretion, and we do not promise a time frame.
      </p>
      <p>4.3 You may ask us to delete your account at any time by emailing {mail}.</p>

      <h2>5. License and acceptable use</h2>
      <p>
        5.1 Subject to these Terms, we grant you a limited, personal, non-exclusive, non-transferable, revocable license to use the Platform and course materials for your own personal or business education. You may keep downloaded workbooks for your own use.
      </p>
      <p>5.2 You agree not to:</p>
      <ul>
        <li>share your login or give others access to your account;</li>
        <li>copy, resell, republish, distribute or publicly display course materials;</li>
        <li>scrape, crawl or bulk-download the Platform, or use automated means to access it;</li>
        <li>reverse-engineer, interfere with or try to bypass the Platform&apos;s security;</li>
        <li>use the Platform for any unlawful, fraudulent or harmful purpose.</li>
      </ul>

      <h2>6. Your content</h2>
      <p>
        Information you enter into the tools, such as deal notes, negotiation text and contract drafts, remains yours. It is stored in your browser, not on our servers. You are responsible for that content and for how you use it.
      </p>

      <h2>7. Intellectual property</h2>
      <p>
        The Platform and all course content, videos, text, graphics, templates, software and trademarks are owned by {operator.legalName} or its licensors and are protected by copyright, trademark and other laws. Except for the license in section 5, no rights are granted to you.
      </p>

      <h2>8. Educational purposes only</h2>
      <p>
        The Platform provides general education and tools. It is not legal, tax, financial or other professional advice, and using it does not create an attorney-client or other professional relationship. Rate estimates are not guarantees, and contract templates must be reviewed and adapted for your situation. We do not guarantee any income, deal or result. See the disclaimers in section 15.
      </p>

      <h2>9. Disclaimer of warranties</h2>
      <p>
        THE PLATFORM AND ALL CONTENT ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE,&quot; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT, TO THE FULLEST EXTENT PERMITTED BY LAW. WE DO NOT WARRANT THAT THE PLATFORM WILL BE UNINTERRUPTED, ERROR-FREE OR SECURE, OR THAT ANY CONTENT, ESTIMATE OR TEMPLATE IS ACCURATE, COMPLETE OR SUITABLE FOR YOUR PURPOSE.
      </p>

      <h2>10. Limitation of liability</h2>
      <p>
        10.1 TO THE FULLEST EXTENT PERMITTED BY LAW, {operator.legalName.toUpperCase()} AND ITS MEMBERS, MANAGERS, EMPLOYEES AND AGENTS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, OR FOR ANY LOSS OF PROFITS, REVENUE, DEALS, DATA OR GOODWILL, ARISING OUT OF OR RELATED TO THE PLATFORM OR THESE TERMS, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
      </p>
      <p>
        10.2 TO THE FULLEST EXTENT PERMITTED BY LAW, OUR TOTAL LIABILITY FOR ALL CLAIMS RELATED TO THE PLATFORM OR THESE TERMS WILL NOT EXCEED ONE HUNDRED U.S. DOLLARS (US $100).
      </p>
      <p>
        10.3 We are not responsible for the outcome of negotiations, contracts or pricing decisions you make using the Platform. Those decisions are yours.
      </p>
      <p>
        10.4 Nothing in these Terms limits liability that cannot be limited under applicable law, including liability for fraud, willful injury or gross negligence.
      </p>

      <h2>11. Indemnification</h2>
      <p>
        You agree to indemnify and hold harmless {operator.legalName} and its members, managers, employees and agents from any claims, losses and expenses, including reasonable attorneys&apos; fees, arising from your misuse of the Platform or your breach of these Terms.
      </p>

      <h2>12. Suspension and termination</h2>
      <p>
        You may stop using the Platform at any time. We may suspend or close your account if you breach these Terms, misuse the Platform or create a risk for us or other users. Where reasonable, we will tell you first. Sections 6 through 11, 14 and 16 continue to apply after your account ends.
      </p>

      <h2>13. Notice to California residents</h2>
      <p>
        Under California Civil Code §1789.3, California users are entitled to the following notice. The Platform is provided by {operator.legalName}, {operatorAddress}, email {mail}
        {filled(operator.phone) ? <>, phone {operator.phone}</> : null}. The Platform is currently provided free of charge. To resolve a complaint about the Platform or to receive further information, please contact us at the email above. You may also contact the Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs in writing at 1625 North Market Blvd., Suite N 112, Sacramento, CA 95834, or by telephone at (800) 952-5210.
      </p>

      <h2>14. Governing law and venue</h2>
      <p>
        14.1 These Terms are governed by the laws of the State of California, without regard to its conflict-of-law rules.
      </p>
      <p>
        14.2 Any dispute arising out of or relating to these Terms or the Platform will be brought exclusively in the state or federal courts located in Los Angeles County, California, and you and we consent to the personal jurisdiction of those courts. Either party may instead bring an individual claim in small claims court if it qualifies.
      </p>
      <p>
        14.3 Before filing a claim, please email {mail} so we can try to resolve the issue informally.
      </p>

      <h2>15. Disclaimers</h2>
      <p>
        The same text appears on <Link href="/disclaimer">/disclaimer</Link>. A short version is shown under rate calculator results and in the contract builder before you download a file.
      </p>
      <DisclaimerText />

      <h2>16. General</h2>
      <p>
        16.1 <strong>Changes.</strong> We may update these Terms from time to time. We will post the new version on this page and update the date at the top. For material changes, we will also notify you by email when we have your address. If you keep using the Platform after the changes take effect, you accept the updated Terms.
      </p>
      <p>
        16.2 <strong>Entire agreement.</strong> These Terms and the Privacy Policy are the entire agreement between you and us about the Platform.
      </p>
      <p>
        16.3 <strong>Severability and waiver.</strong> If any provision is found unenforceable, the rest remains in effect. Our failure to enforce a provision is not a waiver.
      </p>
      <p>
        16.4 <strong>Assignment.</strong> You may not transfer these Terms. We may assign them in connection with a merger, acquisition or sale of assets.
      </p>

      <h2>17. Contact</h2>
      <p>
        {operator.legalName}
        <br />
        {operatorAddress}
        <br />
        Email: {mail}
      </p>
    </>
  )
}
