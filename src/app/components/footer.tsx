"use client";

import React from "react";
import { motion } from "framer-motion";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Story", href: "/story" },
  { name: "Projects", href: "/projects" },
  { name: "Experience", href: "/experience" },
  { name: "Skills", href: "/skills" },
  { name: "Publications", href: "/publications" },
  { name: "Awards", href: "/awards" },
  { name: "Contact", href: "/contact" },
];

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/shubhamcommits",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/shubham-sinngh/",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    name: "Twitter",
    href: "https://x.com/shubhamsinngh_",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
      </svg>
    ),
  },
  {
    name: "Email",
    href: "mailto:shubham.sinngh@outlook.com",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="relative bg-black/50 backdrop-blur-sm border-t border-white/10">
      {/* Gradient line at the top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-3"
            >
              Shubham Singh
            </motion.h3>
            <p className="text-sm text-neutral-400 max-w-xs mx-auto md:mx-0">
              Visionary engineer architecting scalable systems, driving AI innovation, and leading platform engineering across corporate and startup ecosystems
            </p>
          </div>

          {/* Navigation */}
          <div className="text-center">
            <h4 className="text-sm font-semibold text-white mb-4">Quick Links</h4>
            <nav className="grid grid-cols-2 gap-2 max-w-xs mx-auto">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm text-neutral-400 hover:text-cyan-400 transition-colors duration-200 py-1.5 sm:py-0"
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact & Social */}
          <div className="text-center md:text-right">
            <h4 className="text-sm font-semibold text-white mb-4">Connect</h4>
            <div className="flex items-center gap-4 justify-center md:justify-end mb-4">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target={item.name !== "Email" ? "_blank" : undefined}
                  rel={item.name !== "Email" ? "noopener noreferrer" : undefined}
                  className="text-neutral-400 hover:text-cyan-400 transition-colors duration-200 p-2 -m-2"
                  aria-label={item.name}
                >
                  {item.icon}
                </a>
              ))}
            </div>
            <p className="text-xs text-neutral-500">
              Open to opportunities worldwide
            </p>
          </div>
        </div>

        {/* Bottom section */}
        <div className="pt-8 border-t border-white/5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-neutral-500">
              © {new Date().getFullYear()} Shubham Singh. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs text-neutral-500">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Available for hire
              </span>
              <span>•</span>
              <span>Built with Next.js & TypeScript</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-tr-full blur-2xl" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-tl-full blur-2xl" />
    </footer>
  );
}

export default Footer;