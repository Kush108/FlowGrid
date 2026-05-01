'use client';

import AnnouncementBar from '@/components/marketing/AnnouncementBar';
import NavBar from '@/components/marketing/NavBar';
import Hero from '@/components/marketing/Hero';
import SocialProofStrip from '@/components/marketing/SocialProofStrip';
import ProblemSection from '@/components/marketing/ProblemSection';
import HowItWorks from '@/components/marketing/HowItWorks';
import SystemsGrid from '@/components/SystemsGrid';
import PricingSection from '@/components/marketing/PricingSection';
import ReviewsSection from '@/components/marketing/ReviewsSection';
import ContactSection from '@/components/marketing/ContactSection';
import Footer from '@/components/marketing/Footer';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-brand-bg text-brand-text">
      <AnnouncementBar />
      <NavBar />
      <Hero />
      <SocialProofStrip />
      <ProblemSection />
      <HowItWorks />

      <section id="demo" className="py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 70% 25%, rgba(34,197,94,.08), rgba(34,197,94,0) 55%)',
          }}
        />
        <div className="max-w-6xl mx-auto px-4 relative">
          <div className="text-center">
            <div className="text-xs tracking-[0.18em] uppercase text-brand-muted">SEE IT WORKING</div>
            <h2 className="font-[var(--font-display)] mt-3 leading-tight italic text-brand-green" style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}>
              This isn’t a screenshot.
              <br />
              It’s actually running.
            </h2>
            <p className="mt-4 text-brand-muted max-w-3xl mx-auto">
              FieldTrack is FlowGrid’s flagship product for time + mileage + live team status.
              <span className="text-brand-text/80"> Click anything in the demo — it works.</span>
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div>
              <ul className="space-y-3 text-brand-text/85">
                {[
                  'Punch in/out updates the dashboard live',
                  'Mileage logs per job (payroll-ready)',
                  'Managers see hours, status, and exports in one view',
                  'Works on any phone (no app store install)',
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="text-brand-green mt-0.5">✓</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-brand-green text-brand-bg font-semibold hover:bg-brand-green/90 transition-colors"
                  href="/fieldtrack-demo/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open Full Demo →
                </a>
                <a
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/20 text-brand-text/90 hover:border-white/30 hover:bg-white/5 transition-colors"
                  href="#contact"
                >
                  Get your custom proposal →
                </a>
              </div>

              <p className="mt-6 text-brand-muted leading-relaxed">
                Want this for your team? We’ll build a working demo with your branding and workflow in 48 hours — pay only if you love it.
              </p>
            </div>

            <div className="rounded-2xl border border-brand-green/25 overflow-hidden bg-brand-surface shadow-[0_12px_30px_rgba(0,0,0,.35)]">
              <iframe
                title="FieldTrack live demo"
                src="/fieldtrack-demo/"
                className="w-full"
                style={{ height: 520 }}
                loading="lazy"
              />
              <div className="px-4 py-3 text-xs text-brand-muted border-t border-brand-border bg-brand-bg/30">
                ↑ Interactive — click the tabs inside the demo
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION (keep existing services) */}
      <section id="services" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="text-xs tracking-[0.18em] uppercase text-brand-muted">WHAT WE BUILD</div>
            <h2 className="font-[var(--font-display)] mt-3 leading-tight" style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}>
              Operational software for businesses that move.
            </h2>
            <p className="mt-4 text-brand-muted max-w-3xl mx-auto">
              Productized systems — fast to deploy, easy to customize, built for field teams not office workers.
            </p>
          </div>

          <div className="mt-10">
            <SystemsGrid />
          </div>
        </div>
      </section>

      <PricingSection />
      <ReviewsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
