import { modelLayers, agentRoles } from '../data/siteData';

/* ------------------------------------------------------------------ */
/*  Model Layer Card                                                   */
/* ------------------------------------------------------------------ */
interface LayerCardProps {
  title: string;
  description: string;
  depth: number;
  isLast: boolean;
}

function LayerCard({ title, description, depth, isLast }: LayerCardProps) {
  /** Slight alternating horizontal offset for visual interest */
  const offset = depth % 2 === 0 ? 'md:translate-x-0' : 'md:translate-x-6';

  return (
    <div className="relative flex items-stretch gap-6 md:gap-10">
      {/* ---- Left gutter: gradient line + node dot ---- */}
      <div className="relative flex flex-col items-center" aria-hidden="true">
        {/* Glowing node dot */}
        <div className="relative z-10 mt-1 flex h-5 w-5 items-center justify-center">
          <span className="absolute h-5 w-5 rounded-full bg-brand-500/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-brand-400 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
        </div>

        {/* Connecting line — hidden on last item */}
        {!isLast && (
          <div className="w-px flex-1 bg-gradient-to-b from-brand-500/60 via-accent-violet/40 to-brand-500/10" />
        )}
      </div>

      {/* ---- Card content ---- */}
      <div
        className={`group card-glow mb-6 flex-1 transform transition-transform duration-300 ${offset}`}
      >
        {/* Depth badge */}
        <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-brand-500/20 bg-brand-500/5 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-widest text-brand-400">
          L{depth}
        </span>

        <h3 className="mb-1.5 text-lg font-bold text-white md:text-xl">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-white/50 md:text-base">
          {description}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Agent Role Card                                                    */
/* ------------------------------------------------------------------ */
interface AgentCardProps {
  name: string;
  description: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

function AgentCard({ name, description, Icon }: AgentCardProps) {
  return (
    <div className="card-glow group flex flex-col items-start gap-4">
      {/* Icon */}
      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand-500/20 bg-brand-500/5 transition-shadow duration-300 group-hover:shadow-[0_0_16px_rgba(59,130,246,0.25)]">
        <Icon className="h-5 w-5 text-brand-400 transition-colors duration-300 group-hover:text-brand-300" />
      </div>

      <div>
        <h4 className="mb-1 text-base font-semibold text-white">{name}</h4>
        <p className="text-sm leading-relaxed text-white/50">{description}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */
export default function AgenticModel() {
  return (
    <section id="model" className="section-padding grid-bg relative overflow-hidden">
      {/* Subtle radial glow behind the hierarchy */}
      <div
        className="pointer-events-none absolute left-1/4 top-0 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-brand-500/[0.04] blur-[120px]"
        aria-hidden="true"
      />

      <div className="section-container relative z-10">
        {/* ============================================================ */}
        {/*  PART 1 — Model Hierarchy                                     */}
        {/* ============================================================ */}
        <div className="mb-20 md:mb-28">
          {/* Header */}
          <div className="mb-12 max-w-3xl md:mb-16">
            <span className="section-label">Operating Model</span>
            <h2 className="section-title">
              The Agentic{' '}
              <span className="gradient-text">Execution Framework</span>
            </h2>
            <p className="section-subtitle">
              A structured hierarchy where human governance meets agent-powered
              execution. Every layer has a clear purpose, defined authority, and
              accountability.
            </p>
          </div>

          {/* Hierarchy visualization */}
          <div className="relative mx-auto max-w-2xl pl-2 md:pl-4">
            {/* Full-height gradient rail (decorative) */}
            <div
              className="pointer-events-none absolute bottom-0 left-[11px] top-0 w-px bg-gradient-to-b from-brand-500/50 via-accent-cyan/30 to-accent-violet/20 md:left-[11px]"
              aria-hidden="true"
            />

            {modelLayers.map((layer, idx) => (
              <LayerCard
                key={layer.title}
                title={layer.title}
                description={layer.description}
                depth={layer.depth}
                isLast={idx === modelLayers.length - 1}
              />
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/*  PART 2 — Agent Roles Grid                                    */}
        {/* ============================================================ */}
        <div>
          {/* Header */}
          <div className="mb-12 max-w-3xl md:mb-16">
            <h3 className="section-title text-2xl md:text-3xl lg:text-4xl">
              Specialist{' '}
              <span className="gradient-text">Agent Roles</span>
            </h3>
            <p className="section-subtitle">
              Each function within TENET is owned by a specialist agent—purpose-built
              for its domain and designed to coordinate with other agents.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {agentRoles.map((role) => (
              <AgentCard
                key={role.name}
                name={role.name}
                description={role.description}
                Icon={role.icon}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
