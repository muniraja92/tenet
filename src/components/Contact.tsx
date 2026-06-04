import { Mail, MessageCircle, Send, Linkedin, Github } from 'lucide-react';
import { type FormEvent, useState } from 'react';

/* ------------------------------------------------------------------ */
/*  Contact-info cards data                                           */
/* ------------------------------------------------------------------ */
interface ContactChannel {
  icon: React.ElementType;
  label: string;
  value: string;
  href: string;
}

const channels: ContactChannel[] = [
  {
    icon: Mail,
    label: 'Email',
    value: 'fbi.muniraja@gmail.com',
    href: 'mailto:fbi.muniraja@gmail.com',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: 'Message us on WhatsApp',
    href: 'https://wa.me/919502450501',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'Muniraja Pasupuleti',
    href: 'https://www.linkedin.com/in/muniraja-pasupuleti-27637954/',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'muniraja92',
    href: 'https://github.com/muniraja92',
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */
export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const mailtoSubject = encodeURIComponent(
      subject || 'Agentic Build Inquiry',
    );
    const mailtoBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`,
    );

    window.location.href = `mailto:fbi.muniraja@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
  };

  const inputBase =
    'w-full bg-surface-900 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 text-sm md:text-base focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30 transition-colors duration-200';

  return (
    <section id="contact" className="relative section-padding dot-bg overflow-hidden">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 right-0 h-[500px] w-[600px] rounded-full bg-brand-500/[0.04] blur-[120px]"
      />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="mb-14 md:mb-20 text-center">
          <span className="section-label">Get in Touch</span>
          <h2 className="section-title">
            Start an{' '}
            <span className="gradient-text">Agentic Conversation</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Whether you need agent-powered automation, a custom specialist
            agent, or want to explore how TENET can transform your
            operations—reach out directly.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left — Contact channels */}
          <div className="space-y-5">
            <h3 className="text-white font-semibold text-lg md:text-xl mb-6">
              Direct Channels
            </h3>

            {channels.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="card group flex items-center gap-4"
              >
                <div className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-400 transition-colors duration-300 group-hover:bg-brand-500/20">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>

                <div>
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-0.5">
                    {label}
                  </p>
                  <p className="text-white font-medium text-sm md:text-base">
                    {value}
                  </p>
                </div>
              </a>
            ))}
          </div>

          {/* Right — Contact form */}
          <div>
            <h3 className="text-white font-semibold text-lg md:text-xl mb-6">
              Send a Message
            </h3>

            <form
              onSubmit={handleSubmit}
              className="card space-y-5"
            >
              {/* Name */}
              <div>
                <label htmlFor="contact-name" className="sr-only">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Your Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputBase}
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="contact-email" className="sr-only">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="Your Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputBase}
                />
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="contact-subject" className="sr-only">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  placeholder="Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className={inputBase}
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" className="sr-only">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  placeholder="Tell us about your project or idea…"
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`${inputBase} resize-none`}
                />
              </div>

              {/* Submit */}
              <button type="submit" className="btn-primary w-full justify-center">
                <Send className="w-4 h-4" aria-hidden="true" />
                Discuss an Agentic Build
              </button>

              <p className="text-white/30 text-xs text-center">
                This form opens your email client. No data is stored on any
                server.
              </p>
            </form>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 md:mt-28 text-center">
          <div className="inline-block gradient-border rounded-2xl px-8 py-6 md:px-12 md:py-8">
            <h3 className="text-white font-bold text-xl md:text-2xl mb-2">
              Ready to Build with{' '}
              <span className="gradient-text">Agents</span>?
            </h3>
            <p className="text-white/50 text-sm md:text-base max-w-md mx-auto">
              Reach out through any channel above and let's explore what
              agentic automation can do for your business.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
