import type { Metadata } from 'next'
import Link from 'next/link'
import { operator } from '@/lib/legal/operator'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung · LMG Media',
}

export default function PrivacyPage() {
  return (
    <>
      <p className="legal-kicker">Datenschutz</p>
      <h1>Datenschutzerklärung</h1>
      <p className="legal-note">
        Fassung 1.0, gültig ab 21. Oktober 2026. Der deutsche Text ist die Fassung. Die englische Übersetzung steht darunter und sagt dasselbe. Diese Erklärung betrifft nur creators.lmg.media.
      </p>

      <h2>1. Verantwortlicher</h2>
      <p>
        {operator.name}, {operator.street}, {operator.postcode} {operator.city}, {operator.countryDe}. Geschäftsbezeichnung „{operator.tradingName}“ (keine eingetragene Firma). E-Mail:{' '}
        <a href={`mailto:${operator.email}`}>{operator.email}</a>. Impressum: <Link href="/impressum">/impressum</Link>.
      </p>
      <p>Ein Datenschutzbeauftragter ist nicht bestellt.</p>

      <h2>2. Worum es geht</h2>
      <p>
        Diese Erklärung beschreibt, welche Daten diese Website verarbeitet: das Nutzerkonto, die optionale Mitteilung zum Start einer Pro-Version, die Sitzung, E-Mails, die der Anwendungscode versendet, und Daten, die nur in Ihrem Browser liegen. Es gibt auf dieser Website kein Bezahlmodul, keine Werbe-Pixel und kein Analysewerkzeug.
      </p>

      <h2>3. Besuch der Website und Hosting</h2>
      <p>
        Beim Aufruf können die üblichen Verbindungsdaten anfallen: IP-Adresse, Datum und Uhrzeit, aufgerufene Adresse, Referrer sowie Angaben zu Browser und Gerät. Der Anwendungscode schreibt selbst kein Zugriffsprotokoll. Die Projektnotizen beschreiben den Betrieb als Node.js-Anwendung auf einem eigenen Server (Webuzo, davor nginx). Name des Hosting-Unternehmens, Land des Servers und Aufbewahrungsdauer solcher Protokolle stehen nicht im Code.
      </p>
      <p>
        Zweck ist der Betrieb und die Sicherheit der Website. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer erreichbaren und sicheren Website).
      </p>
      <p>
        Schlägt eine Anmeldung fehl, merkt sich die Anwendung IP-Adresse und E-Mail-Adresse bis zu 15 Minuten im Arbeitsspeicher, um wiederholte Versuche zu bremsen. Dieser Eintrag wird nicht in die Datenbank geschrieben und entfällt beim Neustart des Prozesses.
      </p>

      <h2>4. Nutzerkonto</h2>
      <p>Wenn Sie ein Konto anlegen, speichern wir in einer SQLite-Datenbank auf dem Server:</p>
      <ul>
        <li>Name und E-Mail-Adresse;</li>
        <li>das Passwort nur als bcrypt-Hash (Kostenfaktor 12), nicht im Klartext;</li>
        <li>ob der Zugang freigegeben ist (neue Konten starten ohne Freigabe; die Freigabe erfolgt manuell);</li>
        <li>Zeitpunkt der Registrierung und, nach der ersten Anmeldung, den letzten Login;</li>
        <li>Ihre Entscheidung zur Pro-Start-E-Mail und, falls Sie zugestimmt haben, den Zeitpunkt dieser Zustimmung (siehe Abschnitt 5).</li>
      </ul>
      <p>
        Zweck ist das Konto, der Kurs ab Modul 2 und die DealHub-Werkzeuge, sobald der Zugang freigegeben ist. Modul 1 ist ohne Konto erreichbar. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertrag über die unentgeltliche Nutzung, einschließlich der Schritte davor).
      </p>
      <p>
        Das Konto bleibt gespeichert, bis Sie die Löschung per E-Mail an {operator.email} verlangen oder ein Administrator das Konto löscht. In den Kontoeinstellungen gibt es keinen Löschknopf. Eine Aufbewahrungsfrist für Sicherungen ist im Code nicht festgelegt. Rechnungen stellen wir über diese Website nicht aus.
      </p>
      <p>
        Für ein neues Passwort speichern wir nur einen Hash des Links, den Ablaufzeitpunkt (eine Stunde) und ob der Link benutzt wurde. Den Link selbst speichern wir nicht.
      </p>
      <p>
        Fortschritt im Kurs, Rechnereingaben, Verhandlungstexte, Vertragsentwürfe und Deal-Notizen liegen in Ihrem Browser (localStorage), nicht auf dem Server. Schlüssel sind unter anderem <code>lmg-lesson-progress-v1-*</code>, <code>dealhub-calculator</code>, <code>dealhub-negotiation</code>, <code>dealhub-contract</code>, <code>dealhub-contract-draft</code>, <code>dealhub-deal</code>, <code>dealhub-theme</code> und <code>dealhub-sidebar</code>. Die Funktion „Vertrag speichern“ schreibt nicht in die Datenbank. Sie löschen diese Daten, indem Sie die Website-Daten in Ihrem Browser löschen. Wir erhalten sie nicht.
      </p>

      <h2>5. E-Mail zum Start der Pro-Version</h2>
      <p>
        Die Anmeldung enthält ein eigenes, nicht vorausgewähltes Kästchen mit dem Wortlaut: „Tell me by email when the Pro version launches.“ Es ist nicht die Zustimmung zu diesen Bedingungen. Wenn Sie es ankreuzen, speichern wir das mit Ihrem Konto (ja/nein) und den Zeitpunkt der Zustimmung. Eine IP-Adresse und eine zweite Bestätigungsmail speichern wir dazu nicht. Eine solche E-Mail wird derzeit nicht versendet; es gibt auch keinen Newsletter.
      </p>
      <p>
        Zweck ist, Sie zu benachrichtigen, wenn eine Pro-Version startet. Rechtsgrundlage: Ihre Einwilligung, Art. 6 Abs. 1 lit. a DSGVO. Sie können das Kästchen in den Kontoeinstellungen wieder abwählen. Dann wird die Entscheidung auf „nein“ gesetzt und der Zeitpunkt gelöscht. Sie können uns auch an {operator.email} schreiben. Ein Abmeldelink in einer Pro-Mail ist noch nicht gebaut, weil diese Mail noch nicht versendet wird.
      </p>
      <p>
        Die Entscheidung bleibt mit dem Konto gespeichert, bis Sie sie zurücknehmen oder das Konto gelöscht wird.
      </p>

      <h2>6. E-Mails, die der Code versendet</h2>
      <p>
        Der Code kann E-Mails senden: einen Link zum Zurücksetzen des Passworts an Sie, eine Nachricht an den Betreiber, wenn jemand ein Konto anlegt, und eine Nachricht an Sie, wenn der Zugang freigegeben wird. Dafür ist die Anwendung auf den Dienst Resend (resend.com) ausgelegt, sofern ein API-Schlüssel gesetzt ist. Ohne Schlüssel wird die Nachricht nur auf dem Server protokolliert und nicht versendet. Ob auf dem Live-Server ein Schlüssel gesetzt ist und wo Resend die Nachricht speichert, steht nicht in diesem Repository.
      </p>

      <h2>7. Cookies</h2>
      <p>
        Nach der Anmeldung setzen wir ein Cookie namens <code>lmg_session</code>. Es ist httpOnly, gilt 30 Tage, SameSite lax, und in der Produktionsumgebung nur über HTTPS. Es enthält eine Sitzungsmarke mit Nutzer-ID, E-Mail-Adresse und einem Hinweis auf die Freigabe. Ob der Kurs offen ist, lesen wir jeweils neu aus der Datenbank. Das Cookie ist für die Anmeldung erforderlich. Es gibt kein Analyse-Cookie und kein Einwilligungsbanner, weil wir keine Statistik- oder Werbe-Cookies setzen.
      </p>

      <h2>8. Schriften und Videos</h2>
      <p>
        Die Schriften der Oberfläche (Manrope, Playfair Display, DM Sans) werden beim Bauen der Website geladen und von dieser Website selbst ausgeliefert. Ein normaler Seitenaufruf kontaktiert dafür Google Fonts nicht. In den E-Book-Seiten steht ein Verbindungshinweis auf fonts.googleapis.com und fonts.gstatic.com; die Schriftdateien sind in der Seite eingebettet. Ob der Browser Google dabei noch kontaktiert, ist im Code nicht abschließend zu sehen.
      </p>
      <p>
        Kursvideos laufen in einem eingebetteten Player von Bunny Stream (<code>player.mediadelivery.net</code>, Bibliothek 708086). Beim Abspielen kann Bunny Ihre IP-Adresse und Browserdaten erhalten. Vertrag, Serverstandort und Speicherdauer von Bunny stehen nicht in diesem Repository.
      </p>

      <h2>9. Empfänger</h2>
      <p>
        Die Kontodaten liegen in der SQLite-Datei auf dem Server dieser Website. E-Mails gehen, wenn der Schlüssel gesetzt ist, über Resend. Videodaten beim Abspielen gehen an Bunny Stream. Eine Übermittlung an Supabase, Stripe, Google Analytics, Google Ads oder Meta findet durch diese Anwendung nicht statt. Kopien der genannten Angaben erhalten Sie auf Anfrage an {operator.email}, soweit wir sie haben.
      </p>

      <h2>10. Ihre Rechte</h2>
      <p>
        Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch, einschließlich Widerspruch gegen Direktwerbung, sowie das Recht, eine Einwilligung zu widerrufen. Schreiben Sie an {operator.email}. Wir antworten innerhalb eines Monats.
      </p>
      <p>
        Beschwerde: Österreichische Datenschutzbehörde, Barichgasse 40–42, 1030 Wien, dsb@dsb.gv.at, www.dsb.gv.at. Sie können sich auch an die Aufsichtsbehörde an Ihrem Aufenthalts- oder Arbeitsort wenden.
      </p>

      <h2>11. Pflicht zur Angabe und automatisierte Entscheidungen</h2>
      <p>
        Sie müssen uns keine Daten geben. Ohne Name, E-Mail-Adresse und Passwort können wir kein Konto anlegen. Modul 1 und der kurze Honorarrechner in diesem Modul brauchen kein Konto.
      </p>
      <p>
        Wir treffen keine Entscheidungen mit rechtlicher oder ähnlich erheblicher Wirkung, die nur auf automatisierter Verarbeitung beruhen. Der Honorarrechner schätzt einen Betrag aus den Werten, die Sie eingeben. Er entscheidet nichts über Sie.
      </p>

      <h2>12. Änderungen</h2>
      <p>
        Fassung 1.0, gültig ab 21. Oktober 2026. Wesentliche Änderungen zeigen wir auf dieser Seite an. Eine E-Mail dazu versenden wir, wenn wir Ihre Adresse dafür haben und die Änderung Sie betrifft.
      </p>

      <h2>English</h2>
      <p className="legal-note">Courtesy translation of the German text above. Version 1.0, valid from 21 October 2026. This policy covers creators.lmg.media only.</p>

      <h3>1. Controller</h3>
      <p>
        {operator.name}, {operator.street}, {operator.postcode} Vienna, {operator.countryEn}, trading as {operator.tradingName} (not a registered company). Email:{' '}
        <a href={`mailto:${operator.email}`}>{operator.email}</a>. Legal notice: <Link href="/impressum">/impressum</Link>. A data protection officer is not appointed.
      </p>

      <h3>2. What this policy covers</h3>
      <p>
        It covers this website: the account, the optional Pro-launch email choice, the session, email the application is written to send, and data that stays in your browser. This site has no payment module, no advertising pixels and no analytics tool.
      </p>

      <h3>3. Visits and hosting</h3>
      <p>
        A visit can produce the usual connection data: IP address, date and time, URL, referrer, and browser and device details. The application code does not write its own access log. Project notes describe the live site as a Node.js app on a server managed with Webuzo, behind nginx. The hosting company&apos;s name, the server&apos;s country and how long those logs are kept are not in the code.
      </p>
      <p>
        Purpose: running and securing the site. Legal basis: Art. 6(1)(f) GDPR (legitimate interest in a working, secure website).
      </p>
      <p>
        After a failed login, the application keeps the IP address and email in memory for up to 15 minutes to slow repeated attempts. That record is not written to the database and is dropped when the process restarts.
      </p>

      <h3>4. Account</h3>
      <p>If you create an account, we store the following in a SQLite database on this server:</p>
      <ul>
        <li>name and email address;</li>
        <li>the password only as a bcrypt hash (cost 12), not in plain text;</li>
        <li>whether access has been granted (new accounts start without access; approval is manual);</li>
        <li>when you signed up and, after the first login, the last login time;</li>
        <li>your Pro-launch email choice and, if you opted in, the time of that consent (section 5).</li>
      </ul>
      <p>
        Purpose: the account, the course from Module 2, and the DealHub tools once access is granted. Module 1 does not need an account. Legal basis: Art. 6(1)(b) GDPR (contract for free use, including steps before it).
      </p>
      <p>
        We keep the account until you email {operator.email} and ask us to delete it, or an administrator deletes it. Account settings have no delete button. The code does not set a backup retention period. This website does not issue invoices.
      </p>
      <p>
        For a new password we store only a hash of the link, the expiry (one hour) and whether the link was used. We do not store the link itself.
      </p>
      <p>
        Course progress, calculator inputs, negotiation text, contract drafts and deal notes stay in your browser (localStorage), not on the server. Keys include <code>lmg-lesson-progress-v1-*</code>, <code>dealhub-calculator</code>, <code>dealhub-negotiation</code>, <code>dealhub-contract</code>, <code>dealhub-contract-draft</code>, <code>dealhub-deal</code>, <code>dealhub-theme</code> and <code>dealhub-sidebar</code>. &quot;Save contract&quot; does not write to the database. Clear them by clearing this site&apos;s data in your browser. We do not receive them.
      </p>

      <h3>5. Email when Pro launches</h3>
      <p>
        Sign-up has a separate checkbox, unticked by default, with the words: &quot;Tell me by email when the Pro version launches.&quot; It is not your agreement to the terms. If you tick it, we store that choice on your account (yes or no) and the time of the consent. We do not store an IP address or send a second confirmation email for it. That launch email is not being sent, and there is no newsletter.
      </p>
      <p>
        Purpose: to tell you when a Pro version launches. Legal basis: your consent, Art. 6(1)(a) GDPR. You can untick the box in account settings. That sets the choice to no and clears the timestamp. You can also email {operator.email}. An unsubscribe link inside a Pro email is not built, because that email is not sent yet.
      </p>
      <p>The choice stays with the account until you withdraw it or the account is deleted.</p>

      <h3>6. Email the code can send</h3>
      <p>
        The code can send a password-reset link to you, a notice to the operator when someone signs up, and a notice to you when access is granted. It is written to use Resend (resend.com) when an API key is set. Without a key, the message is only logged on the server and is not sent. Whether the live server has a key, and where Resend stores the message, is not in this repository.
      </p>

      <h3>7. Cookies</h3>
      <p>
        After login we set a cookie named <code>lmg_session</code>. It is httpOnly, lasts 30 days, SameSite lax, and is HTTPS-only in production. It carries a session token with your user id, email and an access hint. Whether the course is open is read again from the database. The cookie is required for login. There is no analytics cookie and no consent banner, because we do not set statistics or advertising cookies.
      </p>

      <h3>8. Fonts and video</h3>
      <p>
        The interface fonts (Manrope, Playfair Display, DM Sans) are fetched when the site is built and then served by this website. A normal page view does not contact Google Fonts for them. Ebook pages include a connection hint to fonts.googleapis.com and fonts.gstatic.com; the font files are bundled in the page. The code does not show for certain whether the browser still contacts Google.
      </p>
      <p>
        Course videos play in an embedded Bunny Stream player (<code>player.mediadelivery.net</code>, library 708086). When you play a video, Bunny can receive your IP address and browser details. Bunny&apos;s contract, server location and retention period are not in this repository.
      </p>

      <h3>9. Recipients</h3>
      <p>
        Account data sits in the SQLite file on this site&apos;s server. Email goes through Resend when the key is set. Playback data goes to Bunny Stream. This application does not send data to Supabase, Stripe, Google Analytics, Google Ads or Meta. Ask {operator.email} for a copy of the details above, where we hold them.
      </p>

      <h3>10. Your rights</h3>
      <p>
        You can ask for access, correction, deletion, restriction and portability, object to processing including direct marketing, and withdraw consent. Email {operator.email}. We reply within one month.
      </p>
      <p>
        Complaints: Austrian Data Protection Authority, Barichgasse 40–42, 1030 Vienna, dsb@dsb.gv.at, www.dsb.gv.at. You can also contact the authority where you live or work.
      </p>

      <h3>11. Whether you must provide data, and automated decisions</h3>
      <p>
        You do not have to give us data. Without a name, email and password we cannot create an account. Module 1 and the short rate estimate inside that module do not need an account.
      </p>
      <p>
        We do not make decisions with legal or similarly significant effects based solely on automated processing. The rate calculator estimates a figure from the values you enter. It does not decide anything about you.
      </p>

      <h3>12. Changes</h3>
      <p>
        Version 1.0, valid from 21 October 2026. We will show material changes on this page. We will email you about a change when we have your address and the change affects you.
      </p>
    </>
  )
}
