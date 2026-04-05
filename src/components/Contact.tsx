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
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const contactItems = [
  {
    label: "Email",
    value: PORTFOLIO_DATA.email,
    href: `mailto:${PORTFOLIO_DATA.email}`,
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
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
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
  },
  {
    label: "Location",
    value: PORTFOLIO_DATA.location,
    href: "#",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    value: "Komal Shrestha",
    href: PORTFOLIO_DATA.linkedin,
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
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
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
      </svg>
    ),
  },
];

export function Contact() {
  return (
    <section id="contact" className="py-24 bg-bg-secondary">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto px-6"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-text-primary uppercase tracking-tight">
            Let&apos;s Build Something
          </h2>
          <p className="text-text-secondary font-body mt-4 max-w-md mx-auto">
            Have a project in mind? I&apos;d love to hear about it. Reach out
            and let&apos;s create something amazing together.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-6">
            {contactItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  item.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-lg bg-bg-card border border-border-subtle flex items-center justify-center text-text-muted group-hover:text-accent-indigo group-hover:border-border-accent transition-colors">
                  {item.icon}
                </div>
                <div>
                  <span className="text-xs font-mono text-text-muted uppercase tracking-wider block">
                    {item.label}
                  </span>
                  <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors font-body">
                    {item.value}
                  </span>
                </div>
              </a>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.form
            variants={itemVariants}
            className="space-y-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label
                htmlFor="name"
                className="text-xs font-mono text-text-muted uppercase tracking-wider block mb-2"
              >
                Name
              </label>
              <motion.input
                whileFocus={{
                  borderColor: "var(--accent-indigo)",
                  boxShadow: "0 0 0 2px rgba(99, 102, 241, 0.2)",
                }}
                type="text"
                id="name"
                className="w-full px-4 py-3 rounded-lg bg-bg-card border border-border-subtle text-text-primary font-body text-sm focus:outline-none transition-all placeholder:text-text-muted"
                placeholder="Your name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="text-xs font-mono text-text-muted uppercase tracking-wider block mb-2"
              >
                Email
              </label>
              <motion.input
                whileFocus={{
                  borderColor: "var(--accent-indigo)",
                  boxShadow: "0 0 0 2px rgba(99, 102, 241, 0.2)",
                }}
                type="email"
                id="email"
                className="w-full px-4 py-3 rounded-lg bg-bg-card border border-border-subtle text-text-primary font-body text-sm focus:outline-none transition-all placeholder:text-text-muted"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="text-xs font-mono text-text-muted uppercase tracking-wider block mb-2"
              >
                Message
              </label>
              <motion.textarea
                whileFocus={{
                  borderColor: "var(--accent-indigo)",
                  boxShadow: "0 0 0 2px rgba(99, 102, 241, 0.2)",
                }}
                id="message"
                rows={5}
                className="w-full px-4 py-3 rounded-lg bg-bg-card border border-border-subtle text-text-primary font-body text-sm focus:outline-none transition-all resize-none placeholder:text-text-muted"
                placeholder="Tell me about your project..."
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full px-6 py-3 rounded-lg bg-accent-indigo text-white font-body text-sm font-medium hover:bg-indigo-500 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-indigo focus:ring-offset-2 focus:ring-offset-bg-secondary"
            >
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </motion.div>
    </section>
  );
}
