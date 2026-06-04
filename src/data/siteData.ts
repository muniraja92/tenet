import {
  Brain,
  Users,
  Search,
  Code,
  Palette,
  Megaphone,
  ShieldCheck,
  BarChart3,
  Scale,
  FileText,
  Zap,
  Globe,
  Workflow,
  Database,
  PenTool,
  Package,
  Building2,
  Wrench,
  type LucideIcon,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Navigation                                                        */
/* ------------------------------------------------------------------ */
export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Agentic Model', href: '#model' },
  { label: 'Services', href: '#services' },
  { label: 'Ventures', href: '#ventures' },
  { label: 'Governance', href: '#governance' },
  { label: 'Activity', href: '#activity' },
  { label: 'Contact', href: '#contact' },
];

/* ------------------------------------------------------------------ */
/*  Agent Roles                                                       */
/* ------------------------------------------------------------------ */
export interface AgentRole {
  name: string;
  description: string;
  icon: LucideIcon;
}

export const agentRoles: AgentRole[] = [
  { name: 'Strategy Agent', description: 'Translates founder directives into structured execution plans, market-entry roadmaps, and operational milestones.', icon: Brain },
  { name: 'Client Intake Agent', description: 'Handles initial client interactions, scopes requirements, and routes projects to the correct specialist agents.', icon: Users },
  { name: 'Research Agent', description: 'Conducts market analysis, competitive intelligence, and technical feasibility studies on demand.', icon: Search },
  { name: 'Development Agent', description: 'Builds software products, APIs, automation scripts, and full-stack applications to specification.', icon: Code },
  { name: 'Design Agent', description: 'Produces brand identities, UI/UX designs, visual assets, and design systems for ventures and clients.', icon: Palette },
  { name: 'Marketing Agent', description: 'Plans and executes content strategies, SEO, social media operations, and growth campaigns.', icon: Megaphone },
  { name: 'QA Agent', description: 'Runs automated tests, validates outputs against quality benchmarks, and flags deviations before delivery.', icon: ShieldCheck },
  { name: 'Finance Agent', description: 'Tracks revenue, expenses, invoicing, and financial reporting across ventures and client projects.', icon: BarChart3 },
  { name: 'Governance Agent', description: 'Monitors ethical guidelines, compliance, data privacy, and audit trails across all agent activity.', icon: Scale },
  { name: 'Reporting Agent', description: 'Generates progress reports, dashboards, and performance summaries for the founder and stakeholders.', icon: FileText },
];

/* ------------------------------------------------------------------ */
/*  Model Layers                                                      */
/* ------------------------------------------------------------------ */
export interface ModelLayer {
  title: string;
  description: string;
  depth: number;
}

export const modelLayers: ModelLayer[] = [
  { title: 'Founder', description: 'Defines vision, strategy, ethics, governance, and final approvals.', depth: 0 },
  { title: 'TENET Core Command Layer', description: 'Central orchestration system that routes directives, manages priorities, and allocates agent resources.', depth: 1 },
  { title: 'Specialist Master Agents', description: 'Domain-expert agents that own specific functions—development, design, research, marketing, and more.', depth: 2 },
  { title: 'Task Agents', description: 'Execution-level agents that carry out discrete tasks assigned by master agents with speed and consistency.', depth: 3 },
  { title: 'Client & Production Outputs', description: 'Delivered products, services, reports, and automations that reach clients and end users.', depth: 4 },
  { title: 'Feedback & Improvement Loop', description: 'Continuous audit, quality scoring, and model refinement to improve every cycle of work.', depth: 5 },
];

/* ------------------------------------------------------------------ */
/*  Services                                                          */
/* ------------------------------------------------------------------ */
export interface Service {
  title: string;
  description: string;
  benefit: string;
  example: string;
  icon: LucideIcon;
}

