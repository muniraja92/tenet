import { Building2, Brain, Shield } from 'lucide-react';

interface FeatureCard {
  icon: React.ElementType;
  title: string;
  description: string;
}

const features: FeatureCard[] = [
  {
    icon: Building2,
    title: 'Parent Company Architecture',
    description:
      'Designed as a holding company that governs multiple agent-powered ventures under one strategic umbrella.',
  },
  {
    icon: Brain,
    title: 'Agent-First Operations',
    description:
      'Every operational function—development, design, research, marketing—is executed by specialist AI agents.',
  },
  {
    icon: Shield,
    title: 'Founder-Led Governance',
    description:
      'Human judgment at the top. The founder retains control over strategy, ethics, and critical business decisions.',
  },
];

export default function About() {
  return (
    <section id="about" className="relative section-padding dot-bg overflow-hidden">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[480px] w-[720px] rounded-full bg-brand-500/[0.04] blur-[120px]"
      />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <span className="section-label">About TENET</span>
          <h2 className="section-title">
            A Mother Company Built for the{' '}
            <span className="gradient-text">Agent Era</span>
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left column — descriptive content */}
          <div className="space-y-6">
            <p className="text-white/70 text-base md:text-lg leading-relaxed">
              TENET is a parent holding company designed from the ground up to
              create, control, and scale agent-powered businesses. Unlike
              traditional companies that hire teams for every function, TENET
              operates through an agentic execution framework—specialist AI
              agents that coordinate other agents to complete complex work.
            </p>

            <p className="text-white/70 text-base md:text-lg leading-relaxed">
              Founded by{' '}
              <a
                href="https://www.linkedin.com/in/muniraja-pasupuleti-27637954/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-400 hover:text-brand-300 transition-colors underline underline-offset-2"
              >
                Muniraja Pasupuleti
              </a>
              —a researcher and technologist with deep expertise in artificial
              intelligence, large language models, recommender systems, and
              agentic AI—TENET is built on a foundation of real technical
              understanding. The founder defines the vision, sets governance
              policies, approves critical decisions, and steers business
              direction. Everything else—from development and design to
              marketing and operations—is executed by structured agent teams
              that follow defined workflows, quality standards, and ethical
              guidelines.
            </p>

            <p className="text-white/70 text-base md:text-lg leading-relaxed">
              Child companies will operate under TENET's governance umbrella,
              each with their own objectives, customers, and specialist agents,
              but sharing TENET's core infrastructure, quality standards, and
              strategic oversight.
            </p>
          </div>

          {/* Right column — feature cards */}
          <div className="flex flex-col gap-5">
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className="card-glow group">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-400 transition-colors duration-300 group-hover:bg-brand-500/20">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>

                  <div>
                    <h3 className="text-white font-semibold text-base md:text-lg mb-1">
                      {title}
                    </h3>
                    <p className="text-white/60 text-sm md:text-base leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
