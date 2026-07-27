'use client';

import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

function TrustItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-brand-muted">
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-green" aria-hidden="true" />
      <span>{text}</span>
    </div>
  );
}

const DEMO_LINKS = [
  { label: 'SummitFlow HVAC Demo', href: '/summitflow/login', tag: 'HVAC prototype' },
  { label: 'Sphinx Ops Demo', href: '/sphinxops/login', tag: 'Social services (live)' },
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [leadCompany, setLeadCompany] = useState('');
  const [leadContactName, setLeadContactName] = useState('');
  const [leadCity, setLeadCity] = useState('Edmonton');
  const [copied, setCopied] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  useEffect(() => setMounted(true), []);

  const primaryDemoUrl = '/summitflow/login';
  const outreachDemoUrl = useMemo(() => {
    const base = 'https://www.flowgrid.ca/summitflow/login';
    const company = leadCompany.trim();
    const params = new URLSearchParams();
    if (company) params.set('company', company);
    const query = params.toString();
    return query ? `${base}?${query}` : base;
  }, [leadCompany]);

  const outreachSubject = useMemo(() => {
    const company = leadCompany.trim() || 'your HVAC shop';
    return `How does ${company} handle dispatch when it hits -30°C?`;
  }, [leadCompany]);

  const outreachEmailBody = useMemo(() => {
    const contact = leadContactName.trim() || 'there';
    const company = leadCompany.trim() || 'your team';
    const city = leadCity.trim() || 'Edmonton';

    return [
      `Hi ${contact},`,
      '',
      `I noticed ${company} runs HVAC crews in ${city}.`,
      "I'm guessing dispatch, mileage, and payroll are still split across WhatsApp, whiteboards, and a generic app that wasn't built for HVAC.",
      '',
      'I built FlowGrid for exactly this — dispatch, fleet, job logs, and payroll export in one platform, priced for Alberta HVAC margins.',
      'We build you a working branded demo in 48 hours before you pay anything.',
      '',
      `Your personalized demo: ${outreachDemoUrl}`,
      'Book a 15-minute walkthrough: https://calendly.com/flowgrid/15min',
      '',
      '- Kushal, FlowGrid',
    ].join('\n');
  }, [leadCity, leadCompany, leadContactName, outreachDemoUrl]);

  const outreachMailtoHref = useMemo(() => {
    const subject = encodeURIComponent(outreachSubject);
    const body = encodeURIComponent(outreachEmailBody);
    return `mailto:?subject=${subject}&body=${body}`;
  }, [outreachEmailBody, outreachSubject]);

  async function copyOutreachUrl() {
    try {
      await navigator.clipboard.writeText(outreachDemoUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  async function copyOutreachEmail() {
    try {
      await navigator.clipboard.writeText(`Subject: ${outreachSubject}\n\n${outreachEmailBody}`);
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 1800);
    } catch {
      setEmailCopied(false);
    }
  }

  return (
    <section id="top" className="relative min-h-[92vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(14,165,233,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.10) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            animation: 'fg-grid 28s linear infinite',
            maskImage: 'radial-gradient(circle at 50% 35%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 72%)',
          }}
        />
        <div
          className="absolute -top-24 -right-24 w-[520px] h-[520px] rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(249,115,22,.10), rgba(249,115,22,0) 62%)',
          }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-[520px] h-[520px] rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(14,165,233,.11), rgba(14,165,233,0) 62%)',
          }}
        />
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-green/25 bg-brand-green/10 text-brand-green text-xs tracking-[0.18em] uppercase"
            >
              <span
                aria-hidden="true"
                className="inline-block w-1.5 h-1.5 rounded-full bg-brand-green"
                style={{ boxShadow: '0 0 0 rgba(34,197,94,0.45)', animation: 'pulse 1.8s ease-in-out infinite' }}
              />
              Built for Alberta HVAC · Demo first
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
              }}
              className="font-[var(--font-display)] mt-5 leading-[0.95]"
              style={{ fontSize: 'clamp(36px, 7.5vw, 72px)' }}
            >
              {['Your HVAC dispatch,', 'fleet, and payroll —', 'finally in one place.'].map((line, idx) => (
                <motion.div
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } },
                  }}
                >
                  {idx === 2 ? (
                    <>
                      finally in <span className="text-brand-green italic">one place</span>.
                    </>
                  ) : (
                    line
                  )}
                </motion.div>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
              className="mt-5 text-brand-muted leading-relaxed"
              style={{ fontSize: 'clamp(16px, 2.2vw, 20px)' }}
            >
              FlowGrid builds operational software for HVAC companies — cold-snap dispatch, van tracking, job logs, and
              payroll export.
              <span className="text-brand-text/80"> We build your working demo first.</span> You only pay when you love it.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
              className="mt-7 flex flex-col sm:flex-row gap-3"
            >
              <a
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-brand-green text-brand-bg font-semibold hover:bg-brand-green/90 transition-colors"
                href={primaryDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Try the HVAC Demo →
              </a>
              <a
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-full border border-white/20 text-brand-text/90 hover:border-white/30 hover:bg-white/5 transition-colors"
                href="#contact"
              >
                Get Your Free Demo Built
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.58, ease: 'easeOut' }}
              className="mt-4 flex flex-wrap gap-2"
            >
              {DEMO_LINKS.map((d) => (
                <a
                  key={d.href}
                  href={d.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-border bg-brand-surface/60 text-xs text-brand-muted hover:text-brand-text hover:border-brand-green/30 transition-colors"
                >
                  <span className="text-brand-green">●</span>
                  {d.label}
                  <span className="text-brand-muted/70">({d.tag})</span>
                </a>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65, ease: 'easeOut' }}
              className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-4"
            >
              <TrustItem text="No credit card" />
              <TrustItem text="No contract" />
              <TrustItem text="Demo delivered in 48 hours" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.78, ease: 'easeOut' }}
              className="mt-6 rounded-2xl border border-brand-border bg-brand-surface/80 p-4"
            >
              <div className="text-xs tracking-[0.14em] uppercase text-brand-muted">Outreach Link Generator</div>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  value={leadCompany}
                  onChange={(e) => setLeadCompany(e.target.value)}
                  placeholder="Company name (e.g., Arctic Air HVAC)"
                  className="w-full rounded-xl border border-white/15 bg-brand-bg/40 px-3 py-2.5 text-sm text-brand-text placeholder:text-brand-muted/80 outline-none focus:border-brand-green/45"
                />
                <input
                  type="text"
                  value={leadContactName}
                  onChange={(e) => setLeadContactName(e.target.value)}
                  placeholder="Contact name (optional)"
                  className="w-full rounded-xl border border-white/15 bg-brand-bg/40 px-3 py-2.5 text-sm text-brand-text placeholder:text-brand-muted/80 outline-none focus:border-brand-green/45"
                />
                <input
                  type="text"
                  value={leadCity}
                  onChange={(e) => setLeadCity(e.target.value)}
                  placeholder="City (optional)"
                  className="w-full rounded-xl border border-white/15 bg-brand-bg/40 px-3 py-2.5 text-sm text-brand-text placeholder:text-brand-muted/80 outline-none focus:border-brand-green/45 sm:col-span-2"
                />
              </div>
              <div className="mt-3 rounded-xl border border-white/10 bg-brand-bg/35 px-3 py-2 font-[var(--font-mono)] text-[12px] text-brand-green break-all">
                {outreachDemoUrl}
              </div>
              <div className="mt-3 flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={copyOutreachUrl}
                  className="inline-flex items-center justify-center rounded-full bg-brand-green px-4 py-2 text-sm font-semibold text-brand-bg hover:bg-brand-green/90 transition-colors"
                >
                  {copied ? 'Copied' : 'Copy Link'}
                </button>
                <a
                  href={outreachDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-brand-text/90 hover:border-white/35 hover:bg-white/5 transition-colors"
                >
                  Open Personalized Demo
                </a>
              </div>
              <textarea
                value={outreachEmailBody}
                readOnly
                className="mt-3 min-h-[140px] w-full rounded-xl border border-white/10 bg-brand-bg/35 px-3 py-2 text-[12px] text-brand-muted outline-none"
              />
              <div className="mt-2 flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={copyOutreachEmail}
                  className="inline-flex items-center justify-center rounded-full bg-brand-green px-4 py-2 text-sm font-semibold text-brand-bg hover:bg-brand-green/90 transition-colors"
                >
                  {emailCopied ? 'Copied Email Draft' : 'Copy Email Draft'}
                </button>
                <a
                  href={outreachMailtoHref}
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-brand-text/90 hover:border-white/35 hover:bg-white/5 transition-colors"
                >
                  Open in Email App
                </a>
              </div>
            </motion.div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
              {[
                { k: '48h', v: 'Average demo delivery', delay: 0.25 },
                { k: '$299', v: 'Starting monthly (15 techs)', delay: 0.45 },
                { k: '1 week', v: 'From yes to live app', delay: 0.65 },
              ].map((c) => (
                <motion.div
                  key={c.k}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: c.delay, ease: 'easeOut' }}
                  className="fg-surface rounded-2xl p-5 shadow-[0_12px_30px_rgba(0,0,0,.35)]"
                  style={{ animation: mounted ? 'fg-float 8s ease-in-out infinite' : undefined }}
                >
                  <div className="font-[var(--font-mono)] text-brand-green" style={{ fontSize: 40, lineHeight: 1 }}>
                    {c.k}
                  </div>
                  <div className="mt-1 text-sm text-brand-muted">{c.v}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12" id="demo-preview">
          <div className="fg-surface rounded-2xl overflow-hidden shadow-[0_12px_30px_rgba(0,0,0,.35)]">
            <div className="px-4 py-3 border-b border-brand-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <span className="ml-3 text-xs text-brand-muted">SummitFlow HVAC Demo — live prototype</span>
              </div>
              <a href={primaryDemoUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-brand-green hover:underline">
                Open full screen →
              </a>
            </div>
            <div className="bg-brand-surface">
              <iframe
                title="SummitFlow HVAC live demo"
                src={primaryDemoUrl}
                className="w-full"
                style={{ height: 520 }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.45);
            opacity: 0.9;
          }
          70% {
            box-shadow: 0 0 0 10px rgba(34, 197, 94, 0);
            opacity: 1;
          }
          100% {
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
            opacity: 0.9;
          }
        }
      `}</style>
    </section>
  );
}
