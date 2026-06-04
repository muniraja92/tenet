import { processSteps } from '../data/siteData';

export default function Process() {
  return (
    <section id="process" className="relative section-padding grid-bg overflow-hidden">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-accent-violet/[0.04] blur-[140px]"
      />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="mb-16 md:mb-20 text-center">
          <span className="section-label">Our Process</span>
          <h2 className="section-title">
            From Discovery to{' '}
            <span className="gradient-text">Continuous Improvement</span>
          </h2>
          <p className="section-subtitle mx-auto">
            A structured workflow that takes your requirements from initial
            conversation through agent-powered execution to ongoing
            optimization.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mx-auto max-w-3xl">
          {/* Vertical connecting line */}
          <div
            aria-hidden="true"
            className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-brand-500/40 via-accent-cyan/30 to-accent-violet/20"
          />

          <ol className="relative space-y-10 md:space-y-14">
            {processSteps.map(({ step, title, description }, idx) => {
              // Alternating slight right offset on desktop for visual interest
              const isEven = idx % 2 === 1;

              return (
                <li
                  key={step}
                  className={`relative flex items-start gap-5 md:gap-7 transition-transform duration-300 ${
                    isEven ? 'md:translate-x-6' : 'md:translate-x-0'
                  }`}
                >
                  {/* Step number circle with gradient border */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-surface-950 gradient-border shadow-[0_0_20px_rgba(59,130,246,0.15)]">
                      <span className="text-brand-400 font-bold text-sm md:text-lg font-mono">
                        {String(step).padStart(2, '0')}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="pt-1 md:pt-3">
                    <h3 className="text-white font-semibold text-lg md:text-xl mb-1.5">
                      {title}
                    </h3>
                    <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-lg">
                      {description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>

          {/* Terminal dot */}
          <div
            aria-hidden="true"
            className="absolute left-6 md:left-8 -bottom-4 w-3 h-3 -translate-x-[5px] md:-translate-x-[5px] rounded-full bg-accent-violet/60 ring-4 ring-surface-950"
          />
        </div>
      </div>
    </section>
  );
}
