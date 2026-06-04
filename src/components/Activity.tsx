import { useState, useEffect } from 'react';
import { Github, Linkedin, ExternalLink, GitBranch, Calendar, Clock, Star, AlertCircle, Rss } from 'lucide-react';
import { strategyBroadcasts } from '../data/siteData';

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

export default function Activity() {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const response = await fetch('https://api.github.com/users/muniraja92/repos?sort=updated&per_page=6');
        if (!response.ok) {
          throw new Error('API limit hit or failed to fetch');
        }
        const data = await response.json();
        // Map raw data to the format we need
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
                <Clock className="w-3.5 h-3.5" /> Static feed
              </span>
            </div>

            <div className="space-y-6">
              {strategyBroadcasts.map((broadcast) => (
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
              ))}
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

          {/* RIGHT COLUMN: Active Codebases (GitHub) */}
          <div className="space-y-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Github className="w-5 h-5 text-white" />
                Active Workspaces
              </h3>
              <span className="text-xs text-white/40 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Live repository sync
              </span>
            </div>

            {/* Terminal Window container */}
            <div className="rounded-2xl border border-white/[0.08] bg-surface-950/80 shadow-2xl overflow-hidden backdrop-blur-xl">
              {/* Terminal Titlebar */}
              <div className="flex items-center justify-between px-4 py-3 bg-surface-900/60 border-b border-white/[0.06] select-none">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-accent-pink/80" />
                  <span className="w-3 h-3 rounded-full bg-accent-yellow/80" />
                  <span className="w-3 h-3 rounded-full bg-brand-500/80" />
                </div>
                <span className="text-xs text-white/30 font-mono">system@tenet:~/workspaces</span>
                <div className="w-12" /> {/* Spacer */}
              </div>

              {/* Terminal Content */}
              <div className="p-6 font-mono text-sm space-y-6 min-h-[380px]">
                {loading ? (
                  // Skeleton state
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

                          <p className="text-xs text-white/50 mt-1 leading-relaxed">
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
                          <strong>API Limit / Network Notice:</strong> Displaying static fallback repository listings. Visit GitHub for live workspace updates.
                        </div>
                      </div>
                    )}
                  </>
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
