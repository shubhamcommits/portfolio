"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar } from "../components/ui/navbar";
import { HeroHighlight } from "../components/ui/hero-highlight";
import { RevealCard } from "../components/ui/reveal-card";

const tools = [
  {
    name: "JSON Formatter & Validator",
    description:
      "Format, validate, and beautify JSON instantly. Minify, sort keys, view stats, and catch errors with line-level hints. The fastest way to debug JSON.",
    href: "/tools/json-formatter",
    gradient: "from-amber-500 to-orange-500",
    hoverBorder: "hover:border-amber-500/30",
    hoverShadow: "hover:shadow-amber-500/10",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    tags: ["JSON", "Formatter", "Validator", "Free"],
  },
  {
    name: "YAML ↔ JSON Converter",
    description:
      "Convert between YAML and JSON in either direction. Built for Kubernetes manifests, Docker Compose files, CI/CD configs, and infrastructure-as-code.",
    href: "/tools/yaml-json-converter",
    gradient: "from-emerald-500 to-teal-500",
    hoverBorder: "hover:border-emerald-500/30",
    hoverShadow: "hover:shadow-emerald-500/10",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
    tags: ["YAML", "JSON", "K8s", "DevOps", "Free"],
  },
  {
    name: "K8s Manifest Generator",
    description:
      "Generate production-ready Kubernetes YAML from an interactive form. Supports Deployments, Services, Ingress, ConfigMaps, Secrets, CronJobs, HPAs, and PDBs.",
    href: "/tools/k8s-manifest-generator",
    gradient: "from-blue-500 to-indigo-500",
    hoverBorder: "hover:border-blue-500/30",
    hoverShadow: "hover:shadow-blue-500/10",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
    tags: ["Kubernetes", "YAML", "K8s", "DevOps", "Free"],
  },
  {
    name: "Markdown to PDF",
    description:
      "Convert Markdown to beautifully styled, print-ready PDFs. Live preview, GitHub-flavored markdown, and instant export. No sign-up required.",
    href: "/tools/markdown-to-pdf",
    gradient: "from-cyan-500 to-blue-500",
    hoverBorder: "hover:border-cyan-500/30",
    hoverShadow: "hover:shadow-cyan-500/10",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    tags: ["Markdown", "PDF", "Export", "Free"],
  },
  {
    name: "AI Text Cleaner",
    description:
      "Strip the AI smell from your writing. Removes overused phrases, filler words, and robotic patterns that make text sound like ChatGPT wrote it.",
    href: "/tools/ai-text-cleaner",
    gradient: "from-purple-500 to-pink-500",
    hoverBorder: "hover:border-purple-500/30",
    hoverShadow: "hover:shadow-purple-500/10",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    tags: ["AI", "Writing", "Cleanup", "Free"],
  },
];

export default function ToolsClient() {
  return (
    <section id="tools" data-track-section="tools_root" className="relative">
      <Navbar className="top-2" />
      <HeroHighlight containerClassName="items-start">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-36 pb-12 lg:pb-24">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Free &middot; No Sign-up
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 lg:mb-6"
            >
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Developer Tools
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg lg:text-xl text-neutral-400 max-w-2xl mx-auto px-4"
            >
              Small utilities I built for myself and now share with everyone. Runs entirely in your browser - nothing leaves your machine.
            </motion.p>
          </motion.div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {tools.map((tool, index) => (
              <RevealCard key={tool.name} delay={index * 0.1}>
                <Link href={tool.href} className="block h-full">
                  <div
                    className={`group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-800/50 p-8 transition-all duration-300 ${tool.hoverBorder} hover:shadow-xl ${tool.hoverShadow}`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/0 via-blue-600/0 to-purple-600/0 group-hover:from-cyan-600/5 group-hover:via-blue-600/5 group-hover:to-purple-600/5 transition-all duration-500" />

                    <div className="relative z-10">
                      <div
                        className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${tool.gradient} mb-5 text-white`}
                      >
                        {tool.icon}
                      </div>

                      <h2 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                        {tool.name}
                      </h2>

                      <p className="text-sm text-neutral-400 leading-relaxed mb-5">
                        {tool.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {tool.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-medium px-2 py-1 rounded-md bg-white/5 border border-white/10 text-neutral-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 text-sm font-medium text-cyan-400 group-hover:text-cyan-300 transition-colors">
                        Open tool
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </RevealCard>
            ))}
          </div>

          {/* Privacy note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center text-xs text-neutral-600 mt-12"
          >
            All processing happens client-side. Your data never leaves your browser.
          </motion.p>
        </div>
      </HeroHighlight>
    </section>
  );
}
