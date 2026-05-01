'use client';

import { motion } from 'framer-motion';

function Avatar({ name, variant }: { name: string; variant: 'green' | 'blue' | 'purple' }) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('');

  const styles =
    variant === 'green'
      ? 'bg-brand-green/15 border-brand-green/25 text-brand-text shadow-[0_0_0_1px_rgba(34,197,94,0.12)]'
      : variant === 'blue'
        ? 'bg-brand-blue/15 border-brand-blue/25 text-brand-text shadow-[0_0_0_1px_rgba(14,165,233,0.12)]'
        : 'bg-purple-500/15 border-purple-400/25 text-brand-text shadow-[0_0_0_1px_rgba(168,85,247,0.12)]';

  return (
    <div
      className={[
        'w-10 h-10 rounded-full border flex items-center justify-center text-sm font-semibold tracking-wide',
        styles,
      ].join(' ')}
    >
      {initials || 'FG'}
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section id="proof" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-xs tracking-[0.18em] uppercase text-brand-muted">REAL RESULTS</div>
          <h2 className="font-[var(--font-display)] mt-3 leading-tight" style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}>
            Built for real operations. <br />
            Not demos.
          </h2>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              stars: '★★★★★',
              quote:
                'We were managing 60 staff on WhatsApp and paper. Within a week we had a live dashboard showing everyone’s status, hours and mileage. Payroll went from 3 hours to 20 minutes.',
              name: 'Operations Manager',
              org: 'Edmonton Home Care Organization',
              tag: 'FieldTrack · 60 staff',
            },
            {
              stars: '★★★★★',
              quote:
                'The demo was built before I even agreed to anything. That alone told me this was different from every other software company I’d talked to.',
              name: 'Executive Director',
              org: 'Community Services Organization',
              tag: 'FieldTrack · 35 staff',
            },
            {
              stars: '★★★★★',
              quote:
                'Our mileage reimbursement was all over the place. Now it’s automatic, accurate, and exports to Excel every week. CRA audit would be fine — everything’s documented.',
              name: 'Business Owner',
              org: 'HVAC Service Company',
              tag: 'FieldTrack · 18 technicians',
            },
          ].map((r, idx) => (
            <motion.div
              key={r.quote}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-120px' }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="rounded-2xl p-6 border border-brand-border bg-brand-surface shadow-[0_12px_30px_rgba(0,0,0,.25)]"
            >
              <div className="text-brand-green text-sm">{r.stars}</div>
              <div className="mt-3 text-brand-text/90 leading-relaxed">“{r.quote}”</div>
              <div className="mt-5 flex items-center gap-3">
                <Avatar name={r.name} variant={idx === 0 ? 'green' : idx === 1 ? 'blue' : 'purple'} />
                <div className="text-sm text-brand-muted">
                  <div className="text-brand-text/85 font-medium">{r.name}</div>
                  <div>{r.org}</div>
                  <div className="mt-1 text-xs">{r.tag}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 italic text-center text-xs text-brand-muted"
        >
          * Demo available to verify the product before any commitment.
        </motion.div>

        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { value: '48h', label: 'Average demo delivery' },
            { value: '$0', label: 'Cost to see your demo' },
            { value: '1 week', label: 'From yes to live app' },
            { value: '100%', label: 'Satisfaction or no invoice' },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl p-6 border border-brand-border bg-brand-surface shadow-[0_12px_30px_rgba(0,0,0,.25)]">
              <div className="font-[var(--font-mono)] text-brand-green text-3xl">{item.value}</div>
              <div className="text-sm text-brand-muted mt-1">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