export const services: Service[] = [
  {
    title: 'Agentic Business Automation',
    description: 'Design and deploy specialist agent systems that handle your repetitive business processes from end to end.',
    benefit: 'Reduce manual overhead by automating structured workflows with agent orchestration.',
    example: 'An agent pipeline that processes incoming leads, qualifies them, drafts proposals, and schedules follow-ups—without human bottlenecks.',
    icon: Zap,
  },
  {
    title: 'AI-Powered Website & App Development',
    description: 'Full-stack web and mobile applications built through agent-coordinated development pipelines.',
    benefit: 'Faster delivery cycles with consistent code quality, testing, and deployment managed by development agents.',
    example: 'A SaaS dashboard with authentication, real-time data, and automated CI/CD—designed, built, and deployed by coordinated agents.',
    icon: Globe,
  },
  {
    title: 'Workflow Automation for Companies',
    description: 'Map your existing business processes and rebuild them as structured, agent-driven workflows.',
    benefit: 'Eliminate process gaps and manual handoffs with transparent, auditable automation chains.',
    example: 'An operations workflow where procurement, vendor communication, and invoice processing run on coordinated agents.',
    icon: Workflow,
  },
  {
    title: 'Research, Data & Intelligence Systems',
    description: 'Automated research pipelines that gather, synthesize, and present market or technical intelligence.',
    benefit: 'Get structured insights faster than traditional research teams—with sources, summaries, and recommendations.',
    example: 'A competitive intelligence system that monitors industry trends, competitor launches, and regulatory changes weekly.',
    icon: Database,
  },
  {
    title: 'Content, Branding & Digital Operations',
    description: 'Brand strategy, content production, and digital presence management executed through specialist creative agents.',
    benefit: 'Consistent brand voice, scheduled content, and optimized digital assets without large creative teams.',
    example: 'A content pipeline producing blog posts, social media assets, and email sequences—reviewed and approved by the founder.',
    icon: PenTool,
  },
  {
    title: 'Productized Agent Systems',
    description: 'Package your services as repeatable, agent-powered products that can serve multiple clients at scale.',
    benefit: 'Turn custom work into scalable products with consistent delivery and lower marginal cost.',
    example: 'A productized SEO audit system that runs analysis, generates recommendations, and delivers reports for each new client.',
    icon: Package,
  },
  {
    title: 'Subsidiary & Venture Agent Infrastructure',
    description: 'Build the agent backbone for new ventures—complete with agent hierarchies, governance, and operating procedures.',
    benefit: 'Launch new business units with pre-built agent infrastructure, reducing setup time from months to weeks.',
    example: 'A new e-commerce venture with dedicated agents for inventory, customer service, marketing, and fulfillment.',
    icon: Building2,
  },
  {
    title: 'Custom Specialist-Agent Design',
    description: 'Commission purpose-built agents tailored to your specific domain, data, and operational requirements.',
    benefit: 'Get agents that understand your industry terminology, compliance needs, and business logic from day one.',
    example: 'A legal-review agent trained on contract templates that flags risks, suggests clauses, and tracks version history.',
    icon: Wrench,
  },
];

/* ------------------------------------------------------------------ */
/*  Ventures                                                          */
/* ------------------------------------------------------------------ */
export interface Venture {
  name: string;
  tagline: string;
  description: string;
  status: 'planned' | 'active';
}

export const ventures: Venture[] = [
  {
    name: 'TENET Labs',
    tagline: 'Agent Research & Prototyping',
    description: 'The internal research arm exploring new agent architectures, prompt engineering techniques, and automation paradigms.',
    status: 'planned',
  },
  {
    name: 'TENET Works',
    tagline: 'Client Service Execution',
    description: 'The service-delivery arm handling client-facing projects through coordinated specialist agent teams.',
    status: 'planned',
  },
  {
    name: 'TENET Systems',
    tagline: 'Internal Automation Infrastructure',
    description: 'Builds and maintains the shared tooling, agent frameworks, and operational infrastructure used across all ventures.',
    status: 'planned',
  },
  {
    name: 'TENET Ventures',
    tagline: 'Future Product Companies',
    description: 'The incubation arm for agent-powered product companies that serve specific markets and customer segments.',
    status: 'planned',
  },
];

/* ------------------------------------------------------------------ */
/*  Governance Pillars                                                */
/* ------------------------------------------------------------------ */
export interface GovernancePillar {
  title: string;
  description: string;
}

