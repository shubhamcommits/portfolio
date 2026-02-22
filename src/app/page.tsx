"use client";
import { Hero } from "../app/components/hero";
import { motion } from "framer-motion";
import { RevealCard } from "./components/ui/reveal-card";

const testimonials = [
  {
    quote:
      "Shubham was highly regarded by the team and his expertise and knowledge, alongside his long practical experience, helped drive the project in the right direction.",
    author: "Adrian Anghel",
    role: "Senior Software Engineer, Octonius Inc.",
    highlight: "Technical Leadership",
  },
  {
    quote:
      "He is a great teacher and I found it very easy to learn from him and retain all the information. He is extremely passionate and hardworking about the work he is doing.",
    author: "Charishma Thota",
    role: "Solutions Architect at BigPanda",
    highlight: "Teaching & Communication",
  },
  {
    quote:
      "As a leader, he cares about the growth of others. His kindness and patience help me grow from an intern who knows a little about Node.js to someone who can write full-stack code within 3 months.",
    author: "Jessie Jia",
    role: "Founder | Ex Meta",
    highlight: "Mentorship & Growth",
  },
];

const topSkills = [
  {
    title: "AI Ops & SRE",
    highlights: [
      "Operate 800+ Kubernetes clusters across AWS, GCP & Alibaba",
      "Design AI agents (Warden, K8sGPT) for self-healing & auto-remediation",
      "Deliver 99.99% uptime via chaos testing, runbooks, and proactive detection",
    ],
    accent: "from-cyan-500 to-blue-500",
  },
  {
    title: "Platform Engineering & DevSecOps",
    highlights: [
      "Build GitOps-driven supply chains with Terraform, Spinnaker, ArgoCD",
      "Create multi-tenant developer platforms that remove toil and accelerate releases",
      "Embed security (OPA, Vault, GuardDuty) into CI/CD and infra automation",
    ],
    accent: "from-blue-500 to-indigo-500",
  },
  {
    title: "Cloud Architecture & FinOps",
    highlights: [
      "Lead cost reductions up to 70% via workload rightsizing & smart caching",
      "Architect hybrid infrastructure with AWS CDK, Crossplane, Aurora, Redis",
      "Establish performance baselines and governance for enterprise platforms",
    ],
    accent: "from-indigo-500 to-purple-500",
  },
  {
    title: "Observability & Incident Intelligence",
    highlights: [
      "Build full-fidelity telemetry stacks with Prometheus, Grafana, Splunk, Loki",
      "Translate SLOs into actionable alerts, runbooks, and on-call automation",
      "Use AI summarization to speed triage and keep humans focused on impact",
    ],
    accent: "from-purple-500 to-pink-500",
  },
  {
    title: "Backend Systems & Software Architecture",
    highlights: [
      "Design event-driven services (Kafka, gRPC, WebSockets) that handle 10K+ RPS with 99.9% uptime",
      "Lead monolith-to-microservices migrations with clear domain boundaries and DX-first APIs",
      "Build zero-downtime CI/CD pipelines, feature flags, and rollout strategies for mission-critical apps",
    ],
    accent: "from-pink-500 to-rose-500",
  },
];

export default function Home() {
  return (
    <div>
      <Hero />
      
      {/* Executive Summary Section */}
      <section className="relative bg-black -mt-32 md:-mt-40 pb-20 md:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative">
              {/* Decorative element */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-2xl blur-xl" />
              
              <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/50 border border-white/20 rounded-2xl p-8 md:p-12">
                <h2 className="text-cyan-400 text-sm font-semibold uppercase tracking-wider mb-6 text-center">
                  What I Bring to the Table
                </h2>
                <p className="text-lg md:text-xl text-neutral-300 leading-relaxed text-center mb-8">
                  I architect <span className="text-white font-semibold">resilient infrastructure at enterprise scale</span> while 
                  maintaining the velocity and innovation mindset of a startup founder. My approach: eliminate toil through 
                  intelligent automation, build platforms that empower teams rather than constrain them, and leverage 
                  smart solutions to anticipate failures before they impact users. <span className="text-white font-semibold">I don&apos;t just maintain 
                  systems - I transform them into competitive advantages.</span>
                </p>
                
                {/* Key metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 pt-8 border-t border-white/10">
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                      800+
                    </div>
                    <div className="text-sm text-neutral-400">K8s Clusters Managed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                      99.99%
                    </div>
                    <div className="text-sm text-neutral-400">Uptime Achieved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                      70%
                    </div>
                    <div className="text-sm text-neutral-400">Cost Reduction</div>
                  </div>
                </div>
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="/RESUME_SHUBHAM_2026.pdf"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300"
                  >
                    Download Resume
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
                    </svg>
                  </a>
                  <a
                    href="/contact"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition-all duration-300"
                  >
                    Book an Intro Call
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Top Skills Section */}
      <section className="relative bg-black py-20 md:py-32 border-t border-white/5 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400 mb-3">
              Core Strengths
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Where I Create Leverage
              </span>
            </h2>
            <p className="text-neutral-400 max-w-3xl mx-auto">
              From AI-driven operations to cost-optimized multi-cloud platforms, here are the themes I reliably deliver on.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {topSkills.map((skill, index) => (
              <RevealCard
                key={skill.title}
                delay={index * 0.08}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/70 to-slate-800/40 p-6 lg:p-8 transition-all duration-300 hover:border-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/10"
              >
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white mb-4 bg-gradient-to-r ${skill.accent}`}>
                  {skill.title}
                </div>
                <ul className="space-y-3 text-sm text-neutral-300">
                  {skill.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-cyan-400" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </RevealCard>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative bg-black py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                What Colleagues Say
              </span>
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              Real recommendations from engineers, mentees, and teammates
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <RevealCard
                key={testimonial.author}
                delay={index * 0.08}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-800/50 p-6 hover:border-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/0 via-blue-600/0 to-purple-600/0 group-hover:from-cyan-600/5 group-hover:via-blue-600/5 group-hover:to-purple-600/5 transition-all duration-500" />
                <div className="relative z-10">
                  <div className="flex items-start gap-2 mb-4">
                    <svg className="w-6 h-6 text-cyan-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                      {testimonial.highlight}
                    </span>
                  </div>
                  <p className="text-neutral-300 leading-relaxed mb-6 text-sm italic">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <div className="border-t border-white/10 pt-4">
                    <p className="text-white font-semibold text-sm">{testimonial.author}</p>
                    <p className="text-xs text-neutral-400">{testimonial.role}</p>
                  </div>
                </div>
              </RevealCard>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <a
              href="/story#testimonials"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
            >
              View all recommendations
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
