import { ArrowRight, ChevronDown } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Network node / edge data for the decorative SVG background        */
/* ------------------------------------------------------------------ */

interface NetworkNode {
  id: number;
  cx: number;
  cy: number;
  r: number;
  /** animation-delay offset in seconds */
  delay: number;
  /** secondary float delay */
  floatDelay: number;
}

interface NetworkEdge {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

const nodes: NetworkNode[] = [
  { id: 1, cx: 15, cy: 20, r: 3, delay: 0, floatDelay: 0 },
  { id: 2, cx: 30, cy: 12, r: 4, delay: 0.5, floatDelay: 1.2 },
  { id: 3, cx: 50, cy: 25, r: 5, delay: 1.0, floatDelay: 0.6 },
  { id: 4, cx: 70, cy: 15, r: 3.5, delay: 1.5, floatDelay: 1.8 },
  { id: 5, cx: 85, cy: 28, r: 4, delay: 0.3, floatDelay: 0.3 },
  { id: 6, cx: 25, cy: 45, r: 3.5, delay: 0.8, floatDelay: 2.0 },
  { id: 7, cx: 45, cy: 50, r: 6, delay: 0.2, floatDelay: 1.0 },
  { id: 8, cx: 65, cy: 42, r: 4, delay: 1.2, floatDelay: 0.8 },
  { id: 9, cx: 80, cy: 55, r: 3, delay: 0.6, floatDelay: 1.5 },
  { id: 10, cx: 10, cy: 65, r: 3, delay: 1.8, floatDelay: 0.4 },
  { id: 11, cx: 35, cy: 72, r: 4.5, delay: 0.4, floatDelay: 2.2 },
  { id: 12, cx: 55, cy: 68, r: 3, delay: 1.4, floatDelay: 0.9 },
  { id: 13, cx: 75, cy: 75, r: 5, delay: 0.9, floatDelay: 1.6 },
  { id: 14, cx: 90, cy: 70, r: 3.5, delay: 0.1, floatDelay: 0.2 },
  { id: 15, cx: 20, cy: 85, r: 3, delay: 1.6, floatDelay: 1.4 },
  { id: 16, cx: 60, cy: 88, r: 4, delay: 0.7, floatDelay: 0.7 },
  { id: 17, cx: 42, cy: 35, r: 2.5, delay: 1.1, floatDelay: 1.9 },
  { id: 18, cx: 58, cy: 38, r: 2.5, delay: 0.45, floatDelay: 0.5 },
];

const edges: NetworkEdge[] = [
  { x1: 15, y1: 20, x2: 30, y2: 12 },
  { x1: 30, y1: 12, x2: 50, y2: 25 },
  { x1: 50, y1: 25, x2: 70, y2: 15 },
  { x1: 70, y1: 15, x2: 85, y2: 28 },
  { x1: 15, y1: 20, x2: 25, y2: 45 },
  { x1: 25, y1: 45, x2: 45, y2: 50 },
  { x1: 45, y1: 50, x2: 65, y2: 42 },
  { x1: 65, y1: 42, x2: 85, y2: 28 },
  { x1: 65, y1: 42, x2: 80, y2: 55 },
  { x1: 50, y1: 25, x2: 45, y2: 50 },
  { x1: 10, y1: 65, x2: 25, y2: 45 },
  { x1: 10, y1: 65, x2: 35, y2: 72 },
  { x1: 35, y1: 72, x2: 55, y2: 68 },
  { x1: 55, y1: 68, x2: 75, y2: 75 },
  { x1: 75, y1: 75, x2: 90, y2: 70 },
  { x1: 80, y1: 55, x2: 90, y2: 70 },
  { x1: 20, y1: 85, x2: 35, y2: 72 },
  { x1: 55, y1: 68, x2: 60, y2: 88 },
  { x1: 75, y1: 75, x2: 60, y2: 88 },
  { x1: 42, y1: 35, x2: 50, y2: 25 },
  { x1: 42, y1: 35, x2: 45, y2: 50 },
  { x1: 58, y1: 38, x2: 65, y2: 42 },
  { x1: 58, y1: 38, x2: 50, y2: 25 },
  { x1: 42, y1: 35, x2: 58, y2: 38 },
  { x1: 30, y1: 12, x2: 42, y2: 35 },
  { x1: 70, y1: 15, x2: 58, y2: 38 },
];

/* ------------------------------------------------------------------ */
/*  Inline keyframes – injected once via <style> inside the SVG       */
/* ------------------------------------------------------------------ */

const svgStyles = `
  @keyframes nodePulse {
    0%, 100% { opacity: 0.45; transform: scale(1); }
    50%      { opacity: 0.9;  transform: scale(1.35); }
  }
  @keyframes nodeFloat {
    0%, 100% { transform: translateY(0); }
    50%      { transform: translateY(-1.2%); }
  }
  @keyframes edgePulse {
    0%, 100% { opacity: 0.08; }
    50%      { opacity: 0.22; }
  }
  .hero-node {
    transform-origin: center;
    animation: nodePulse 4s ease-in-out infinite, nodeFloat 7s ease-in-out infinite;
  }
  .hero-edge {
    animation: edgePulse 5s ease-in-out infinite;
  }
`;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-surface-950"
    >
      {/* ── Subtle grid background ─────────────────────────────── */}
      <div className="absolute inset-0 grid-bg" aria-hidden="true" />

