import { navItems } from '../data/siteData';
import { ArrowUpRight } from 'lucide-react';

const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/muniraja-pasupuleti-27637954/' },
  { label: 'GitHub', href: 'https://github.com/muniraja92' },
];

export default function Footer() {
  return (
    <footer className="relative bg-surface-950 border-t border-white/[0.06]">
      {/* Main footer content */}
      <div className="section-container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Column 1 — Brand */}
          <div className="space-y-4">
            <a href="#home" className="inline-block">
              <span className="gradient-text text-2xl font-bold tracking-tight">
                TENET
              </span>
            </a>

            <p className="text-white/40 text-sm leading-relaxed">
              Human-Governed. Agent-Executed. Future-Built.
            </p>

            <p className="text-white/30 text-sm leading-relaxed max-w-xs">
              A parent holding company designing, deploying, and governing
              agent-powered ventures from a single strategic command layer.
            </p>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h4 className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-5">
              Quick Links
            </h4>

            <nav aria-label="Footer navigation">
              <ul className="space-y-3">
                {navItems.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-white/40 hover:text-white/80 text-sm transition-colors duration-200"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 3 — Connect */}
          <div>
            <h4 className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-5">
              Connect
            </h4>

            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:fbi.muniraja@gmail.com"
                  className="text-white/40 hover:text-white/80 text-sm transition-colors duration-200 inline-flex items-center gap-1.5"
                >
                  fbi.muniraja@gmail.com
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </li>

              {socialLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 hover:text-white/80 text-sm transition-colors duration-200 inline-flex items-center gap-1.5"
                  >
                    {label}
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06]">
        <div className="section-container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">
            &copy; 2026 TENET. All rights reserved.
          </p>

          <p className="text-white/30 text-xs">
            Built as a static zero-cost website
          </p>
        </div>
      </div>
    </footer>
  );
}
