"use client";

import { motion } from "framer-motion";
import { Navbar } from "../components/ui/navbar";
import { HeroHighlight } from "../components/ui/hero-highlight";

const contactMethods = [
  {
    id: "email",
    title: "Email",
    value: "shubham.sinngh@outlook.com",
    link: "mailto:shubham.sinngh@outlook.com",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    description: "For opportunities and collaborations",
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: "linkedin",
    title: "LinkedIn",
    value: "Connect on LinkedIn",
    link: "https://linkedin.com/in/shubham-sinngh",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    description: "Professional networking",
    color: "from-blue-500 to-indigo-500",
  },
  {
    id: "github",
    title: "GitHub",
    value: "View my code",
    link: "https://github.com/shubhamcommits",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    description: "Open source contributions",
    color: "from-gray-600 to-gray-800",
  },
];

export default function ContactPage() {
  return (
    <section id="contact" className="relative">
      <Navbar className="top-2" />
      <HeroHighlight containerClassName="items-start">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 lg:pt-36 pb-12 lg:pb-24">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 lg:mb-6"
            >
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Let&apos;s Connect
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg lg:text-xl text-neutral-400 max-w-2xl mx-auto px-4"
            >
              Available for opportunities, collaborations, and meaningful conversations about technology and innovation
            </motion.p>
          </motion.div>

          {/* Contact Methods Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto"
          >
            {contactMethods.map((method, index) => (
              <motion.a
                key={method.id}
                href={method.link}
                target={method.id !== "email" ? "_blank" : undefined}
                rel={method.id !== "email" ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-800/50 backdrop-blur-sm p-6 transition-all duration-500 hover:border-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-500/10"
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/0 via-blue-600/0 to-indigo-600/0 group-hover:from-cyan-600/5 group-hover:via-blue-600/5 group-hover:to-indigo-600/5 transition-all duration-500" />
                
                <div className="relative z-10">
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${method.color} mb-4`}>
                    {method.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{method.title}</h3>
                  <p className="text-sm text-neutral-400 mb-3">{method.description}</p>
                  <p className="text-cyan-400 group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                    {method.value}
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="p-8 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
              <h2 className="text-2xl font-semibold text-white mb-4">Open to Opportunities</h2>
              <p className="text-neutral-300 leading-relaxed mb-6">
                I&apos;m always interested in hearing about new opportunities in platform engineering, 
                cloud architecture, and AI/ML operations. Whether you&apos;re looking for someone to lead 
                technical initiatives, architect scalable solutions, or drive innovation in your organization, 
                I&apos;d love to explore how we can work together.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <span className="px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-sm">
                  Platform Engineering
                </span>
                <span className="px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-sm">
                  Cloud Architecture
                </span>
                <span className="px-4 py-2 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm">
                  DevOps Leadership
                </span>
                <span className="px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm">
                  AI/ML Operations
                </span>
              </div>
            </div>
          </motion.div>

          {/* Quick Response Time */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-center mt-12"
          >
            <p className="text-sm text-neutral-500">
              <span className="inline-flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Typically responds within 24 hours
              </span>
            </p>
          </motion.div>
        </div>
      </HeroHighlight>
    </section>
  );
}