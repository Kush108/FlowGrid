'use client';

import { motion } from 'framer-motion';

const linkedinUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL || '';

export default function FounderSection() {
  return (
    <section id="about" className="py-20 bg-brand-surface">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center md:items-start gap-8"
        >
          <div
            className="shrink-0 w-28 h-28 rounded-2xl bg-brand-green/10 border border-brand-green/25 flex items-center justify-center font-[var(--font-display)] text-3xl text-brand-green"
            aria-hidden="true"
          >
            KG
          </div>

          <div>
            <div className="text-xs tracking-[0.18em] uppercase text-brand-muted">ABOUT</div>
            <h2
              className="font-[var(--font-display)] mt-3 leading-tight"
              style={{ fontSize: 'clamp(24px, 3.5vw, 32px)' }}
            >
              Built by someone who&apos;s been in the trenches.
            </h2>
            <p className="mt-4 text-brand-muted leading-relaxed max-w-2xl">
              I&apos;m <span className="text-brand-text/90 font-medium">Kushal Grover</span>, founder of FlowGrid.
              I started this because I kept watching Edmonton HVAC owners pay enterprise prices for software that
              still left them on WhatsApp when the temperature dropped. FlowGrid is the ops platform I wish existed
              for a 15-van shop — dispatch, fleet, and payroll in one place, with a working demo before you spend a
              dollar.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm">
              <span className="text-brand-muted">Edmonton, Alberta</span>
              {linkedinUrl ? (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-green hover:underline"
                >
                  Connect on LinkedIn →
                </a>
              ) : (
                <a href="mailto:hello@flowgrid.ca" className="text-brand-green hover:underline">
                  hello@flowgrid.ca →
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
