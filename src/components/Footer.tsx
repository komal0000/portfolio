import { PORTFOLIO_DATA } from "@/lib/portfolio-data";

export function Footer() {
  return (
    <footer className="py-10 bg-bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-[#ff6b00]/[0.02] to-transparent pointer-events-none" />
      <div className="h-px w-full bg-gradient-to-r from-transparent via-border-subtle to-transparent" />
      <div className="max-w-6xl mx-auto px-6 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="font-display font-bold text-sm text-text-primary">
            {PORTFOLIO_DATA.name}
          </span>
          <span className="text-xs text-text-muted font-body">
            &copy; {new Date().getFullYear()} &middot; Built with Next.js & Framer Motion
          </span>
        </div>

        <div className="flex items-center gap-4">
          {[
            { href: PORTFOLIO_DATA.github, label: "GitHub", d: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" },
            { href: PORTFOLIO_DATA.linkedin, label: "LinkedIn", d: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" },
            { href: `mailto:${PORTFOLIO_DATA.email}`, label: "Email", d: "M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={item.label}
              className="w-9 h-9 rounded-lg border border-border-subtle flex items-center justify-center text-text-muted hover:text-[#ff6b00] hover:border-[#ff6b00]/40 hover:bg-[#ff6b00]/5 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                <path d={item.d} />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
