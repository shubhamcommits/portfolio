"use client";

import { motion } from "framer-motion";
import { Navbar } from "../components/ui/navbar";
import { HeroHighlight } from "../components/ui/hero-highlight";
import { SkillCategory } from "../components/ui/skill-category";

interface SkillGroup {
  id: string;
  title: string;
  skills: string[];
}

const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    title: "Programming Languages",
    skills: ["TypeScript / JavaScript", "Python", "Java", "Go (Golang)", "C / C++", "C#"],
  },
  {
    id: "frontend",
    title: "Frontend Frameworks & Libraries",
    skills: ["React.js", "Angular", "Svelte", "Electron.js", "HTML5", "CSS3"],
  },
  {
    id: "backend",
    title: "Backend & Runtime Environments",
    skills: ["Node.js", "Nginx", "Tomcat", "GraphQL", "Socket Programming"],
  },
  {
    id: "databases",
    title: "Databases & Data Stores",
    skills: [
      "MySQL",
      "PostgreSQL",
      "SQL Server",
      "MongoDB",
      "Redis",
      "InfluxDB",
      "Prometheus (TSDB)"
    ],
  },
  {
    id: "iac",
    title: "Infrastructure as Code (IaC)",
    skills: ["Terraform", "AWS CDK", "AWS CloudFormation", "Crossplane", "Helm", "Kustomize"],
  },
  {
    id: "aws",
    title: "AWS Cloud Services",
    skills: [
      "Amazon EKS",
      "EC2",
      "Lambda",
      "App Runner",
      "S3",
      "EBS",
      "EFS",
      "CloudFront",
      "Route 53",
      "IAM",
      "Cognito",
      "Security Groups",
      "NACL",
      "Auto Scaling",
      "Systems Manager (SSM)",
      "Secrets Manager"
    ],
  },
  {
    id: "kubernetes",
    title: "Kubernetes & Container Orchestration",
    skills: [
      "Kubernetes",
      "Operators & CRDs",
      "Docker",
      "Docker Compose",
      "Docker Swarm",
      "Rancher",
      "Istio (Service Mesh)",
      "MinIO",
      "KEDA",
      "Flux",
      "Buildah",
      "Podman",
      "Containerd"
    ],
  },
  {
    id: "cicd",
    title: "CI/CD & GitOps",
    skills: [
      "Jenkins",
      "GitLab CI/CD",
      "GitHub Actions",
      "Bitbucket Pipelines",
      "Travis CI",
      "ArgoCD (GitOps)",
      "Flux (GitOps)",
      "Spinnaker"
    ],
  },
  {
    id: "observability",
    title: "Monitoring & Observability",
    skills: [
      "Prometheus",
      "Grafana",
      "Dynatrace",
      "Splunk",
      "ELK Stack (Elasticsearch, Logstash, Kibana)",
      "Loki",
      "CloudWatch",
      "CloudTrail",
      "Fluentd",
      "Vector"
    ],
  },
  {
    id: "security",
    title: "Security & Compliance",
    skills: [
      "SonarQube",
      "AWS Security Hub",
      "GuardDuty",
      "AWS Shield",
      "WAF (Web Application Firewall)",
      "Amazon Inspector",
      "OPA/Gatekeeper",
      "HashiCorp Vault",
      "Puppet"
    ],
  },
  {
    id: "messaging",
    title: "Message Brokers & Event Streaming",
    skills: ["Apache Kafka", "RabbitMQ", "Amazon SQS", "Apache Pulsar", "Redis Streams", "MQTT"],
  },
  {
    id: "search",
    title: "Search & Analytics Engines",
    skills: ["Elasticsearch", "OpenSearch", "Apache Solr"],
  },
  {
    id: "linux",
    title: "Linux & System Administration",
    skills: [
      "Linux/Unix Administration",
      "System Performance Tuning",
      "Networking & DNS",
      "File Systems",
      "Kernel Internals",
      "System Troubleshooting",
      "eBPF",
      "iptables/nftables",
      "System Calls"
    ],
  },
  {
    id: "aiml",
    title: "AI/ML & LLM Operations",
    skills: [
      "LangChain",
      "OpenAI APIs",
      "Amazon Bedrock",
      "Hugging Face Transformers",
      "TensorFlow",
      "PyTorch",
      "scikit-learn",
      "Vector Databases (Weaviate, Pinecone)",
      "RAG Pipelines",
      "Prompt Engineering",
      "Autonomous Agents",
      "Agentic Framework Design",
      "AI-driven Monitoring & Remediation",
      "LLM Orchestration",
      "GitHub Copilot",
      "AWS CodeWhisperer",
      "Cursor AI"
    ],
  },
];

export default function SkillsPage() {
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
              Breadth with depth across platform engineering, cloud infrastructure, and AI-driven solutions
            </motion.p>
          </motion.div>

          {/* Skills Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          >
            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl p-6 border border-cyan-500/20">
              <h3 className="text-3xl font-bold text-white mb-2">12</h3>
              <p className="text-neutral-400">Skill Categories</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-2xl p-6 border border-blue-500/20">
              <h3 className="text-3xl font-bold text-white mb-2">100+</h3>
              <p className="text-neutral-400">Technologies & Tools</p>
            </div>
            <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl p-6 border border-indigo-500/20">
              <h3 className="text-3xl font-bold text-white mb-2">7+</h3>
              <p className="text-neutral-400">Years Experience</p>
            </div>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            {skillGroups.map((group, index) => (
              <SkillCategory
                key={group.id}
                group={group}
                index={index}
              />
            ))}
          </div>
        </div>
      </HeroHighlight>
    </section>
  );
}
