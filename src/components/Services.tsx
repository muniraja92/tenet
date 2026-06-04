import { useState, useCallback } from 'react';
import { services } from '../data/siteData';
import { ChevronDown } from 'lucide-react';

export default function Services() {
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

  const toggleCard = useCallback((index: number) => {
    setExpandedCards((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }, []);

  return (
    <section id="services" className="relative section-padding dot-bg overflow-hidden">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[480px] w-[720px] rounded-full bg-brand-500/[0.04] blur-[120px]"
      />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="mb-12 md:mb-16 text-center max-w-3xl mx-auto">
          <span className="section-label">Services</span>
          <h2 className="section-title">
            What TENET{' '}
            <span className="gradient-text">Builds and Delivers</span>
          </h2>
          <p className="mt-4 text-white/60 text-base md:text-lg leading-relaxed">
            From agentic business automation to custom agent design, TENET
            provides services that combine the precision of AI agents with the
            strategic oversight of human governance.
          </p>
        </div>

        {/* Service cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isExpanded = expandedCards.has(index);

            return (
              <div
                key={service.title}
                className="card-glow group flex flex-col"
              >
                {/* Icon + Title + Description */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 transition-colors duration-300 group-hover:bg-brand-500/20">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-white font-semibold text-base md:text-lg mb-1">
                      {service.title}
                    </h3>
                    <p className="text-white/60 text-sm md:text-base leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Toggle button */}
                <button
                  type="button"
                  onClick={() => toggleCard(index)}
                  aria-expanded={isExpanded}
                  aria-controls={`service-detail-${index}`}
                  className="mt-4 flex items-center gap-1.5 text-brand-400 hover:text-brand-300 text-xs font-medium tracking-wide uppercase transition-colors duration-200 cursor-pointer self-start ml-16"
                >
                  {isExpanded ? 'Show less' : 'Learn more'}
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>

                {/* Expandable detail area */}
                <div
                  id={`service-detail-${index}`}
                  role="region"
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isExpanded
                      ? 'max-h-80 opacity-100 mt-4'
                      : 'max-h-0 opacity-0 mt-0'
                  }`}
                >
                  <div className="ml-16 space-y-3 border-t border-white/5 pt-4">
                    {/* Benefit */}
                    <div>
                      <span className="text-brand-400 text-xs font-semibold uppercase tracking-wider">
                        Why it matters:
                      </span>
                      <p className="mt-1 text-white/50 text-sm leading-relaxed">
                        {service.benefit}
                      </p>
                    </div>

                    {/* Example */}
                    <div>
                      <span className="text-brand-400 text-xs font-semibold uppercase tracking-wider">
                        Example:
                      </span>
                      <p className="mt-1 text-white/50 text-sm leading-relaxed">
                        {service.example}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