      {/* ── Radial gradient overlays for depth ─────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        {/* Top-centre blue glow */}
        <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-brand-500/[0.07] blur-[160px]" />
        {/* Bottom-right cyan glow */}
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-accent-cyan/[0.05] blur-[140px]" />
        {/* Bottom-left violet glow */}
        <div className="absolute bottom-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-accent-violet/[0.04] blur-[120px]" />
      </div>

      {/* ── Agent-network SVG visualisation ────────────────────── */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <style>{svgStyles}</style>

        {/* Edges */}
        {edges.map((e, i) => (
          <line
            key={`edge-${i}`}
            x1={e.x1}
            y1={e.y1}
            x2={e.x2}
            y2={e.y2}
            stroke="url(#edgeGrad)"
            strokeWidth="0.15"
            className="hero-edge"
            style={{ animationDelay: `${(i * 0.35) % 4}s` }}
          />
        ))}

        {/* Nodes */}
        {nodes.map((n) => (
          <circle
            key={`node-${n.id}`}
            cx={n.cx}
            cy={n.cy}
            r={n.r}
            fill="url(#nodeGrad)"
            className="hero-node"
            style={{
              animationDelay: `${n.delay}s, ${n.floatDelay}s`,
            }}
          />
        ))}

        {/* Gradient definitions */}
        <defs>
          <radialGradient id="nodeGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#06d6e0" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#06d6e0" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>

      {/* ── Content ────────────────────────────────────────────── */}
      <div className="relative z-10 section-container text-center flex flex-col items-center py-24 md:py-32">
        {/* Section label pill */}
        <span className="section-label animate-in">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse-slow" />
          Agentic Automation Company
        </span>

        {/* Main headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 animate-in delay-100">
          <span className="gradient-text">Human-Governed.</span>
          <br />
          Agent-Executed.
          <br />
          <span className="gradient-text">Future-Built.</span>
        </h1>

        {/* Subheadline */}
        <p className="section-subtitle max-w-2xl mx-auto mb-10 animate-in delay-200">
          We build specialist agents that command other agents to get complex
          work done. TENET is the mother company for agent-powered service and
          product ventures.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 animate-in delay-300">
          <a href="#contact" className="btn-primary">
            Start a Conversation
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
          <a href="#model" className="btn-secondary">
            Explore Operating Model
            <ChevronDown className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>

        {/* Trust line */}
        <p className="text-xs sm:text-sm text-white/40 tracking-wide animate-in delay-400">
          Founder-led strategy{' '}
          <span className="text-white/20 mx-1.5" aria-hidden="true">
            ·
          </span>{' '}
          Specialist-agent execution{' '}
          <span className="text-white/20 mx-1.5" aria-hidden="true">
            ·
          </span>{' '}
          Scalable venture control
        </p>
      </div>

      {/* ── Bottom fade-out vignette ───────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface-950 to-transparent pointer-events-none"
        aria-hidden="true"
      />
    </section>
  );
};

export default Hero;
