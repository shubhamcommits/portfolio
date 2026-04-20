"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { Navbar } from "../components/ui/navbar";
import { ExperienceCard, ExperienceItem } from "../components/ui/experience-card";
import { HeroHighlight } from "../components/ui/hero-highlight";
// Note: Metadata should be added via generateMetadata in a server component wrapper
// or via layout.tsx for client components

const roles: ExperienceItem[] = [
  {
    id: "salesforce",
    company: "Salesforce, Inc.",
    location: "Hyderabad, India",
    period: "Sep 2024 - Present",
    employment: "Member of Technical Staff - (Hybrid/Remote)",
    title: "Member of Technical Staff",
    summary: "Empowering platform resilience and scale - owning software development, CI/CD pipeline optimisation, infrastructure automation, proactive monitoring & alerting, security hardening, performance tuning, incident diagnosis, and cross-team collaboration.",
    highlights: [
      "Achieved 99.99% service availability for 1,000+ Kubernetes clusters across hybrid cloud (AWS/Ali/GCP) and on-prem environments through systematic OS patching, kernel upgrades, and IPVS optimization.",
      "Cut deployment cycles by 30% by architecting streamlined CI/CD pipelines with Terraform, Spinnaker, and ArgoCD, enabling faster iteration velocity for engineering teams.",
      "Reduced mean time to detect (MTTD) issues by 40% through comprehensive Grafana monitoring dashboards and Splunk integration, dramatically improving incident response times.",
    ],
    details: [
      "Oversaw critical infrastructure tasks, including regular OS patching, kernel upgrades, and IPVS module rollouts to optimize load balancing for on-prem systems.",
      "Designed and developed an advanced AI agentic framework (Warden AI Ops) enabling multi-tenancy, allowing tenants to build customized AI agents directly on top of this platform.",
      "Leveraged this framework to significantly enhance automated incident detection & remediation capabilities, achieving a 70% reduction in incident resolution times, empowering tenants to innovate rapidly.",
      "Created agents like weekly SQR report; K8s Agent troubleshooting that uses K8sGPT to solve & auto heal the k8s related issues; Pager Duty alert automation to describe the alert & suggest remediation.",
      "Created Kubernetes Operators for automated self-healing workflows, reducing manual intervention by approximately 40%.",
      "Actively engaged in cross-team collaboration, contributing to architecture design, security assessments, quarterly reliability initiatives, and performance tuning.",
      "Building Customer Engagement Framework (CEF), which remediates the Pager Duty alerts by intercepting the metrics and raising the same back to our tenants from the Argus queries, resulting in reducing the ops toil and burden for unnecessary alerts by 30%.",
    ],
    impact: {
      metrics: [
        "99.99% service availability across 1,000+ K8s clusters",
        "30% reduction in deployment cycles",
        "40% faster issue detection (MTTD)",
        "70% reduction in incident resolution times (MTTR)",
        "40% reduction in manual intervention",
        "30% reduction in unnecessary alerts",
      ],
      outcomes: [
        "Enabled multi-tenant AI operations platform for rapid innovation",
        "Established self-healing infrastructure patterns",
        "Improved cross-team collaboration and architectural standards",
      ],
    },
    tags: ["Kubernetes", "Terraform", "Spinnaker", "ArgoCD", "Grafana", "Splunk", "K8sGPT", "AI Ops", "RHEL", "AWS", "GCP", "Alibaba Cloud"],
    logoSrc: "/logos/salesforce.jpg",
  },
  {
    id: "airtel",
    company: "Airtel Africa",
    location: "Gurgaon, India",
    period: "May 2022 - Sep 2024",
    employment: "Site Reliability Engineer (E2) - (Hybrid/Remote)",
    title: "Site Reliability Engineer (E2)",
    summary: "Kept the ship sailing! Was responsible for software development, release, deployments, monitoring, automation (CI/CD), security, diagnosis for optimal performance, and supporting the IT infrastructure environment.",
    highlights: [
      "Earned Einstein Award within months of joining by delivering exceptional performance and driving critical platform improvements across the organization.",
      "Grew and led a team of 3 engineers from formation to high performance, implementing mentorship programs that improved project delivery speed and code quality.",
      "Enabled telecom operations across 14 countries by successfully deploying NPO, KYC 2.0, E-Sim, and CLM platforms, directly impacting millions of subscribers.",
    ],
    details: [
      "Built a product involving AI/ML Ops, focusing on anomaly detection, triage, & resilience.",
      "Developed an Affair System using MEAN, JAVA, & Python which automated user-defined workflows & tasks, Health-Checks, Recon, & RT Dash. This system reduced the functional dependency by 70%.",
      "Orchestrated 200+ Micro-services & their CI/CD pipelines using K8s, Rancher, Flux & Jenkins.",
      "Monitored and reported on Service Level Objectives (SLOs) for desired application services.",
      "Optimised runtime DB queries (SQL and NoSQL) and generated custom metrics from Grafana & Kibana.",
    ],
    impact: {
      metrics: [
        "70% reduction in functional dependency through Affair System",
        "200+ micro-services orchestrated across 14 countries",
        "Team of 3 engineers directly managed",
        "Einstein Award recipient for exceptional performance",
      ],
      outcomes: [
        "Successfully deployed critical platforms (NPO, KYC 2.0, E-Sim, CLM) globally",
        "Established AI/ML-driven anomaly detection and resilience systems",
        "Improved team productivity through technical guidance and skill development",
      ],
    },
    tags: ["Kubernetes", "Rancher", "Flux", "Jenkins", "Grafana", "Kibana", "MEAN Stack", "Java", "Python", "AI/ML Ops", "SLO Monitoring"],
    logoSrc: "/logos/airtel.png",
    certificates: [
      {
        title: "Outstanding Performance Award 2022",
        file: "/logos/Airtel - Outstanding Performance 2022.pdf",
        type: "award",
      },
      {
        title: "Outstanding Performance Award 2023",
        file: "/logos/Airtel - Outstanding Performance 2023.pdf",
        type: "award",
      },
      {
        title: "Experience & Relieving Letter",
        file: "/logos/Airtel - Relieving Letter.pdf",
        type: "letter",
      },
    ],
  },
  {
    id: "amway",
    company: "Amway India",
    location: "Gurgaon, India",
    period: "Jun 2020 - Apr 2022",
    employment: "DevOps Engineer (Remote) → DevSecOps Engineer (Hybrid)",
    title: "DevOps → DevSecOps Engineer",
    summary: "Responsible for development, deployments, and engaged with multiple activities to provide users a frictionless shopping experience. Worked as a Technical SEO Manager, Technical DevSecOps Engineer across various functional teams and as a Product Owner & Engineer to mitigate production support incidents.",
    highlights: [
      "Eliminated 500 annual production incidents (100 monthly, 400 annual) by architecting ACUTE - a centralized platform serving 5+ critical business domains including reconciliation, sales, tax, and support.",
      "Achieved 100% Lighthouse and DeepCrawl SEO scores (up from stagnant 67%) as Technical SEO Manager, directly improving organic traffic and search visibility for Amway India's e-commerce platform.",
      "Earned rapid promotion to DevSecOps Engineer within 11 months and received 3 performance awards (Flame & Ignite) for consistently exceeding expectations.",
    ],
    details: [],
    subRoles: [
      {
        title: "DevSecOps Engineer",
        period: "Jun 2021 - Apr 2022 (Hybrid)",
        bullets: [
          "Took over responsibility as Technical SEO Manager for entire Amway India and improved Lighthouse and DeepCrawl scores from stagnant 67% to extreme 100% by resolving technical barriers.",
          "Accomplished 10+ order journeys & developed scripts for performance testing using headless chrome, Node.js, Influx DB, AWS Lambda, Jenkins, and Grafana.",
          "Developed ACUTE platform - a centralised system helping in more than 5 domains including reconciliation, sales, tax, support, and reporting.",
          "ACUTE curtailed monthly and annual production incidents by 100 and 400 respectively.",
          "Identified, gathered, analysed and automated responses to key performance metrics, logs, and alerts.",
          "Acquired expertise and fostered with Amstack - an internal system for automating CI/CD pipelines in AWS and Jenkins, slashing barriers and dependencies from 3rd party service providers.",
          "Provided continuous assistance to Data Team, Support Team, Marketing Team, and Finance Team daily.",
        ],
      },
      {
        title: "DevOps Engineer",
        period: "Jun 2020 - May 2021 (Remote)",
        bullets: [
          "Reduced docker build time by 40% via optimising CI/CD scripts and fixing connections with AWS runners.",
          "Worked extensively with AWS, seamlessly integrating multiple services such as Kinesis, Lambda, and IAM.",
          "Reconciled data between 10+ micro-services and developed new CI/CD pipelines.",
          "Received recognition 3 times with Flame and Ignite awards, showcasing excellent performance.",
        ],
      },
    ],
    milestones: [
      { after: 0, label: "Promoted to DevSecOps Engineer" },
    ],
    impact: {
      metrics: [
        "67% to 100% improvement in Lighthouse and DeepCrawl SEO scores",
        "40% reduction in docker build time",
        "100 monthly and 400 annual incidents reduced through ACUTE",
        "10+ order journeys automated",
        "5+ domains served by ACUTE platform",
        "3x award recipient (Flame & Ignite)",
      ],
      outcomes: [
        "Eliminated dependency on 3rd party service providers through Amstack",
        "Established centralized platform for cross-functional operations",
        "Enhanced customer experience through performance optimization",
      ],
    },
    tags: ["AWS", "Jenkins", "Node.js", "InfluxDB", "Grafana", "Docker", "Lambda", "Kinesis", "IAM", "Headless Chrome", "SEO", "CI/CD"],
    logoSrc: "/logos/amway.png",
    certificates: [
      {
        title: "Flame Award 2021",
        file: "",
        type: "award",
      },
      {
        title: "Ignite Award 2022",
        file: "",
        type: "award",
      },
      {
        title: "Experience & Relieving Letter",
        file: "/logos/Amway - Relieving Letter.pdf",
        type: "letter",
      },
    ],
  },
  {
    id: "legitmark",
    company: "Legitmark, Inc.",
    location: "New York, NY, USA · Remote",
    period: "Jul 2023 - Present",
    employment: "Engineering · Part-time",
    title: "Engineering",
    summary: "Owning engineering operations end-to-end: AWS infrastructure, backend services, CI/CD, and integrations. Shipped integrations with SoleSavy, RealAuthentication, TikTok Shop, and Upright; eBay integration in progress.",
    highlights: [
      "Built and run the entire engineering stack - AWS infra (CDK, Terraform, Aurora, Redis, CloudFront, App Runner), backend services, CI/CD, and observability.",
      "Shipped 4 marketplace integrations end-to-end (SoleSavy, RealAuthentication, TikTok Shop, Upright); currently owning the eBay integration.",
      "Own the full delivery loop: IaC, GitHub Actions pipelines, deploys, monitoring, and incident response.",
    ],
    details: [
      "Designed AWS infrastructure with CDK + Terraform; services run on App Runner with Aurora Postgres and Redis caching.",
      "Shipped Node.js and Python backend services focused on scalability and authentication throughput.",
      "Set up Kafka-based messaging between services; used Orkes (Netflix OSS Conductor) for workflow orchestration.",
      "Integrated CloudFront CDN for media delivery; tuned caching for product image workloads.",
      "Own CI/CD - GitHub Actions pipelines, IaC for all cloud resources, automated deploys."
    ],
    impact: {
      metrics: [
        "End-to-end ownership across infra, backend, CI/CD, and integrations",
        "4 marketplace integrations shipped (SoleSavy, RealAuthentication, TikTok Shop, Upright)",
        "eBay integration in progress",
        "AWS-native stack: CDK, Terraform, Aurora, Redis, CloudFront, App Runner",
      ],
      outcomes: [
        "Kept a lean AWS-native stack running with a one-person engineering team",
        "Established CI/CD and IaC baseline from scratch"
      ],
    },
    tags: ["AWS", "AWS CDK", "Terraform", "Node.js", "Python", "Redis", "Kafka", "Aurora", "CloudFront", "App Runner", "GitHub Actions", "Orkes Conductor", "IaC"],
    logoSrc: "/logos/legitmark.svg",
  },
  {
    id: "octonius",
    company: "Octonius Inc.",
    location: "Palo Alto, CA, USA; Barcelona, Spain",
    period: "Jun 2018 - Aug 2021",
    employment: "Software Engineer → Front-End Chapter Lead → Chief Product Officer",
    title: "Co-Founder & Chief Product Officer",
    summary: "Built the product from scratch, progressing from Software Engineer to Chief Product Officer in 13 months. Worked on the core MEAN Stack system, established CI/CD pipelines, managed database infrastructure, and created the infrastructure to deliver the product to customers.",
    highlights: [
      "Delivered 40% performance improvement, 50% bundle size reduction, and 30% stability gains by leading complete application refactoring from monolith to microservices architecture with 15+ services and 150+ REST APIs.",
      "Scaled team from 3 to 10+ engineers while advancing from Software Engineer to Chief Product Officer in 13 months, demonstrating technical excellence and leadership in a high-growth startup environment.",
      "Built Folio - a real-time collaborative document system supporting 1000+ concurrent users-using ShareDB and WebSockets, earning company recognition as Best of Palo Alto Awards 2020 and TOP REMOTE WORK TECH by CIO Reviews.",
    ],
    details: [],
    subRoles: [
      {
        title: "Co-Founder & Chief Product Officer",
        period: "Jul 2019 - Aug 2021 (Remote)",
        bullets: [
          "Collaborated with CEO on prototyping and implementation of the platform.",
          "Led product development efforts to deliver a scalable application serving clients.",
          "Worked on refactoring the codebase, resulting in 40% faster load times, 50% smaller bundle size, and 30% improved stability.",
          "Received Best of Palo Alto Awards 2020 in Software Company category and TOP REMOTE WORK TECH recognition by CIO Reviews.",
          "Managed technology roadmap and ensured alignment with business goals.",
          "Coordinated development timelines for services across the team.",
          "Made technology decisions regarding architecture and infrastructure.",
          "Implemented systems maintaining high uptime and operational efficiency.",
        ],
      },
      {
        title: "Front-End Chapter Lead, Software Engineering",
        period: "Dec 2018 - Jun 2019 (Remote)",
        bullets: [
          "Participated in hiring and onboarding new team members.",
          "Managed a team of 10+ developers across various functions.",
          "Implemented containerization using Docker Swarm, reducing deployment dependencies by 80%.",
          "Documented 15 services with their contracts, modules, and REST API endpoints.",
          "Built Folio - a real-time collaboration system using ShareDB, WebSockets, and Quill.JS, supporting concurrent users.",
          "Contributed to improving frontend technical capabilities through code reviews and mentorship.",
        ],
      },
      {
        title: "Software Engineer",
        period: "Jun 2018 - Nov 2018 (Remote)",
        bullets: [
          "Developed features using Angular 8 frontend and Node.js backend.",
          "Integrated Google Drive Cloud service for document storage.",
          "Worked on technical feasibility analysis for UI/UX designs.",
          "Optimized application performance and scalability.",
          "Built Kanban Board system for task management.",
        ],
      },
    ],
    milestones: [
      { after: 1, label: "Promoted to Front-End Chapter Lead" },
      { after: 0, label: "Elevated to Chief Product Officer" },
    ],
    impact: {
      metrics: [
        "Progressed from Software Engineer to Chief Product Officer in 13 months",
        "Worked on 15+ services and 150+ REST APIs",
        "Contributed to 40% faster load times, 50% smaller bundles, 30% improved stability",
        "Managed team of 10+ developers",
        "Reduced deployment dependencies by 80%",
        "Built collaboration system supporting concurrent users",
      ],
      outcomes: [
        "Recognized with Best of Palo Alto Awards 2020 and TOP REMOTE WORK TECH by CIO Reviews",
        "Helped build product from initial development to production",
        "Contributed to establishing scalable technical foundation",
      ],
    },
    tags: ["Angular", "Node.js", "MongoDB", "Docker Swarm", "ShareDB", "WebSockets", "Quill.JS", "MEAN Stack", "REST APIs", "Google Drive API"],
    logoSrc: "/logos/octonius.png",
  }
];

