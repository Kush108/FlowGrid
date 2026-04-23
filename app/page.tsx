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
