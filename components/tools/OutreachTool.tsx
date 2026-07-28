'use client';

import { useMemo, useState } from 'react';

export default function OutreachTool() {
  const [leadCompany, setLeadCompany] = useState('');
  const [leadContactName, setLeadContactName] = useState('');
  const [leadCity, setLeadCity] = useState('Edmonton');
  const [copied, setCopied] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

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
    <div className="min-h-screen bg-brand-bg text-brand-text">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="mb-6">
          <div className="text-xs tracking-[0.14em] uppercase text-brand-muted">Internal tool · not indexed</div>
          <h1 className="font-[var(--font-display)] mt-2 text-2xl">Outreach Link Generator</h1>
          <p className="mt-2 text-sm text-brand-muted">
            Generate personalized demo links and cold-email drafts for HVAC prospecting.
          </p>
        </div>

        <div className="rounded-2xl border border-brand-border bg-brand-surface/80 p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
        </div>
      </div>
    </div>
  );
}
