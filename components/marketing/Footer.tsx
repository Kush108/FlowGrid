'use client';

export default function Footer() {
  return (
    <footer className="bg-[#060e1a] border-t border-brand-border py-14">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-brand-green/15 border border-brand-green/25 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-text/90" />
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-text/90" />
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-text/90" />
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                </div>
              </div>
              <div className="font-[var(--font-display)] text-lg">
                <span className="text-brand-text">Flow</span>
                <span className="text-brand-green">Grid</span>
              </div>
            </div>
            <p className="mt-4 text-brand-muted leading-relaxed">Operational software for businesses that move.</p>
            <p className="mt-3 text-brand-muted text-sm">
              Built in Edmonton, serving businesses everywhere.
            </p>
            <div className="mt-4 flex items-center gap-3 text-brand-muted">
              <a className="hover:text-brand-text transition-colors" href="#" aria-label="Instagram">
                Instagram
              </a>
              <a className="hover:text-brand-text transition-colors" href="#" aria-label="LinkedIn">
                LinkedIn
              </a>
            </div>
          </div>

          <div>
            <div className="font-semibold text-brand-text/90">Services</div>
            <div className="mt-4 space-y-2 text-brand-muted">
              <a className="block hover:text-brand-text transition-colors" href="#services">
                FieldTrack
              </a>
              <a className="block hover:text-brand-text transition-colors" href="#services">
                BookingFlow
              </a>
              <a className="block hover:text-brand-text transition-colors" href="#services">
                OpsDash
              </a>
              <a className="block hover:text-brand-text transition-colors" href="#services">
                StaffHub
              </a>
              <a className="block hover:text-brand-text transition-colors" href="#services">
                ClientPortal
              </a>
              <a className="block hover:text-brand-text transition-colors" href="#services">
                Custom Build
              </a>
            </div>
          </div>

          <div>
            <div className="font-semibold text-brand-text/90">Company</div>
            <div className="mt-4 space-y-2 text-brand-muted">
              <a className="block hover:text-brand-text transition-colors" href="#how">
                How It Works
              </a>
              <a className="block hover:text-brand-text transition-colors" href="#pricing">
                Pricing
              </a>
              <a className="block hover:text-brand-text transition-colors" href="#demo">
                Demo
              </a>
              <a className="block hover:text-brand-text transition-colors" href="#contact">
                Free Demo
              </a>
              <a className="block hover:text-brand-text transition-colors" href="mailto:hello@flowgrid.ca">
                hello@flowgrid.ca
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-brand-muted">
          <div>© {new Date().getFullYear()} FlowGrid. All rights reserved.</div>
          <div className="flex items-center gap-3">
            <a className="hover:text-brand-text transition-colors" href="#">
              Privacy Policy
            </a>
            <span>·</span>
            <a className="hover:text-brand-text transition-colors" href="#">
              Terms
            </a>
            <span>·</span>
            <span>Built in Edmonton, CA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

