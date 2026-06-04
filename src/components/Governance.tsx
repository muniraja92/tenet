import { governancePillars } from '../data/siteData';
import { ShieldCheck } from 'lucide-react';

export default function Governance() {
  return (
    <section id="governance" className="relative section-padding dot-bg overflow-hidden">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[480px] w-[720px] rounded-full bg-brand-500/[0.04] blur-[120px]"
      />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="mb-12 md:mb-16 text-center">
          <span className="section-label">Governance</span>
          <h2 className="section-title">
            Responsible Automation,{' '}
            <span className="gradient-text">Human-Governed Operations</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Running operations through agents demands rigorous oversight.
            TENET's governance framework ensures every automated action is
            accountable, ethical, and human-approved where it matters.
          </p>
        </div>

        {/* Pillar Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 md:gap-6">
          {governancePillars.map((pillar, index) => {
            const isAlt = index % 2 === 1;
            const accentColor = isAlt ? 'text-accent-cyan' : 'text-brand-400';
            const bgAccent = isAlt
              ? 'bg-accent-cyan/10 border-accent-cyan/20'
              : 'bg-brand-500/10 border-brand-500/20';

            return (
              <div key={pillar.title} className="card group">
                <div className="flex flex-col gap-4">
                  {/* Icon + Number badge */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl border transition-colors duration-300 ${bgAccent}`}
                    >
                      <ShieldCheck
                        className={`w-5 h-5 ${accentColor}`}
                        aria-hidden="true"
                      />
                    </div>
                    <span
                      className={`text-sm font-mono font-semibold ${accentColor}`}
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-white font-semibold text-base mb-1.5">
                      {pillar.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout Banner */}
        <div className="mt-12 md:mt-16">
          <div className="gradient-border rounded-2xl p-6 md:p-8 text-center">
            <p className="text-white/90 text-base md:text-lg font-medium leading-relaxed max-w-3xl mx-auto">
              No blind automation. No unchecked agents. Every critical decision
              routes through the founder.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
