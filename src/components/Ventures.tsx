import { ventures } from '../data/siteData';
import { Rocket } from 'lucide-react';

export default function Ventures() {
  return (
    <section id="ventures" className="relative section-padding dot-bg overflow-hidden">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[480px] w-[720px] rounded-full bg-accent-violet/[0.04] blur-[120px]"
      />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="mb-6 md:mb-8 text-center">
          <span className="section-label">Venture Structure</span>
          <h2 className="section-title">
            The TENET{' '}
            <span className="gradient-text">Ecosystem</span>
          </h2>
          <p className="section-subtitle mx-auto">
            TENET is designed as a mother company that creates, governs, and
            scales agent-powered subsidiaries. Each venture operates with its own
            objectives under TENET&rsquo;s strategic umbrella.
          </p>
        </div>

        {/* Explanatory text block */}
        <div className="max-w-3xl mx-auto mb-16 md:mb-20 text-center">
          <p className="text-white/60 text-sm md:text-base leading-relaxed">
            Each child company has its own goal, niche, customers, operating
            model, and specialist agents. TENET provides governance, agent
            infrastructure, quality control, strategy, and shared systems across
            all ventures.
          </p>
        </div>

        {/* Hub-and-spoke layout with central node */}
        <div className="relative">
          {/* ── Central connecting SVG (hidden on mobile, visible md+) ── */}
          <div
            aria-hidden="true"
            className="hidden md:block pointer-events-none absolute inset-0 z-0"
          >
            <svg
              className="w-full h-full"
              viewBox="0 0 1000 600"
              preserveAspectRatio="xMidYMid meet"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <radialGradient id="hub-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(139,92,246,0.25)" />
                  <stop offset="100%" stopColor="rgba(139,92,246,0)" />
                </radialGradient>
                <linearGradient id="line-grad-tl" x1="500" y1="300" x2="200" y2="120">
                  <stop offset="0%" stopColor="rgba(139,92,246,0.4)" />
                  <stop offset="100%" stopColor="rgba(59,130,246,0.08)" />
                </linearGradient>
                <linearGradient id="line-grad-tr" x1="500" y1="300" x2="800" y2="120">
                  <stop offset="0%" stopColor="rgba(139,92,246,0.4)" />
                  <stop offset="100%" stopColor="rgba(59,130,246,0.08)" />
                </linearGradient>
                <linearGradient id="line-grad-bl" x1="500" y1="300" x2="200" y2="480">
                  <stop offset="0%" stopColor="rgba(139,92,246,0.4)" />
                  <stop offset="100%" stopColor="rgba(59,130,246,0.08)" />
                </linearGradient>
                <linearGradient id="line-grad-br" x1="500" y1="300" x2="800" y2="480">
                  <stop offset="0%" stopColor="rgba(139,92,246,0.4)" />
                  <stop offset="100%" stopColor="rgba(59,130,246,0.08)" />
                </linearGradient>
              </defs>

              {/* Connection lines from center to each quadrant */}
              <line x1="500" y1="300" x2="200" y2="120" stroke="url(#line-grad-tl)" strokeWidth="1" />
              <line x1="500" y1="300" x2="800" y2="120" stroke="url(#line-grad-tr)" strokeWidth="1" />
              <line x1="500" y1="300" x2="200" y2="480" stroke="url(#line-grad-bl)" strokeWidth="1" />
              <line x1="500" y1="300" x2="800" y2="480" stroke="url(#line-grad-br)" strokeWidth="1" />

              {/* Small endpoint dots */}
              <circle cx="200" cy="120" r="3" fill="rgba(59,130,246,0.3)" />
              <circle cx="800" cy="120" r="3" fill="rgba(59,130,246,0.3)" />
              <circle cx="200" cy="480" r="3" fill="rgba(59,130,246,0.3)" />
              <circle cx="800" cy="480" r="3" fill="rgba(59,130,246,0.3)" />

              {/* Central glow */}
              <circle cx="500" cy="300" r="60" fill="url(#hub-glow)" />

              {/* Central hub ring */}
              <circle
                cx="500"
                cy="300"
                r="28"
                fill="rgba(139,92,246,0.08)"
                stroke="rgba(139,92,246,0.3)"
                strokeWidth="1"
              />
              <circle
                cx="500"
                cy="300"
                r="8"
                fill="rgba(139,92,246,0.5)"
              />

              {/* "TENET" label at the center */}
              <text
                x="500"
                y="350"
                textAnchor="middle"
                fill="rgba(139,92,246,0.6)"
                fontSize="11"
                fontFamily="Inter, system-ui, sans-serif"
                fontWeight="600"
                letterSpacing="0.15em"
              >
                TENET
              </text>
            </svg>
          </div>

          {/* 2×2 Venture card grid */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
            {ventures.map((venture) => (
              <div key={venture.name} className="card-glow group flex flex-col">
                {/* Header row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-accent-violet/10 border border-accent-violet/20 text-accent-violet transition-colors duration-300 group-hover:bg-accent-violet/20">
                      <Rocket className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3 className="gradient-text text-lg md:text-xl font-bold">
                      {venture.name}
                    </h3>
                  </div>

                  {/* Status badge */}
                  <span className={`flex-shrink-0 mt-1 inline-flex items-center text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                    venture.status === 'active'
                      ? 'border-accent-cyan/30 bg-accent-cyan/5 text-accent-cyan'
                      : 'border-accent-violet/30 bg-accent-violet/5 text-accent-violet'
                  }`}>
                    {venture.status === 'active' ? 'Active Vertical' : 'Future Vertical'}
                  </span>
                </div>

                {/* Tagline */}
                <p className="text-brand-400 text-sm font-medium mb-2">
                  {venture.tagline}
                </p>

                {/* Description */}
                <p className="text-white/60 text-sm md:text-base leading-relaxed">
                  {venture.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