export const governancePillars: GovernancePillar[] = [
  {
    title: 'Founder Approval for Major Decisions',
    description: 'All strategic, financial, and client-facing decisions require explicit founder review and sign-off before execution.',
  },
  {
    title: 'Human Oversight of Sensitive Outputs',
    description: 'Agent-generated content, contracts, and public communications pass through human review checkpoints.',
  },
  {
    title: 'Audit Trails for Every Action',
    description: 'Every agent task is logged with inputs, outputs, timestamps, and decision rationale for full traceability.',
  },
  {
    title: 'Quality Checks at Every Stage',
    description: 'QA agents validate outputs against predefined standards before deliverables move to the next stage.',
  },
  {
    title: 'Ethical Automation Principles',
    description: 'Agents operate within defined ethical boundaries—no deceptive content, no privacy violations, no unchecked autonomy.',
  },
  {
    title: 'Data Privacy Awareness',
    description: 'Client and internal data is handled with strict access controls, minimization principles, and secure processing.',
  },
  {
    title: 'No Blind Automation for Critical Decisions',
    description: 'High-stakes actions like financial transactions, legal filings, and personnel changes require human confirmation.',
  },
  {
    title: 'Continuous Feedback & Improvement',
    description: 'Performance metrics, error rates, and client feedback drive ongoing refinement of agent capabilities.',
  },
];

/* ------------------------------------------------------------------ */
/*  Process Steps                                                     */
/* ------------------------------------------------------------------ */
export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  { step: 1, title: 'Discovery', description: 'We learn about your business goals, challenges, and the outcomes you need. No assumptions—just focused listening.' },
  { step: 2, title: 'Requirement Mapping', description: 'Your needs are translated into structured specifications that define what agents will build, automate, or manage.' },
  { step: 3, title: 'Agent-System Design', description: 'We architect the agent hierarchy—which specialist agents are needed, how they coordinate, and what guardrails apply.' },
  { step: 4, title: 'Build & Automation', description: 'Specialist agents execute the build—developing software, creating content, automating workflows, or all three.' },
  { step: 5, title: 'Testing & Validation', description: 'QA agents run automated checks while human reviewers verify critical outputs against your requirements.' },
  { step: 6, title: 'Delivery', description: 'Completed work is delivered with documentation, audit logs, and clear handoff procedures.' },
  { step: 7, title: 'Continuous Optimization', description: 'Post-delivery monitoring and feedback loops ensure the system improves with every cycle of use.' },
];

/* ------------------------------------------------------------------ */
/*  LinkedIn & Strategy Broadcasts                                    */
/* ------------------------------------------------------------------ */
export interface StrategyBroadcast {
  id: string;
  category: 'Strategic Directive' | 'Operational Update' | 'Milestone';
  date: string;
  title: string;
  content: string;
  linkedinUrl: string;
}

// To dynamically fetch your LinkedIn updates, generate a free RSS feed of your profile
// (e.g., via RSS.app or FetchRSS) and paste the RSS URL inside the rss2json query below.
// Leave empty to use the static fallback announcements.
export const linkedinFeedUrl = ''; // Example: 'https://api.rss2json.com/v1/api.json?rss_url=https://rss.app/feeds/your_feed_id.xml'

export const strategyBroadcasts: StrategyBroadcast[] = [
  {
    id: 'b1',
    category: 'Strategic Directive',
    date: 'June 2026',
    title: 'The Launch of TENET: Autonomous Holding Framework',
    content: 'Today marks the official initiation of TENET. Our design paradigm is fully committed to zero-cost static architectures and autonomous execution networks. A single founder governing specialist agent teams to scale products and services with near-zero marginal operational cost.',
    linkedinUrl: 'https://www.linkedin.com/in/muniraja-pasupuleti-27637954/recent-activity/all/',
  },
  {
    id: 'b2',
    category: 'Operational Update',
    date: 'May 2026',
    title: 'Agent Coordination Layer v1.0 Activated',
    content: 'Successfully verified the multi-agent development and design pipeline. Our engineering agents can now context-share across complex directory workspaces, compile code, audit for accessibility compliance, and run QA checks with zero human handoffs.',
    linkedinUrl: 'https://www.linkedin.com/in/muniraja-pasupuleti-27637954/recent-activity/all/',
  },
  {
    id: 'b3',
    category: 'Milestone',
    date: 'April 2026',
    title: 'Zero-Cost Infrastructure Validation',
    content: 'Completed the validation check for ₹0 hosting and deployment pipelines (using Cloudflare Pages, GitHub Actions, and free CNAME registries). Built a complete parent company portal running entirely on client-side optimization with a custom technical domain.',
    linkedinUrl: 'https://www.linkedin.com/in/muniraja-pasupuleti-27637954/recent-activity/all/',
  },
];

