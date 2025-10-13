// app/privacy/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — M44',
  description: 'How M44 collects, uses, and protects your personal data under Singapore PDPA.',
}

export default function PrivacyPage() {
  const ACCENT = '#9000ff'

  return (
    <main className="min-h-screen bg-white">
      {/* Hero (plain white) */}
      <section
        className="relative px-6 pt-32 md:pt-48 pb-12 md:pb-14"
        style={{
          background: '#ffffff',
          color: '#111',
        }}
      >
        <div className="mx-auto max-w-5xl">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">Privacy Policy</h1>
          <p className="mt-3 text-base md:text-lg text-neutral-700">
            Effective Date: <strong>17 July 2025</strong>
          </p>
          <p className="mt-4 text-base md:text-lg text-neutral-700">
            M44 Collective Pte. Ltd. (&ldquo;M44&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is
            committed to protecting your personal data in accordance with the Personal Data Protection Act 2012
            (&ldquo;PDPA&rdquo;) of Singapore. This Privacy Policy explains how we collect, use, disclose, and safeguard
            your personal information when you interact with our website, services, or campaigns.
          </p>
        </div>
      </section>

      {/* Body (reduced top spacing) */}
      <section className="mx-auto max-w-5xl px-6 pt-6 md:pt-8 pb-10 md:pb-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* TOC (sticky on desktop) */}
          <aside className="md:col-span-4">
            <div className="sticky top-24 rounded-2xl border border-neutral-200 bg-white shadow-sm">
              <div className="p-5">
                <h2 className="text-sm font-semibold tracking-wide text-neutral-900">On this page</h2>
                <ul className="mt-3 space-y-2 text-sm">
                  {[
                    'Information We Collect',
                    'How We Collect Your Data',
                    'Purpose of Collecting Personal Data',
                    'Disclosure of Personal Data',
                    'Data Protection & Retention',
                    'Your Rights Under the PDPA',
                    'Cookies & Tracking',
                    'International Data Transfers',
                    'Data Breach Notification',
                    'Updates to this Privacy Policy',
                    'Contact Us',
                  ].map((label, i) => (
                    <li key={label}>
                      <a
                        href={`#s${i + 1}`}
                        className="hover:underline"
                        style={{ color: ACCENT }}
                      >
                        {i + 1}. {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* Content */}
          <article className="md:col-span-8">
            <div className="space-y-10 text-neutral-800">
              <section id="s1" aria-labelledby="s1-heading">
                <h3 id="s1-heading" className="text-xl md:text-2xl font-bold" style={{ color: ACCENT }}>
                  1. Information We Collect
                </h3>
                <ul className="mt-3 list-disc pl-6 space-y-2">
                  <li>
                    <strong>Identity Data:</strong> Name, NRIC/passport number (only where necessary), company name, designation.
                  </li>
                  <li>
                    <strong>Contact Data:</strong> Email address, phone number, billing and mailing address.
                  </li>
                  <li>
                    <strong>Transaction Data:</strong> Payment details, invoices, and records of services purchased.
                  </li>
                  <li>
                    <strong>Technical Data:</strong> IP address, browser type, device information, cookies, and analytics data.
                  </li>
                  <li>
                    <strong>Marketing &amp; Communications Data:</strong> Your preferences in receiving marketing materials,
                    responses to campaigns, and feedback.
                  </li>
                  <li>
                    <strong>Lead Data (for advertising campaigns we run):</strong> Information voluntarily provided via lead
                    forms (e.g., name, phone, email, service interest).
                  </li>
                </ul>
              </section>

              <section id="s2" aria-labelledby="s2-heading">
                <h3 id="s2-heading" className="text-xl md:text-2xl font-bold" style={{ color: ACCENT }}>
                  2. How We Collect Your Data
                </h3>
                <ul className="mt-3 list-disc pl-6 space-y-2">
                  <li>When you fill out a form on our website or advertisements.</li>
                  <li>When you contact us via phone, email, WhatsApp, or social media.</li>
                  <li>When you engage our marketing services.</li>
                  <li>Automatically, through cookies and analytics tools on our website.</li>
                  <li>
                    From third parties and partners (e.g., ad platforms, lead generation partners) where you have consented to sharing.
                  </li>
                </ul>
              </section>

              <section id="s3" aria-labelledby="s3-heading">
                <h3 id="s3-heading" className="text-xl md:text-2xl font-bold" style={{ color: ACCENT }}>
                  3. Purpose of Collecting Personal Data
                </h3>
                <ul className="mt-3 list-disc pl-6 space-y-2">
                  <li>To provide and manage our marketing and advertising services.</li>
                  <li>To respond to inquiries, schedule consultations, and process service requests.</li>
                  <li>To run advertising campaigns, generate and deliver leads, and share them with our clients (with your consent).</li>
                  <li>To send marketing updates, newsletters, and promotional materials (if you opted in).</li>
                  <li>To process payments and maintain proper accounting and audit records.</li>
                  <li>To improve our website, user experience, and advertising effectiveness.</li>
                  <li>To comply with legal obligations and regulatory requirements in Singapore.</li>
                </ul>
              </section>

              <section id="s4" aria-labelledby="s4-heading">
                <h3 id="s4-heading" className="text-xl md:text-2xl font-bold" style={{ color: ACCENT }}>
                  4. Disclosure of Personal Data
                </h3>
                <ul className="mt-3 list-disc pl-6 space-y-2">
                  <li><strong>Service Providers:</strong> IT, hosting, analytics, payment processors, and CRM tools we use.</li>
                  <li><strong>Clients:</strong> If you submitted your details through an M44 advertising campaign, we will share them with the relevant client running the campaign.</li>
                  <li><strong>Regulators &amp; Authorities:</strong> If required under Singapore law.</li>
                  <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets.</li>
                </ul>
              </section>

              <section id="s5" aria-labelledby="s5-heading">
                <h3 id="s5-heading" className="text-xl md:text-2xl font-bold" style={{ color: ACCENT }}>
                  5. Data Protection &amp; Retention
                </h3>
                <ul className="mt-3 list-disc pl-6 space-y-2">
                  <li>We adopt reasonable security measures (encryption, restricted access, secure servers) to protect your data.</li>
                  <li>Personal data will only be retained as long as necessary to fulfil the purpose it was collected for, or as required by law.</li>
                  <li>Once data is no longer needed, it will be securely deleted or anonymised.</li>
                </ul>
              </section>

              <section id="s6" aria-labelledby="s6-heading">
                <h3 id="s6-heading" className="text-xl md:text-2xl font-bold" style={{ color: ACCENT }}>
                  6. Your Rights Under the PDPA
                </h3>
                <ul className="mt-3 list-disc pl-6 space-y-2">
                  <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
                  <li><strong>Correction:</strong> Update or correct your personal data if it is inaccurate.</li>
                  <li><strong>Withdrawal of Consent:</strong> Opt out from receiving marketing communications or revoke consent for data processing.</li>
                  <li><strong>Deletion:</strong> Request deletion of personal data, subject to legal and contractual limitations.</li>
                </ul>
                <p className="mt-3">
                  All requests can be made by contacting us at{' '}
                  <a href="mailto:support@m44.io" style={{ color: ACCENT }}>support@m44.io</a>.
                </p>
              </section>

              <section id="s7" aria-labelledby="s7-heading">
                <h3 id="s7-heading" className="text-xl md:text-2xl font-bold" style={{ color: ACCENT }}>
                  7. Cookies &amp; Tracking
                </h3>
                <p className="mt-3">
                  Our website uses cookies, pixels, and tracking technologies to:
                </p>
                <ul className="mt-3 list-disc pl-6 space-y-2">
                  <li>Monitor site traffic and user activity.</li>
                  <li>Improve user experience and ad targeting.</li>
                  <li>Measure advertising campaign effectiveness.</li>
                </ul>
                <p className="mt-3 text-neutral-700">
                  You may disable cookies via your browser, but this may affect website functionality.
                  You can also manage your preferences at any time using the &ldquo;Manage Cookies&rdquo; option on our site.
                </p>
              </section>

              <section id="s8" aria-labelledby="s8-heading">
                <h3 id="s8-heading" className="text-xl md:text-2xl font-bold" style={{ color: ACCENT }}>
                  8. International Data Transfers
                </h3>
                <p className="mt-3">
                  If your personal data is transferred outside of Singapore, we will ensure it is protected with appropriate
                  safeguards in accordance with PDPA requirements.
                </p>
              </section>

              <section id="s9" aria-labelledby="s9-heading">
                <h3 id="s9-heading" className="text-xl md:text-2xl font-bold" style={{ color: ACCENT }}>
                  9. Data Breach Notification
                </h3>
                <p className="mt-3">
                  In the unlikely event of a data breach that risks your personal data, we will notify you and the Personal Data
                  Protection Commission (PDPC) as required by law.
                </p>
              </section>

              <section id="s10" aria-labelledby="s10-heading">
                <h3 id="s10-heading" className="text-xl md:text-2xl font-bold" style={{ color: ACCENT }}>
                  10. Updates to this Privacy Policy
                </h3>
                <p className="mt-3">
                  We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised
                  “Effective Date”.
                </p>
              </section>

              <section id="s11" aria-labelledby="s11-heading">
                <h3 id="s11-heading" className="text-xl md:text-2xl font-bold" style={{ color: ACCENT }}>
                  11. Contact Us
                </h3>
                <p className="mt-3">
                  If you have any questions about this Privacy Policy or how your data is handled, please contact us:
                </p>
                <address className="not-italic mt-2 leading-relaxed">
                  M44 Collective Pte. Ltd.<br />
                  68 Circular Road, #0201, Singapore 049422<br />
                  Email: <a href="mailto:support@m44.io" style={{ color: ACCENT }}>support@m44.io</a>
                </address>
              </section>

              <hr className="my-8 border-neutral-200" />

              <p className="text-xs text-neutral-500">
                <em>Note:</em> This page is for general information and reflects PDPA-aligned practices. It is not legal advice.
              </p>
            </div>
          </article>
        </div>
      </section>
    </main>
  )
}
