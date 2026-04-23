'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';

interface IntakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  systemName?: string;
}

type City = 'Edmonton' | 'Calgary' | 'Other';

export default function IntakeModal({ isOpen, onClose, systemName }: IntakeModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState<City>('Edmonton');
  const [businessType, setBusinessType] = useState('');
  const [need, setNeed] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const title = useMemo(() => (systemName ? `Build plan — ${systemName}` : 'Get a build plan'), [systemName]);

  const reset = () => {
    setName('');
    setEmail('');
    setCity('Edmonton');
    setBusinessType('');
    setNeed('');
    setSubmitting(false);
    setSubmitted(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    try {
      await fetch('/api/intake', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          city,
          businessType,
          need,
          systemName: systemName ?? null,
          source: 'modal',
        }),
      });
    } catch {
      // Intentionally silent: user shouldn’t see infra errors here.
    } finally {
      setSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        onClose();
        reset();
      }, 2200);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              onClose();
              reset();
            }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="glass rounded-2xl p-7 sm:p-8 max-w-md w-full border border-white/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/18 via-neon-violet/18 to-neon-green/10 opacity-60 blur-xl" />

              <div className="relative z-10">
                <button
                  onClick={() => {
                    onClose();
                    reset();
                  }}
                  className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {!submitted ? (
                  <>
                    <h2 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-neon-blue to-neon-violet bg-clip-text text-transparent">
                      {title}
                    </h2>
                    <p className="text-white/65 mb-6 text-sm sm:text-base">
                      Tell me what you need. You’ll get a short build plan in 24–48 hours.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Name"
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 transition-all text-white placeholder-white/40"
                        />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email"
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 transition-all text-white placeholder-white/40"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <select
                          value={city}
                          onChange={(e) => setCity(e.target.value as City)}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 transition-all text-white"
                        >
                          <option className="bg-background" value="Edmonton">
                            Edmonton
                          </option>
                          <option className="bg-background" value="Calgary">
                            Calgary
                          </option>
                          <option className="bg-background" value="Other">
                            Other
                          </option>
                        </select>
                        <input
                          value={businessType}
                          onChange={(e) => setBusinessType(e.target.value)}
                          placeholder="Business type (e.g., cleaning, trades)"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 transition-all text-white placeholder-white/40"
                        />
                      </div>

                      <textarea
                        value={need}
                        onChange={(e) => setNeed(e.target.value)}
                        placeholder="What do you want to track/build? (booking, staff, jobs, dashboards...)"
                        rows={4}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 transition-all text-white placeholder-white/40 resize-none"
                      />

                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full px-6 py-3 rounded-lg font-medium text-white/90 relative overflow-hidden disabled:opacity-60"
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-violet opacity-90" />
                        <span className="absolute inset-[1px] bg-background rounded-[0.55rem]" />
                        <span className="relative">
                          {submitting ? 'Sending…' : 'Send build plan request'}
                        </span>
                      </button>

                      <p className="text-xs text-white/45 leading-relaxed">
                        Prefer email? Send a note to{' '}
                        <a className="text-white/70 hover:text-white underline underline-offset-4" href="mailto:hello@flowgrid.ca">
                          hello@flowgrid.ca
                        </a>
                        .
                      </p>
                    </form>
                  </>
                ) : (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-neon-blue to-neon-violet flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-white/90 text-lg">Request received.</p>
                    <p className="text-white/60 text-sm mt-1">Build plan arrives in 24–48 hours.</p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

