import { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, ExternalLink, GitBranch, Calendar, Clock, Star, AlertCircle, Rss, Terminal as TerminalIcon } from 'lucide-react';
import { strategyBroadcasts, linkedinFeedUrl, StrategyBroadcast } from '../data/siteData';

interface GithubRepo {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
}

const fallbackRepos: GithubRepo[] = [
  {
    name: 'AI-Crash-Course',
    description: 'AI Crash Course to help busy builders catch up to the public frontier of AI research in 2 weeks',
    html_url: 'https://github.com/muniraja92/AI-Crash-Course',
    stargazers_count: 0,
    language: 'Notebook',
    updated_at: '2025-08-08T23:10:30Z'
  },
  {
    name: 'Hands-On-Large-Language-Models',
    description: 'Official code repo for the O\'Reilly Book - "Hands-On Large Language Models"',
    html_url: 'https://github.com/muniraja92/Hands-On-Large-Language-Models',
    stargazers_count: 0,
    language: 'Python',
    updated_at: '2025-07-29T19:43:18Z'
  },
  {
    name: 'KRISHNAIK-COURSES-HANDWRITTEN-NOTES',
    description: 'Handwritten educational resources, code exercises, and study summaries for AI research.',
    html_url: 'https://github.com/muniraja92/KRISHNAIK-COURSES-HANDWRITTEN-NOTES',
    stargazers_count: 0,
    language: 'Markdown',
    updated_at: '2025-07-01T10:35:29Z'
  }
];

interface CommandLine {
  type: 'input' | 'output';
  text: string;
}

