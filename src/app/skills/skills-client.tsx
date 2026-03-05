"use client";

import { motion } from "framer-motion";
import { Navbar } from "../components/ui/navbar";
import { HeroHighlight } from "../components/ui/hero-highlight";
import { SkillCategory, type SkillGroup } from "../components/ui/skill-category";
import { RevealCard } from "../components/ui/reveal-card";

const skillGroups: SkillGroup[] = [
  {
    id: "kubernetes",
    title: "Kubernetes & Container Orchestration",
    skills: [
      { name: "Kubernetes (EKS, GKE, On-Prem)", tier: "expert" },
      { name: "Custom Operators & CRDs", tier: "expert" },
      { name: "Helm", tier: "expert" },
      { name: "Docker", tier: "expert" },
      { name: "Istio (Service Mesh)", tier: "proficient" },
      { name: "Rancher", tier: "proficient" },
      { name: "KEDA", tier: "proficient" },
      { name: "Containerd / Podman", tier: "familiar" },
    ],
  },
  {
    id: "cloud",
    title: "Cloud & Infrastructure",
    skills: [
      { name: "AWS (EKS, EC2, Lambda, S3, IAM, VPC)", tier: "expert" },
      { name: "Terraform", tier: "expert" },
      { name: "GCP (GKE, Cloud Run)", tier: "proficient" },
      { name: "Alibaba Cloud", tier: "proficient" },
      { name: "AWS CDK", tier: "proficient" },
      { name: "Crossplane", tier: "familiar" },
    ],
  },
  {
    id: "cicd",
    title: "CI/CD & GitOps",
    skills: [
      { name: "ArgoCD", tier: "expert" },
      { name: "Spinnaker", tier: "expert" },
      { name: "GitHub Actions", tier: "expert" },
      { name: "FluxCD", tier: "proficient" },
      { name: "Jenkins", tier: "proficient" },
    ],
  },
  {
    id: "observability",
    title: "Observability & Incident Response",
    skills: [
      { name: "Prometheus", tier: "expert" },
      { name: "Grafana", tier: "expert" },
      { name: "Splunk", tier: "expert" },
      { name: "Loki", tier: "proficient" },
      { name: "ELK Stack", tier: "proficient" },
      { name: "PagerDuty", tier: "proficient" },
    ],
  },
  {
    id: "aiops",
    title: "AI Ops & Agentic Automation",
    skills: [
      { name: "K8sGPT", tier: "expert" },
      { name: "Agentic Framework Design", tier: "expert" },
      { name: "AI-Driven Remediation", tier: "expert" },
      { name: "LangChain", tier: "proficient" },
      { name: "OpenAI APIs", tier: "proficient" },
      { name: "RAG Pipelines", tier: "familiar" },
    ],
  },
  {
    id: "security",
    title: "Security & Compliance",
    skills: [
      { name: "OPA / Gatekeeper", tier: "expert" },
      { name: "HashiCorp Vault", tier: "proficient" },
      { name: "AWS GuardDuty / Security Hub", tier: "proficient" },
      { name: "RHEL Hardening & OS Patching", tier: "proficient" },
      { name: "IPVS / iptables", tier: "proficient" },
    ],
  },
  {
    id: "languages",
    title: "Programming Languages",
    skills: [
      { name: "TypeScript / JavaScript", tier: "expert" },
      { name: "Go", tier: "proficient" },
      { name: "Python", tier: "proficient" },
      { name: "Bash", tier: "expert" },
      { name: "Java", tier: "familiar" },
    ],
  },
  {
    id: "data",
    title: "Data & Messaging",
    skills: [
      { name: "PostgreSQL", tier: "expert" },
      { name: "Redis", tier: "expert" },
      { name: "Apache Kafka", tier: "proficient" },
      { name: "MongoDB", tier: "proficient" },
      { name: "RabbitMQ", tier: "familiar" },
    ],
  },
  {
    id: "linux",
    title: "Linux & Systems",
    skills: [
      { name: "Linux Administration", tier: "expert" },
      { name: "Networking & DNS", tier: "expert" },
      { name: "Kernel Internals & IPVS", tier: "proficient" },
      { name: "Performance Tuning", tier: "proficient" },
      { name: "eBPF", tier: "familiar" },
    ],
  },
  {
    id: "backend",
    title: "Backend & Architecture",
    skills: [
      { name: "Node.js", tier: "expert" },
      { name: "Microservices Architecture", tier: "expert" },
      { name: "Event-Driven Systems (Kafka, gRPC)", tier: "proficient" },
      { name: "WebSockets", tier: "proficient" },
      { name: "GraphQL", tier: "familiar" },
    ],
  },
];

// Count totals for stats
const totalSkills = skillGroups.reduce((acc, g) => acc + g.skills.length, 0);
const expertCount = skillGroups.reduce((acc, g) => acc + g.skills.filter(s => s.tier === "expert").length, 0);

export default function SkillsClient() {
  return (
    <section id="skills" className="relative">
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
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Technical Skills
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg lg:text-xl text-neutral-400 max-w-2xl mx-auto px-4"
            >
              Focused depth in platform engineering, reliability, and cloud infrastructure
            </motion.p>
          </motion.div>

          {/* Skills Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl p-6 border border-cyan-500/20">
              <h3 className="text-3xl font-bold text-white mb-2">{expertCount}</h3>
              <p className="text-neutral-400">Expert-Level Skills</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-2xl p-6 border border-blue-500/20">
              <h3 className="text-3xl font-bold text-white mb-2">{totalSkills}</h3>
              <p className="text-neutral-400">Technologies & Tools</p>
            </div>
            <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl p-6 border border-indigo-500/20">
              <h3 className="text-3xl font-bold text-white mb-2">6+</h3>
              <p className="text-neutral-400">Years in Production</p>
            </div>
          </motion.div>

          {/* Tier Legend */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 mb-12 text-xs text-neutral-500"
          >
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-gradient-to-r from-cyan-500/40 to-blue-500/40 border border-cyan-400/40" />
              <span>Expert &mdash; daily use, can architect with</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-400/25" />
              <span>Proficient &mdash; extensive production use</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-white/5 border border-white/10" />
              <span>Familiar &mdash; project-level exposure</span>
            </div>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            {skillGroups.map((group, index) => (
              <RevealCard key={group.id} delay={index * 0.05}>
                <SkillCategory group={group} index={index} />
              </RevealCard>
            ))}
          </div>
        </div>
      </HeroHighlight>
    </section>
  );
}
