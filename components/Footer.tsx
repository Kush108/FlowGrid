'use client';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-white/60 text-sm">
            Built on FlowGrid Infrastructure
          </div>
          
          <nav className="flex gap-6 text-sm">
            <a href="#about" className="text-white/60 hover:text-white transition-colors">
              About
            </a>
            <a href="#privacy" className="text-white/60 hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#contact" className="text-white/60 hover:text-white transition-colors">
              Contact
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
