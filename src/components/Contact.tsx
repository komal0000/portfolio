"use client";

import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const contactItems = [
  {
    label: "Email",
    value: PORTFOLIO_DATA.email,
    href: `mailto:${PORTFOLIO_DATA.email}`,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: "Phone",
    value: PORTFOLIO_DATA.phone,
    href: `tel:${PORTFOLIO_DATA.phone}`,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    value: "Komal Shrestha",
    href: PORTFOLIO_DATA.linkedin,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    value: "sickn33",
    href: PORTFOLIO_DATA.github,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
      </svg>
    ),
  },
];

export function Contact() {
  return (
    <section id="contact" className="py-32 bg-bg-secondary relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#ff6b00]/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#e63946]/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto px-6 relative z-10"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-20">
          <span className="text-xs font-mono text-[#ff6b00] uppercase tracking-[0.3em] block mb-4">
            &#47;&#47; Send a Scroll
          </span>
          <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-4">
            <span className="text-text-primary">Send a</span>
            <br />
            <span className="text-gradient">Scroll</span>
          </h2>
          <p className="text-text-secondary font-body max-w-md mx-auto">
            Have a mission in mind? Let&apos;s join forces and build something legendary.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Contact cards */}
          <motion.div variants={itemVariants} className="space-y-4">
            {contactItems.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                whileHover={{ x: 6 }}
                className="flex items-center gap-4 group glass-card rounded-xl p-4 transition-all duration-300 hover:border-[#ff6b00]/30"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff6b00]/20 to-[#e63946]/20 flex items-center justify-center text-text-muted group-hover:text-[#ff6b00] group-hover:scale-110 transition-all">
                  {item.icon}
                </div>
                <div>
                  <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider block">
                    {item.label}
                  </span>
                  <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors font-body font-medium">
                    {item.value}
                  </span>
                </div>
                <svg className="w-4 h-4 text-text-muted/0 group-hover:text-[#ff6b00]/60 ml-auto transition-all group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </motion.a>
            ))}

            {/* Location badge */}
            <div className="glass-card rounded-xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ffd166]/20 to-[#ff8c00]/20 flex items-center justify-center text-[#ffd166]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider block">Location</span>
                <span className="text-sm text-text-secondary font-body font-medium">{PORTFOLIO_DATA.location}</span>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            variants={itemVariants}
            className="space-y-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label htmlFor="name" className="text-[10px] font-mono text-text-muted uppercase tracking-wider block mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3.5 rounded-xl bg-bg-card/60 backdrop-blur-sm border border-border-subtle text-text-primary font-body text-sm focus:outline-none focus:border-[#ff6b00] focus:ring-1 focus:ring-[#ff6b00]/20 transition-all placeholder:text-text-muted"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-[10px] font-mono text-text-muted uppercase tracking-wider block mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3.5 rounded-xl bg-bg-card/60 backdrop-blur-sm border border-border-subtle text-text-primary font-body text-sm focus:outline-none focus:border-[#ff6b00] focus:ring-1 focus:ring-[#ff6b00]/20 transition-all placeholder:text-text-muted"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="text-[10px] font-mono text-text-muted uppercase tracking-wider block mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full px-4 py-3.5 rounded-xl bg-bg-card/60 backdrop-blur-sm border border-border-subtle text-text-primary font-body text-sm focus:outline-none focus:border-[#ff6b00] focus:ring-1 focus:ring-[#ff6b00]/20 transition-all resize-none placeholder:text-text-muted"
                placeholder="Describe your mission..."
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(255,107,0,0.3)" }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="relative w-full px-6 py-4 rounded-xl font-body text-sm font-semibold text-white overflow-hidden transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#ff6b00] via-[#e63946] to-[#ffd166] animate-gradient-x" />
              <span className="relative z-10 flex items-center justify-center gap-2 text-black">
                Send Scroll
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            </motion.button>
          </motion.form>
        </div>
      </motion.div>
    </section>
  );
}
