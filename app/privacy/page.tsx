import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'FlowGrid privacy policy.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-brand-bg text-brand-text">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="font-[var(--font-display)] text-4xl leading-tight">Privacy Policy</h1>
        <p className="mt-4 text-brand-muted">
          We keep this simple. We only collect what we need to build your demo and respond to you.
        </p>

        <section className="mt-10 space-y-4 text-brand-text/90 leading-relaxed">
          <div>
            <div className="font-semibold">What we collect</div>
            <p className="mt-2 text-brand-muted">
              If you submit a form on this website, we may collect your name, email, company, phone number, and the details you share about your
              workflow.
            </p>
          </div>

          <div>
            <div className="font-semibold">How we use it</div>
            <p className="mt-2 text-brand-muted">
              We use your information to contact you, build a demo, and improve our onboarding. We do not sell your personal information.
            </p>
          </div>

          <div>
            <div className="font-semibold">Analytics</div>
            <p className="mt-2 text-brand-muted">
              We may use privacy-friendly analytics to understand how the site is used (for example, which pages are visited). This helps us improve
              performance and clarity.
            </p>
          </div>

          <div>
            <div className="font-semibold">Data retention</div>
            <p className="mt-2 text-brand-muted">
              We keep form submissions as long as needed to follow up and deliver your demo. You can request deletion at any time.
            </p>
          </div>

          <div>
            <div className="font-semibold">Contact</div>
            <p className="mt-2 text-brand-muted">
              Email{' '}
              <a className="text-brand-text/90 underline underline-offset-4 hover:text-brand-text" href="mailto:hello@flowgrid.ca">
                hello@flowgrid.ca
              </a>{' '}
              for privacy questions or requests.
            </p>
          </div>
        </section>

        <div className="mt-10 text-xs text-brand-muted">Last updated: {new Date().toISOString().slice(0, 10)}</div>
      </div>
    </main>
  );
}

