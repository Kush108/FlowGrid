'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ContactSection() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const calendlyUrl =
    process.env.NEXT_PUBLIC_CALENDLY_URL || process.env.NEXT_PUBLIC_BOOKING_URL || 'https://calendly.com/flowgrid/15min';

  const openCalendly = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const w = window as unknown as { Calendly?: { initPopupWidget: (opts: { url: string }) => void } };
    if (w.Calendly?.initPopupWidget) {
      w.Calendly.initPopupWidget({ url: calendlyUrl });
      return;
    }
    window.open(calendlyUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 30% 25%, rgba(34,197,94,.08), rgba(34,197,94,0) 55%)',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 relative">
        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <div className="text-xs tracking-[0.18em] uppercase text-brand-muted">GET STARTED</div>
          <h2 className="font-[var(--font-display)] mt-3 leading-tight" style={{ fontSize: 'clamp(32px, 5vw, 48px)' }}>
            Your demo is <br />
            48 hours away.
          </h2>
          <p className="mt-4 text-brand-muted max-w-3xl mx-auto">
            Tell us about your team. We’ll build something real before you spend a dollar.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            className="rounded-2xl p-6 border border-brand-border bg-brand-surface shadow-[0_12px_30px_rgba(0,0,0,.25)]"
          >
            <div className="font-semibold text-brand-text/90">Request Your Free Demo</div>
            <div className="mt-3 flex flex-col sm:flex-row gap-2">
              <a
                className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-white/20 text-brand-text/90 hover:border-white/30 hover:bg-white/5 transition-colors"
                href={calendlyUrl}
                onClick={openCalendly}
              >
                Book a 15-min call
              </a>
              <a
                className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-brand-green/10 text-brand-green border border-brand-green/25"
                href="mailto:hello@flowgrid.ca"
              >
                Or email us
              </a>
            </div>
            <form
              className="mt-5 space-y-3"
              onSubmit={async (e) => {
                e.preventDefault();
                if (sending) return;
                setSending(true);
                setSent(false);
                setError(null);
                const form = e.currentTarget;
                try {
                  const formData = new FormData(form);
                  const name = String(formData.get('name') ?? '').trim();
                  const company = String(formData.get('company') ?? '').trim();
                  const email = String(formData.get('email') ?? '').trim();
                  const phone = String(formData.get('phone') ?? '').trim();
                  const industry = String(formData.get('industry') ?? '').trim();
                  const staffCount = String(formData.get('staffCount') ?? '').trim();
                  const message = String(formData.get('message') ?? '').trim();
                  const website = String(formData.get('website') ?? '').trim(); // honeypot

                  if (!name || !company || !email || !industry || !staffCount) {
                    setError('Please fill in the required fields.');
                    return;
                  }

                  const res = await fetch('/api/intake', {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify({
                      name,
                      email,
                      phone: phone || null,
                      company,
                      industry,
                      staffCount,
                      message: message || null,
                      website: website || null,
                      systemName: 'FieldTrack',
                      source: 'contact',
                    }),
                  });

                  if (res.ok) {
                    form.reset();
                    setSent(true);
                  } else {
                    const data = (await res.json().catch(() => null)) as { error?: string } | null;
                    if (res.status === 429 || data?.error === 'rate_limited') {
                      setError('Too many requests. Please wait a minute and try again, or email hello@flowgrid.ca.');
                    } else {
                      setError('Something went wrong. Please email hello@flowgrid.ca.');
                    }
                  }
                } catch {
                  setError('Network error. Please email hello@flowgrid.ca.');
                } finally {
                  setSending(false);
                }
              }}
            >
              {/* Honeypot (bots fill, humans don’t) */}
              <input
                name="website"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
                defaultValue=""
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  className="w-full px-4 py-3 rounded-xl bg-brand-bg/40 border border-brand-border focus:outline-none focus:border-brand-green/50 text-brand-text"
                  name="name"
                  placeholder="Your Name *"
                  required
                />
                <input
                  className="w-full px-4 py-3 rounded-xl bg-brand-bg/40 border border-brand-border focus:outline-none focus:border-brand-green/50 text-brand-text"
                  name="company"
                  placeholder="Organization / Company *"
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-xl bg-brand-bg/40 border border-brand-border focus:outline-none focus:border-brand-green/50 text-brand-text"
                  name="email"
                  placeholder="Email Address *"
                  required
                />
                <input
                  className="w-full px-4 py-3 rounded-xl bg-brand-bg/40 border border-brand-border focus:outline-none focus:border-brand-green/50 text-brand-text"
                  name="phone"
                  placeholder="Phone (optional)"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <select
                  className="w-full px-4 py-3 rounded-xl bg-brand-bg/40 border border-brand-border focus:outline-none focus:border-brand-green/50 text-brand-text"
                  name="industry"
                  required
                  defaultValue=""
                >
                  <option value="" disabled>
                    Industry *
                  </option>
                  <option>Home Care</option>
                  <option>HVAC & Plumbing</option>
                  <option>Cleaning Services</option>
                  <option>Security</option>
                  <option>Landscaping</option>
                  <option>Construction</option>
                  <option>Other Field Service</option>
                </select>
                <select
                  className="w-full px-4 py-3 rounded-xl bg-brand-bg/40 border border-brand-border focus:outline-none focus:border-brand-green/50 text-brand-text"
                  name="staffCount"
                  required
                  defaultValue=""
                >
                  <option value="" disabled>
                    Number of field staff *
                  </option>
                  <option>1–10</option>
                  <option>11–30</option>
                  <option>31–60</option>
                  <option>61–100</option>
                  <option>100+</option>
                </select>
              </div>
              <textarea
                className="w-full px-4 py-3 rounded-xl bg-brand-bg/40 border border-brand-border focus:outline-none focus:border-brand-green/50 text-brand-text resize-none"
                name="message"
                rows={5}
                placeholder="Describe your biggest operational headache (optional)&#10;e.g. We manage 40 care workers and can’t track mileage properly for reimbursement..."
              />

              <button
                type="submit"
                disabled={sending}
                className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-brand-green text-brand-bg font-semibold hover:bg-brand-green/90 transition-colors disabled:opacity-70"
              >
                {sending ? 'Sending…' : 'Build My Free Demo →'}
              </button>

              {error ? (
                <div className="text-sm text-red-200/90 text-center">{error}</div>
              ) : !sent ? (
                <div className="text-xs text-brand-muted text-center">
                  We’ll respond within 4 hours and have your demo ready in 48. No spam. No sales pressure.
                </div>
              ) : (
                <div className="text-sm text-brand-green text-center">
                  ✅ Request received! We’ll respond within 4 hours and have your demo ready in 48.
                </div>
              )}
            </form>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            className="space-y-4"
          >
            <div className="rounded-2xl p-6 border border-brand-border bg-brand-surface shadow-[0_12px_30px_rgba(0,0,0,.25)]">
              <div className="font-semibold text-brand-text/90">Quick contact</div>
              <div className="mt-4 space-y-2 text-brand-muted">
                <div>
                  📧{' '}
                  <a className="hover:text-brand-text transition-colors" href="mailto:hello@flowgrid.ca">
                    hello@flowgrid.ca
                  </a>
                </div>
                <div>🌐 flowgrid.ca</div>
              </div>
            </div>

            <div className="rounded-2xl p-6 border border-brand-border bg-brand-surface shadow-[0_12px_30px_rgba(0,0,0,.25)]">
              <div className="space-y-4">
                {[
                  {
                    t: 'No payment to see the demo',
                    b: 'A working prototype in 48 hours. Not a PDF. Not a mockup. A real app.',
                  },
                  {
                    t: 'Built around your team',
                    b: 'Your job types, team structure, reporting needs. The demo feels like yours because it is.',
                  },
                  {
                    t: 'No lock-in',
                    b: 'Month-to-month after launch. Cancel anytime. Your data is always yours to export.',
                  },
                ].map((x) => (
                  <div key={x.t} className="flex gap-3">
                    <span className="text-brand-green mt-0.5">✓</span>
                    <div>
                      <div className="font-semibold text-brand-text/90">{x.t}</div>
                      <div className="text-brand-muted mt-1">{x.b}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

