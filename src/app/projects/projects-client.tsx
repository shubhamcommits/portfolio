"use client";
import { Navbar } from "../components/ui/navbar";
import { HeroHighlight } from "../components/ui/hero-highlight";
import { ProjectCard } from "../components/ui/project-card";
import { motion } from "framer-motion";
import { RevealCard } from "../components/ui/reveal-card";
// Note: Metadata should be added via generateMetadata in a server component wrapper
// or via layout.tsx for client components

const projects = [
  {
    name: "AI-Ops Agentic Framework",
    company: "Salesforce Hyperforce",
    year: "2025",
    link: null,
    linkType: "private" as const,
    stack: "Go, Python, K8sGPT, Kubernetes, Operator SDK, Prometheus, Splunk, PagerDuty API, Argus",
    blurb:
      "Multi-tenant AI-Ops framework running across 1,000+ Kubernetes clusters. Tenants build custom agents on top of a shared runtime for cluster diagnosis, alert enrichment, automated SRE reporting, and self-healing.",
    details: [
      "Architected the agentic runtime: K8sGPT-powered cluster diagnosis, PagerDuty enrichment bot, weekly SRE report generator",
      "Shipped custom Kubernetes Operators (Go, Operator SDK) for self-healing StatefulSets, cert rotation, and node remediation",
      "Cut fleet-wide incident MTTR by 70% through agent-driven triage and remediation",
      "Designed blast-radius-bounded agent guardrails — diagnostic agents read-only, remediation agents scoped to predefined actions",
      "Reduced manual intervention ~40% via self-healing Operators running across AWS, GCP, Alibaba Cloud, and on-prem RHEL",
    ],
    impact: "Production-deployed across 1,000+ Kubernetes clusters at 99.99% availability",
    role: "Architect & Lead Engineer",
  },
  {
    name: "Tangerine Platform",
    company: "Nuhma NYC",
    year: "2023 – 2024",
    link: "https://www.nuhmanyc.com/",
    linkType: "live" as const,
    stack: "TypeScript, Node.js, MySQL, Firebase, Terraform, AWS, Kafka, WebSockets",
    blurb:
      "E-commerce platform for private-aviation catering in New York. Real-time order management and client-staff communication for a MICHELIN-starred service.",
    details: [
      "Built the real-time order management and live-tracking flow using WebSockets",
      "Designed the service architecture on AWS with Lambda and Kafka for event streaming",
      "Integrated payment and catering-management third-party systems",
      "Shipped infrastructure with Terraform for repeatable, auditable deploys",
    ],
    impact: "Delivered production platform for NUHMA NYC's private-aviation catering service",
    role: "Platform Engineer",
  },
  {
    name: "Remix Recipe",
    company: "Personal / Open Source",
    year: "2023",
    link: "https://github.com/shubhamcommits/remix",
    linkType: "github" as const,
    stack: "TypeScript, Node.js, MySQL, OpenAI, Auth0, AWS",
    blurb:
      "AI-powered recipe transformation tool — scrapes recipes from a URL and generates creative variations using LLMs.",
    details: [
      "Built the web scraper + recipe parser for common recipe sites",
      "Integrated OpenAI API for context-aware recipe modifications and dietary adaptations",
      "Added caching to reduce redundant LLM calls and keep response times snappy",
      "Implemented user auth and personalization for saved recipes and preferences",
    ],
    impact: "Personal open-source experiment exploring LLM-driven content transformation",
    role: "Creator",
  },
];

export default function ProjectsClient() {
  return (
    <section id="projects" className="relative">
      <Navbar className="top-2" />
      <HeroHighlight containerClassName="items-start">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-36 pb-12 lg:pb-24">
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
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Recent Projects
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg lg:text-xl text-neutral-400 max-w-2xl mx-auto px-4"
            >
              Architecting innovative solutions across multiple domains - from e-commerce to blockchain to AI-powered tools
            </motion.p>
          </motion.div>

          {/* Projects List */}
          <div className="space-y-8 lg:space-y-12">
            {projects.map((p, index) => (
              <RevealCard key={p.name} delay={index * 0.08}>
                <ProjectCard {...p} index={index} />
              </RevealCard>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 lg:mt-20 text-center px-4"
          >
            <p className="text-sm sm:text-base text-neutral-400 mb-6">
              Interested in collaborating or learning more about my work?
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm sm:text-base font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/50 hover:scale-105"
            >
              Get in Touch
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </motion.div>
        </div>
      </HeroHighlight>
    </section>
  );
}