export default function Activity() {
  // Tabs: 'workspaces' | 'cli'
  const [activeTab, setActiveTab] = useState<'workspaces' | 'cli'>('workspaces');

  // GitHub Repos State
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // LinkedIn State
  const [broadcasts, setBroadcasts] = useState<StrategyBroadcast[]>(strategyBroadcasts);
  const [linkedinLoading, setLinkedinLoading] = useState(false);

  // Terminal CLI State
  const [cliInput, setCliInput] = useState('');
  const [cliHistory, setCliHistory] = useState<CommandLine[]>([
    { type: 'output', text: 'TENET Agent CLI [Version 1.0.0]' },
    { type: 'output', text: '(c) 2026 TENET Core Command. Secure connection established.' },
    { type: 'output', text: ' ' },
    { type: 'output', text: 'Type "help" to view the available agentic operations.' }
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Fetch GitHub Repos
  useEffect(() => {
    async function fetchRepos() {
      try {
        const response = await fetch('https://api.github.com/users/muniraja92/repos?sort=updated&per_page=6');
        if (!response.ok) {
          throw new Error('API limit hit or failed to fetch');
        }
        const data = await response.json();
        const formatted: GithubRepo[] = data.map((repo: any) => ({
          name: repo.name,
          description: repo.description,
          html_url: repo.html_url,
          stargazers_count: repo.stargazers_count,
          language: repo.language,
          updated_at: repo.updated_at
        }));
        setRepos(formatted.slice(0, 5));
        setLoading(false);
      } catch (err) {
        console.error('Error fetching repositories:', err);
        setRepos(fallbackRepos);
        setError(true);
        setLoading(false);
      }
    }
    fetchRepos();
  }, []);

  // Fetch LinkedIn RSS
  useEffect(() => {
    if (!linkedinFeedUrl) return;

    async function fetchLinkedIn() {
      setLinkedinLoading(true);
      try {
        const response = await fetch(linkedinFeedUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch LinkedIn feed');
        }
        const data = await response.json();
        if (data.status === 'ok' && Array.isArray(data.items)) {
          const cleanText = (html: string) => html.replace(/<[^>]*>/g, '').trim();
          
          const formatted: StrategyBroadcast[] = data.items.map((item: any, idx: number) => {
            const content = cleanText(item.description || item.content || '');
            
            let category: 'Strategic Directive' | 'Operational Update' | 'Milestone' = 'Strategic Directive';
            const lowercaseContent = content.toLowerCase();
            if (lowercaseContent.includes('milestone') || lowercaseContent.includes('launch') || lowercaseContent.includes('celebrat')) {
              category = 'Milestone';
            } else if (lowercaseContent.includes('update') || lowercaseContent.includes('release') || lowercaseContent.includes('agent') || lowercaseContent.includes('workflow')) {
              category = 'Operational Update';
            }

            let title = cleanText(item.title || '');
            if (!title || title.length > 60 || title.startsWith('http')) {
              const words = content.split(' ');
              title = words.slice(0, 6).join(' ') + '...';
            }

            return {
              id: `linkedin-${idx}`,
              category,
              date: item.pubDate ? new Date(item.pubDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'Recent',
              title,
              content: content.length > 280 ? content.slice(0, 277) + '...' : content,
              linkedinUrl: item.link || 'https://www.linkedin.com/in/muniraja-pasupuleti-27637954/recent-activity/all/'
            };
          });
          setBroadcasts(formatted.slice(0, 3));
        }
      } catch (err) {
        console.error('Error fetching LinkedIn feed:', err);
        setBroadcasts(strategyBroadcasts);
      } finally {
        setLinkedinLoading(false);
      }
    }

    fetchLinkedIn();
  }, []);

  // Auto-scroll CLI to bottom
  useEffect(() => {
    if (activeTab === 'cli' && terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [cliHistory, activeTab]);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  // Handle CLI Command Execution
  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = cliInput.trim().toLowerCase();
    if (!cmd) return;

    // Add command to history
    const newHistory = [...cliHistory, { type: 'input' as const, text: `$ ${cliInput}` }];
    setCliInput('');

    // Generate command response
    setTimeout(() => {
      switch (cmd) {
        case 'help':
          setCliHistory([
            ...newHistory,
            { type: 'output', text: 'Available commands:' },
            { type: 'output', text: '  status       Check agent network operational health' },
            { type: 'output', text: '  agents       List active specialist agent workloads' },
            { type: 'output', text: '  ventures     Display TENET parent holding tree structure' },
            { type: 'output', text: '  broadcast    Print latest strategic directive details' },
            { type: 'output', text: '  clear        Clear the command terminal output' }
          ]);
          break;
        case 'clear':
          setCliHistory([
            { type: 'output', text: 'TENET Agent CLI [Version 1.0.0]' },
            { type: 'output', text: 'Type "help" to view options.' }
          ]);
          break;
        case 'status':
          setCliHistory([
            ...newHistory,
            { type: 'output', text: '[SYSTEM HEALTH STATUS]' },
            { type: 'output', text: 'Strategic governance layer: ONLINE (Founder: Muniraja P.)' },
            { type: 'output', text: 'Agent master nodes:         10/10 operational' },
            { type: 'output', text: 'Operational queue load:     12.8% (Optimal)' },
            { type: 'output', text: 'Average execution latency:  18ms' },
            { type: 'output', text: 'Security & Ethical audits:  PASSED' }
          ]);
          break;
        case 'agents':
          setCliHistory([
            ...newHistory,
            { type: 'output', text: '[SPECIALIST AGENTS ACTIVE ROUTERS]' },
            { type: 'output', text: 'Strategy Agent    | IDLE      | Holding core directives' },
            { type: 'output', text: 'Intake Agent      | MONITOR   | Scopes incoming briefs' },
            { type: 'output', text: 'Development Agent | ACTIVE    | Building tenet.is-a.dev' },
            { type: 'output', text: 'QA Agent          | MONITOR   | Verification checks complete' },
            { type: 'output', text: 'Governance Agent  | AUDITING  | Audit trace checks' },
            { type: 'output', text: 'Marketing Agent   | STANDBY   | SEO optimizations done' }
          ]);
          break;
        case 'ventures':
          setCliHistory([
            ...newHistory,
            { type: 'output', text: '[TENET ECOSYSTEM MAP]' },
            { type: 'output', text: 'TENET (Command Hub)' },
            { type: 'output', text: '├── TENET Labs (R&D, Agent prototyping)' },
            { type: 'output', text: '├── TENET Works (Client delivery solutions)' },
            { type: 'output', text: '├── TENET Systems (Core shared infrastructure)' },
            { type: 'output', text: '└── TENET Ventures (Incubating agent verticals)' }
          ]);
          break;
        case 'broadcast':
          setCliHistory([
            ...newHistory,
            { type: 'output', text: '[DIRECTIVE: AUTONOMOUS HOLDING CONFIG]' },
            { type: 'output', text: 'Initiating TENET infrastructure. Target cost: ₹0.' },
            { type: 'output', text: 'Hosting: Cloudflare Pages / Domain: tenet.is-a.dev' },
            { type: 'output', text: 'Execution structure: 100% agent coordinated.' },
            { type: 'output', text: 'Refer to LinkedIn strategy column for full articles.' }
          ]);
          break;
        default:
          setCliHistory([
            ...newHistory,
            { type: 'output', text: `system: command not found: "${cmd}"` },
            { type: 'output', text: 'Type "help" to see valid command options.' }
          ]);
      }
    }, 100);
  };

  return (
    <section id="activity" className="relative py-24 border-b border-white/[0.06] overflow-hidden">
      {/* Dynamic Background Patterns */}
      <div className="absolute inset-0 dot-bg opacity-30 pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl opacity-20 pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-accent-cyan/10 rounded-full blur-3xl opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-semibold tracking-wider text-brand-400 uppercase bg-brand-400/5 px-3 py-1 rounded-full border border-brand-400/10 inline-block mb-3">
            System Updates
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Live Strategy & System Log
          </h2>
          <p className="text-lg text-white/60">
            Real-time codebase activity and strategic broadcasts direct from the founder.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* LEFT COLUMN: Founder Strategy Broadcasts (LinkedIn) */}
          <div className="space-y-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Rss className="w-5 h-5 text-brand-400" />
                Strategy Broadcasts
              </h3>
              <span className="text-xs text-white/40 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> {linkedinFeedUrl ? 'Live sync' : 'Static feed'}
              </span>
            </div>

            <div className="space-y-6">
              {linkedinLoading ? (
                // Skeleton loading state
                <div className="space-y-6">
                  {[1, 2].map((n) => (
                    <div key={n} className="animate-pulse card p-6 bg-surface-900/40 border border-white/[0.06] rounded-2xl space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="h-4 bg-white/10 rounded w-1/4" />
                        <div className="h-4 bg-white/10 rounded w-1/6" />
                      </div>
                      <div className="h-5 bg-white/5 rounded w-3/4" />
                      <div className="h-3 bg-white/5 rounded w-full" />
                      <div className="h-3 bg-white/5 rounded w-5/6" />
                    </div>
                  ))}
                </div>
              ) : (
                broadcasts.map((broadcast) => (
                  <article 
                    key={broadcast.id}
                    className="card p-6 bg-surface-900/40 border border-white/[0.06] rounded-2xl hover:border-white/10 transition-all duration-300 relative group"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${
                        broadcast.category === 'Strategic Directive' 
                          ? 'text-accent-pink bg-accent-pink/5 border-accent-pink/20'
                          : broadcast.category === 'Operational Update'
                          ? 'text-accent-cyan bg-accent-cyan/5 border-accent-cyan/20'
                          : 'text-brand-400 bg-brand-400/5 border-brand-400/20'
                      }`}>
                        {broadcast.category}
                      </span>
                      <span className="text-xs text-white/40 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {broadcast.date}
                      </span>
                    </div>

                    <h4 className="text-md font-bold text-white mb-2 group-hover:text-brand-300 transition-colors">
                      {broadcast.title}
                    </h4>
                    <p className="text-sm text-white/60 leading-relaxed mb-4">
                      {broadcast.content}
                    </p>

                    <a 
                      href={broadcast.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-brand-400 hover:text-brand-300 transition-colors"
                    >
                      View strategy discussion on LinkedIn
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </article>
                ))
              )}
            </div>

            {/* LinkedIn Connection CTA */}
            <div className="card-glow p-6 bg-surface-900/60 border border-brand-500/20 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-white flex items-center gap-2 mb-1">
                  <Linkedin className="w-5 h-5 text-[#0A66C2]" />
                  Direct Strategy Updates
                </h4>
                <p className="text-xs text-white/60">
                  Follow Muniraja Pasupuleti on LinkedIn to read daily updates and directives.
                </p>
              </div>
              <a 
                href="https://www.linkedin.com/in/muniraja-pasupuleti-27637954/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 bg-[#0A66C2] hover:bg-[#004182] text-white font-medium text-sm rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shrink-0 shadow-lg shadow-[#0A66C2]/10"
              >
                Connect on LinkedIn
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Terminal (GitHub Workspaces & Agent CLI) */}
          <div className="space-y-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <TerminalIcon className="w-5 h-5 text-brand-400" />
                Core Operations Panel
              </h3>
              <span className="text-xs text-white/40 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> {activeTab === 'workspaces' ? 'Sync: active' : 'Shell: active'}
              </span>
            </div>

            {/* Terminal Window container */}
            <div className="rounded-2xl border border-white/[0.08] bg-surface-950/80 shadow-2xl overflow-hidden backdrop-blur-xl flex flex-col min-h-[440px]">
              {/* Terminal Titlebar + Tab Switcher */}
              <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-surface-900/60 border-b border-white/[0.06] select-none gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-accent-pink/80" />
                  <span className="w-3 h-3 rounded-full bg-accent-yellow/80" />
                  <span className="w-3 h-3 rounded-full bg-brand-500/80" />
                </div>
                
                {/* Tab Switcher Buttons */}
                <div className="flex bg-surface-950 border border-white/5 rounded-lg p-0.5 font-mono text-[11px]">
                  <button 
                    onClick={() => setActiveTab('workspaces')}
                    className={`px-3 py-1 rounded-md transition-colors ${
                      activeTab === 'workspaces' 
                        ? 'bg-brand-500/20 text-brand-300 font-bold border border-brand-500/10' 
                        : 'text-white/40 hover:text-white'
                    }`}
                  >
                    📂 Workspaces
                  </button>
                  <button 
                    onClick={() => setActiveTab('cli')}
                    className={`px-3 py-1 rounded-md transition-colors ${
                      activeTab === 'cli' 
                        ? 'bg-brand-500/20 text-brand-300 font-bold border border-brand-500/10' 
                        : 'text-white/40 hover:text-white'
                    }`}
                  >
                    ⚡ Agent CLI
                  </button>
                </div>

                <span className="text-[10px] text-white/30 font-mono hidden sm:inline">
                  {activeTab === 'workspaces' ? 'system@tenet:~/workspaces' : 'system@tenet:~/agents-cli'}
                </span>
              </div>

              {/* Terminal Content Box */}
              <div className="p-6 font-mono text-xs md:text-sm space-y-6 flex-grow overflow-y-auto max-h-[380px]">
                
                {/* TAB 1: WORKSPACES */}
                {activeTab === 'workspaces' && (
                  loading ? (
                    <div className="space-y-6">
                      {[1, 2, 3].map((n) => (
                        <div key={n} className="animate-pulse space-y-2.5">
                          <div className="h-4 bg-white/10 rounded w-1/3" />
                          <div className="h-3 bg-white/5 rounded w-3/4" />
                          <div className="h-3 bg-white/5 rounded w-1/2" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      <div className="space-y-5">
                        {repos.map((repo) => (
                          <div 
                            key={repo.name} 
                            className="group border-b border-white/[0.04] pb-4 last:border-0 last:pb-0"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <a 
                                href={repo.html_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-brand-400 hover:text-brand-300 transition-colors font-semibold flex items-center gap-1.5 group-hover:translate-x-1 duration-200"
                              >
                                <GitBranch className="w-4 h-4 text-brand-400/80 shrink-0" />
                                {repo.name}
                              </a>
                              <a 
                                href={repo.html_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-white/30 hover:text-white/60 transition-colors"
                                aria-label={`View ${repo.name} code on GitHub`}
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            </div>

                            <p className="text-xs text-white/50 mt-1 leading-relaxed font-sans">
                              {repo.description || 'No description provided.'}
                            </p>

                            <div className="flex flex-wrap items-center gap-4 text-[10px] text-white/30 mt-3 font-mono">
                              {repo.language && (
                                <span className="flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                                  {repo.language}
                                </span>
                              )}
                              {repo.stargazers_count > 0 && (
                                <span className="flex items-center gap-0.5">
                                  <Star className="w-3 h-3 text-accent-yellow" />
                                  {repo.stargazers_count}
                                </span>
                              )}
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                Sync: {formatDate(repo.updated_at)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {error && (
                        <div className="p-3 bg-accent-yellow/5 border border-accent-yellow/20 rounded-xl text-xs text-accent-yellow flex items-start gap-2 select-none">
                          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                          <div>
                            <strong>API Notice:</strong> Displaying fallback repo data listings. Connect to GitHub for active workspace branches.
                          </div>
                        </div>
                      )}
                    </>
                  )
                )}

                {/* TAB 2: INTERACTIVE AGENT CLI */}
                {activeTab === 'cli' && (
                  <div className="flex flex-col h-full justify-between min-h-[300px]">
                    <div className="space-y-2 mb-4">
                      {cliHistory.map((line, idx) => (
                        <div 
                          key={idx} 
                          className={`whitespace-pre-wrap leading-relaxed ${
                            line.type === 'input' 
                              ? 'text-white font-bold' 
                              : 'text-white/60 font-medium'
                          }`}
                        >
                          {line.text}
                        </div>
                      ))}
                      <div ref={terminalEndRef} />
                    </div>

                    <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 border-t border-white/[0.06] pt-4 mt-auto">
                      <span className="text-brand-400 font-bold select-none">$</span>
                      <input 
                        type="text" 
                        value={cliInput}
                        onChange={(e) => setCliInput(e.target.value)}
                        placeholder="type 'help' or commands..." 
                        className="flex-grow bg-transparent border-none outline-none text-white placeholder:text-white/20 caret-brand-400 font-mono text-xs md:text-sm focus:ring-0 focus:outline-none p-0"
                        autoFocus
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="none"
                        spellCheck="false"
                      />
                    </form>
                  </div>
                )}

              </div>
            </div>

            {/* GitHub Profile Callout */}
            <div className="card p-6 bg-surface-900/30 border border-white/[0.06] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-white flex items-center gap-2 mb-1">
                  <Github className="w-5 h-5 text-white" />
                  Code Repositories
                </h4>
                <p className="text-xs text-white/60">
                  Review complete repository trees, branches, and commit histories.
                </p>
              </div>
              <a 
                href="https://github.com/muniraja92"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 bg-white text-surface-950 font-medium text-sm rounded-xl hover:bg-white/95 transition-all duration-300 flex items-center justify-center gap-2 shrink-0"
              >
                Browse Github
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
