import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { navItems } from '../data/siteData';

/** Pixel threshold after which the navbar bg becomes fully opaque */
const SCROLL_THRESHOLD = 64;

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('#home');

  /* ------------------------------------------------------------------ */
  /*  Scroll-aware background opacity                                   */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initialise on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ------------------------------------------------------------------ */
  /*  Active-section highlighting via IntersectionObserver               */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.replace('#', ''));
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      {
        rootMargin: '-20% 0px -60% 0px', // bias towards the top of the viewport
        threshold: 0,
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  /* ------------------------------------------------------------------ */
  /*  Smooth-scroll handler                                             */
  /* ------------------------------------------------------------------ */
  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  /* ------------------------------------------------------------------ */
  /*  Lock body scroll when mobile menu is open                         */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  /* ------------------------------------------------------------------ */
  /*  Close mobile menu on Escape key press                              */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 border-b ${
        scrolled
          ? 'bg-surface-950/95 border-white/[0.06]'
          : 'bg-surface-950/80 border-transparent'
      } backdrop-blur-xl`}
    >
      <nav
        className="section-container flex items-center justify-between h-16 md:h-18"
        aria-label="Main navigation"
      >
        {/* ── Logo ─────────────────────────────────────────────────── */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('#home');
          }}
          className="relative z-10 text-xl font-bold tracking-widest gradient-text select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-950 rounded"
          aria-label="TENET – back to top"
        >
          TENET
        </a>

        {/* ── Desktop links ────────────────────────────────────────── */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {navItems.map((item) => {
            const isActive = activeSection === item.href;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(item.href);
                  }}
                  className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-950 ${
                    isActive
                      ? 'text-brand-400'
                      : 'text-white/60 hover:text-white'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                  {/* active indicator dot */}
                  {isActive && (
                    <span
                      className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full bg-brand-400"
                      aria-hidden="true"
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* ── Mobile menu toggle ───────────────────────────────────── */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="relative z-10 md:hidden p-2 -mr-2 rounded-lg text-white/70 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-950"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* ── Mobile slide-in panel ──────────────────────────────────── */}
      {/* Overlay backdrop */}
      <div
        className={`fixed inset-0 bg-surface-950/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          mobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
        onClick={() => setMobileOpen(false)}
      />

      {/* Panel */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`fixed inset-y-0 right-0 w-72 max-w-[85vw] bg-surface-950/95 backdrop-blur-xl border-l border-white/[0.06] shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close button inside panel */}
        <div className="flex items-center justify-end h-16 px-4">
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="p-2 rounded-lg text-white/70 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <ul className="flex flex-col gap-1 px-4 pt-2" role="list">
          {navItems.map((item, index) => {
            const isActive = activeSection === item.href;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(item.href);
                  }}
                  className={`block px-4 py-3 text-base font-medium rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 ${
                    isActive
                      ? 'text-brand-400 bg-brand-500/10'
                      : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                  style={{ transitionDelay: `${index * 40}ms` }}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