export default function ExperienceClient() {
  const [active, setActive] = useState<"corporates" | "startups">("corporates");

  const corporateRoles: ExperienceItem[] = roles.filter((r) => ["salesforce", "airtel", "amway"].includes(r.id || ""));
  const startupRoles: ExperienceItem[] = roles.filter((r) => ["octonius", "legitmark"].includes(r.id || ""));

  const tabs: { key: typeof active; label: string; items: ExperienceItem[] }[] = [
    { key: "corporates", label: "Corporates", items: corporateRoles },
    { key: "startups", label: "Startups", items: startupRoles },
  ];

  // Simple tabs (no sticky, no URL sync)

  return (
    <section id="experience" data-track-section="experience_root">
      <div className="relative w-full flex items-center justify-center">
        <Navbar className="top-2" />
      </div>
      <HeroHighlight containerClassName="items-start">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-36 pb-12 lg:pb-24">
          {/* Enhanced Header Section */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 lg:mb-6"
            >
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Professional Journey
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg lg:text-xl text-neutral-400 max-w-3xl mx-auto px-4"
            >
              Driving innovation through platform engineering, DevOps excellence, and AI-powered solutions - from startups to enterprise scale
            </motion.p>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12 flex justify-center"
          >
            <div className="inline-flex p-1 bg-white/5 rounded-full backdrop-blur-lg border border-white/10">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setActive(t.key)}
                  className={cn(
                    "relative px-4 py-2 sm:px-6 sm:py-2.5 text-xs sm:text-sm font-medium rounded-full transition-all duration-300",
                    active === t.key
                      ? "text-white"
                      : "text-neutral-400 hover:text-white"
                  )}
                  aria-pressed={active === t.key}
                >
                  {active === t.key && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{t.label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {tabs.map((t) =>
            active === t.key ? (
              <div key={t.key} className="space-y-10">
                {t.items.map((r, idx) => (
                  <ExperienceCard
                    key={`${r.company}-${r.title}-${idx}-${t.key}`}
                    {...r}
                    defaultExpanded={idx === 0}
                    showTimelineDot={false}
                    index={idx}
                  />
                ))}
              </div>
            ) : null
          )}
        </div>
      </HeroHighlight>
    </section>
  );
}
