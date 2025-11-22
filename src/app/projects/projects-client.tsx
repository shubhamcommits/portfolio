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
    name: "Tangerine Platform",
    company: "Nuhma NYC",
    year: "2023",
    link: "https://www.nuhmanyc.com/",
    linkType: "live" as const,
    stack: "TypeScript, Node.js, MySQL, Firebase, Terraform, AWS, Kafka, WebSockets",
    blurb:
      "Digital platform for premier luxury in-flight catering service in New York, featuring MICHELIN-starred quality meals with real-time order management and client communication.",
    details: [
      "Built a real-time order management system handling 500+ daily orders for private jets",
      "Implemented WebSocket-based live tracking for order status and delivery updates",
      "Designed scalable microservices architecture using AWS Lambda and Kafka for event streaming",
      "Integrated with multiple payment gateways and third-party catering management systems",
      "Reduced order processing time by 60% through automation and workflow optimization"
    ],
    impact: "Serving 50+ private aviation companies across the New York metropolitan area",
    role: "Lead Platform Engineer"
  },
  {
    name: "Remix Recipe",
    company: "Open Source",
    year: "2023",
    link: "https://github.com/yourusername/remix-recipe",
    linkType: "github" as const,
    stack: "TypeScript, Node.js, MySQL, OpenAI, Auth0, AWS",
    blurb:
      "AI-powered recipe transformation platform that scrapes recipes from any URL and generates creative variations using LLMs.",
    details: [
      "Developed intelligent web scraper supporting 100+ recipe websites with 95% accuracy",
      "Integrated OpenAI GPT-4 API for context-aware recipe modifications and dietary adaptations",
      "Built robust caching system reducing API costs by 40% while maintaining quick response times",
      "Implemented user authentication and personalization features for saved recipes and preferences",
      "Created responsive UI with real-time recipe generation and ingredient substitution suggestions"
    ],
    impact: "Open source project with active community contributions and positive user feedback",
    role: "Creator & Lead Engineer"
  },
  {
    name: "SaaS Platform",
    company: "CoffeeTrace",
    year: "2021",
    link: null,
    linkType: "private" as const,
    stack: "Node.js, Python, Angular, MongoDB, Redis, Ionic, Serverless, Kafka, Solidity, Web3.js, Polygon, IPFS, Truffle, Hardhat",
    blurb:
      "Blockchain-based supply chain management platform for sustainable coffee trade with climate-friendly currency features.",
    details: [
      "Architected blockchain integration for transparent coffee bean tracking from farm to cup",
      "Developed mobile app for farmers to record harvest data and receive instant payments",
      "Built analytics dashboard showing carbon footprint and sustainability metrics",
      "Implemented smart contracts for automated fair-trade payments to coffee farmers",
      "Created REST APIs serving 10K+ daily requests with 99.9% uptime"
    ],
    impact: "Developed sustainable coffee supply chain solution with blockchain integration",
    role: "Technical Co-Founder"
  },
];

export default function ProjectsClient() {
  return (
    <section id="projects" className="relative">
      <Navbar />
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
