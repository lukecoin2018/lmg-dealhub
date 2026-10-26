import type { Metadata } from 'next'
import Link from 'next/link'
import { operator, operatorAddress } from '@/lib/legal/operator'

export const metadata: Metadata = {
  title: 'Privacy Policy · LMG Media',
}

const EFFECTIVE_DATE = 'October 26, 2026'

export default function PrivacyPage() {
  const mail = <a href={`mailto:${operator.email}`}>{operator.email}</a>

  return (
    <>
      <p className="legal-kicker">Privacy</p>
      <h1>Privacy Policy</h1>
      <p className="legal-note">Effective date and last updated: {EFFECTIVE_DATE}. This policy covers {operator.website} only.</p>

      <h2>1. Who we are</h2>
      <p>
        This website is operated by {operator.legalName} (&quot;{operator.brandName},&quot; &quot;we,&quot; &quot;us&quot; or &quot;our&quot;), {operatorAddress}. Questions about this policy or your information: {mail}.
      </p>
      <p>
        This policy explains what personal information we collect, how we use and share it, and the choices and rights you have, including under the California Online Privacy Protection Act (CalOPPA) and the California Consumer Privacy Act as amended by the California Privacy Rights Act (together, the &quot;CCPA&quot;), where they apply.
      </p>

      <h2>2. Information we collect</h2>
      <p><strong>Information you give us when you create an account:</strong></p>
      <ul>
        <li>your name and email address;</li>
        <li>your password, which we store only as a secure one-way hash (bcrypt), never in plain text;</li>
        <li>whether you chose to receive an email when the Pro version launches, and when you made that choice.</li>
      </ul>
      <p><strong>Information created when you use your account:</strong></p>
      <ul>
        <li>when you signed up and when you last logged in;</li>
        <li>whether access to the course and tools has been granted (we approve new accounts manually);</li>
        <li>if you reset your password, a hashed copy of the reset link, its one-hour expiry and whether it was used.</li>
      </ul>
      <p><strong>Information collected automatically:</strong></p>
      <ul>
        <li>
          standard connection data that web servers record, such as IP address, date and time of the request, the page requested, the referring page, and browser and device type;
        </li>
        <li>
          after a failed login, the IP address and email entered are kept in temporary memory for up to 15 minutes to slow down repeated attempts. This record is not saved to our database.
        </li>
      </ul>
      <p><strong>Information that stays on your device.</strong> Course progress, rate calculator inputs, negotiation text, contract drafts, deal notes and display settings are saved in your browser&apos;s local storage. They are not sent to our servers and we cannot see them. You can remove them by clearing this site&apos;s data in your browser.</p>
      <p>
        We do not collect payment information. This website has no checkout, no advertising pixels and no analytics tools.
      </p>

      <h2>3. How we use your information</h2>
      <ul>
        <li>to create and manage your account, log you in and keep you logged in;</li>
        <li>to review and approve access to the course and tools;</li>
        <li>to send emails you need, such as password reset links and a notice when your access is approved;</li>
        <li>if you opted in, to tell you by email when the Pro version launches;</li>
        <li>to operate, secure and troubleshoot the website, including preventing abuse and unauthorized access;</li>
        <li>to comply with legal obligations and enforce our <Link href="/terms">Terms of Use</Link>.</li>
      </ul>

      <h2>4. Cookies and tracking</h2>
      <p>
        We use one cookie, <code>lmg_session</code>, which is set after you log in. It keeps you logged in for up to 30 days and is required for the account to work. It is httpOnly and, on the live site, sent over HTTPS only. We do not use analytics, advertising or social media cookies.
      </p>
      <p>
        <strong>Do Not Track.</strong> We do not track you across third-party websites over time, and we do not allow third parties to collect personal information about your online activities on this website for that purpose. Because of this, we do not respond differently to browser &quot;Do Not Track&quot; signals. Because we do not sell or share personal information, there is nothing for a Global Privacy Control signal to opt you out of.
      </p>

      <h2>5. Service providers</h2>
      <p>We use a small number of service providers who process information on our behalf to run the website:</p>
      <ul>
        <li><strong>Website hosting:</strong> our hosting provider stores the website, the account database and server logs.</li>
        <li><strong>Email delivery:</strong> Resend (resend.com) sends account emails such as password resets and access notices.</li>
        <li>
          <strong>Video:</strong> course videos play in an embedded Bunny Stream player (bunny.net). When you play a video, Bunny receives your IP address and browser information to deliver the video.
        </li>
        <li>
          <strong>Fonts:</strong> the fonts used on the site are served from our own server. Some course ebook pages may also contact Google Fonts (fonts.googleapis.com, fonts.gstatic.com), which can receive your IP address.
        </li>
      </ul>

      <h2>6. How we share information</h2>
      <p>
        We share personal information only with the service providers listed above, as needed to provide the website; if required by law, court order or other legal process; to protect the rights, safety and property of {operator.brandName}, our users or others; or as part of a merger, sale of assets or similar transaction, in which case this policy will continue to apply to your information.
      </p>
      <p>
        <strong>We do not sell your personal information, and we do not share it for cross-context behavioral advertising</strong>, as those terms are defined in the CCPA. We have not done so in the past 12 months.
      </p>
      <p>
        <strong>California &quot;Shine the Light&quot; law.</strong> We do not disclose personal information to third parties for their own direct marketing purposes (California Civil Code §1798.83).
      </p>

      <h2>7. How long we keep information</h2>
      <ul>
        <li>Account information: until you ask us to delete your account or we delete it, for example after a serious breach of our terms.</li>
        <li>Your Pro-launch email choice: until you withdraw it or your account is deleted.</li>
        <li>Password reset links: they expire after one hour.</li>
        <li>Server logs: for a limited period kept by our hosting provider for security and troubleshooting.</li>
      </ul>
      <p>We may keep information longer where the law requires it or to resolve disputes.</p>

      <h2>8. Security</h2>
      <p>
        We use reasonable measures to protect your information, including password hashing, HTTPS and limits on repeated login attempts. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.
      </p>

      <h2>9. Your choices and rights</h2>
      <p>
        <strong>Everyone.</strong> You can update your name and your Pro-launch email choice in your account settings. You can also withdraw the Pro-launch email choice by emailing {mail}. You can ask us to access, correct or delete your account information by emailing {mail}.
      </p>
      <p><strong>California residents.</strong> Where the CCPA applies, you have the right to:</p>
      <ul>
        <li>know what personal information we collect, use and disclose about you, and receive a copy of it;</li>
        <li>request that we delete your personal information, subject to legal exceptions;</li>
        <li>request that we correct inaccurate personal information;</li>
        <li>opt out of the sale or sharing of personal information (we do not sell or share it);</li>
        <li>limit the use of sensitive personal information (we only use your password and account login to provide the service);</li>
        <li>not be discriminated against for exercising any of these rights.</li>
      </ul>
      <p>
        To make a request, email {mail} with the subject line &quot;Privacy Request.&quot; We will verify your request by confirming it from the email address on your account. You can use an authorized agent; we may ask for written proof of their authority and confirm your identity directly. We will respond within 45 days, or tell you if we need more time as the law allows.
      </p>
      <p>
        <strong>Categories of personal information (CCPA notice at collection).</strong> In the past 12 months we have collected: identifiers (name, email address, IP address); account login credentials (email and password, stored as a hash); and internet activity information (server connection data). Sources: you and your browser. Purposes: those listed in section 3. Disclosed for business purposes to: the service providers in section 5. Retention: as described in section 7.
      </p>

      <h2>10. Children</h2>
      <p>
        This website is intended for adults aged 18 and older. It is not directed to children, and we do not knowingly collect personal information from anyone under 18. If you believe a minor has created an account, please email {mail} and we will delete it.
      </p>

      <h2>11. Users outside the United States</h2>
      <p>
        {operator.legalName} is based in the United States. If you use this website from another country, your information will be processed in the United States and in other countries where our service providers operate, where data protection laws may differ from those in your country.
      </p>

      <h2>12. Changes to this policy</h2>
      <p>
        We may update this policy from time to time. We will post the updated version on this page and change the date at the top. If we make material changes, we will also notify you by email when we have your address.
      </p>

      <h2>13. Contact us</h2>
      <p>
        {operator.legalName}
        <br />
        {operatorAddress}
        <br />
        Email: {mail}
      </p>
      <p>
        See also our <Link href="/terms">Terms of Use</Link> and <Link href="/impressum">Legal Notice</Link>.
      </p>
    </>
  )
}
