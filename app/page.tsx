'use client';

import AnnouncementBar from '@/components/marketing/AnnouncementBar';
import NavBar from '@/components/marketing/NavBar';
import Hero from '@/components/marketing/Hero';
import SocialProofStrip from '@/components/marketing/SocialProofStrip';
import ProblemSection from '@/components/marketing/ProblemSection';
import ComparisonSection from '@/components/marketing/ComparisonSection';
import WhyUsSection from '@/components/marketing/WhyUsSection';
import HowItWorks from '@/components/marketing/HowItWorks';
import DemoShowcaseSection from '@/components/marketing/DemoShowcaseSection';
import PricingSection from '@/components/marketing/PricingSection';
import PilotProgramSection from '@/components/marketing/PilotProgramSection';
import ReviewsSection from '@/components/marketing/ReviewsSection';
import EdmontonPitchSection from '@/components/marketing/EdmontonPitchSection';
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
      <ComparisonSection />
      <WhyUsSection />
      <HowItWorks />
      <DemoShowcaseSection />
      <ReviewsSection />
      <PricingSection />
      <PilotProgramSection />
      <EdmontonPitchSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
