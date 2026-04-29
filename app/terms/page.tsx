import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms',
  description: 'FlowGrid terms of use.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-brand-bg text-brand-text">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="font-[var(--font-display)] text-4xl leading-tight">Terms</h1>
        <p className="mt-4 text-brand-muted">
          These are simple terms for using this website and requesting a demo. If anything here is unclear, email us and we’ll clarify.
        </p>

        <section className="mt-10 space-y-4 text-brand-text/90 leading-relaxed">
          <div>
            <div className="font-semibold">Demo-first approach</div>
            <p className="mt-2 text-brand-muted">
              If we agree to build a demo, we’ll do our best to deliver a working prototype quickly. The demo is for evaluation and may not include
              all production features, integrations, or compliance requirements.
            </p>
          </div>

          <div>
            <div className="font-semibold">No warranties</div>
            <p className="mt-2 text-brand-muted">
              This website and any demo links are provided “as is.” We make no guarantees that a demo will meet every requirement until we scope and
              agree on a build.
            </p>
          </div>

          <div>
            <div className="font-semibold">Acceptable use</div>
            <p className="mt-2 text-brand-muted">
              Don’t misuse the site, try to break it, or submit harmful content. If we detect abuse, we may block requests.
            </p>
          </div>

          <div>
            <div className="font-semibold">Contact</div>
            <p className="mt-2 text-brand-muted">
              Questions? Email{' '}
              <a className="text-brand-text/90 underline underline-offset-4 hover:text-brand-text" href="mailto:hello@flowgrid.ca">
                hello@flowgrid.ca
              </a>
              .
            </p>
          </div>
        </section>

        <div className="mt-10 text-xs text-brand-muted">Last updated: {new Date().toISOString().slice(0, 10)}</div>
      </div>
    </main>
  );
}

