export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    tags: string[];
    content: string;
    image?: string;
}

export const blogPosts: BlogPost[] = [
    {
        slug: "future-of-platform-engineering-ai-ops",
        title: "The Future of Platform Engineering: AI-Driven Operations",
        excerpt: "How AI agents are transforming traditional SRE roles from reactive firefighting to proactive system evolution.",
        date: "2026-02-15",
        readTime: "5 min read",
        tags: ["Platform Engineering", "AI Ops", "SRE", "Agentic AI"],
        content: `
      ## The Shift to AI Ops

      Platform engineering is undergoing a paradigm shift. The traditional model of building internal developer platforms (IDPs) is being augmented by AI agents that can predict, diagnose, and resolve incidents before they impact customers.

      ### From Dashboards to Decisions

      We are moving away from "looking at dashboards" to "reviewing AI decisions". At Salesforce, we've implemented agents that don't just alert us to high CPU usage, but investigate the root cause—whether it's a memory leak, a noisy neighbor, or a legitimate traffic spike—and suggest or even execute remediation.

      ### The Role of the SRE

      Does this mean SREs are obsolete? Far from it. The SRE role is evolving into "AI Systems Architect". We are now responsible for:
      1. Designing the guardrails for AI agents.
      2. Ensuring the observability data fed into models is clean and accurate.
      3. Handling the complex "unknown unknowns" that AI cannot yet predict.

      The future is autonomous, but human-directed.
    `
    },
    {
        slug: "scaling-kubernetes-1000-clusters",
        title: "Lessons Learned Managing 1,000+ Kubernetes Clusters",
        excerpt: "Key strategies for multi-cloud fleet management, cost optimization, and security at enterprise scale.",
        date: "2026-01-28",
        readTime: "8 min read",
        tags: ["Kubernetes", "Scaling", "Cloud Architecture", "Fleet Management"],
        content: `
      ## Managing Fleet Scale

      Running a handful of clusters is easy. Running 1,000+ across AWS, GCP, and Alibaba Cloud is a different beast entirely. Here are the core principles that keep our ship afloat.

      ### 1. GitOps is Non-Negotiable

      We use ArgoCD and Flux to ensure that the state of our clusters is always declarative. Drift detection is automated. If someone manually changes a config, it's reverted instantly.

      ### 2. Standardization over Customization

      Every cluster starts with a "Base Profile" that includes:
      - Security hardening (OPA Gatekeeper)
      - Observability agents (Prometheus/Grafana/Splunk)
      - Ingress controllers

      Customization is allowed only on top of this immutable base.

      ### 3. Cost Visibility

      When you run at this scale, a 10% inefficiency costs millions. We implemented FinOps practices directly into the engineering workflow, giving teams visibility into their pod costs in real-time.
    `
    },
    {
        slug: "building-resilient-systems",
        title: "Chaos Engineering: Building Resilient Systems at Scale",
        excerpt: "Why breaking your own systems in production is the only way to guarantee reliability at enterprise scale.",
        date: "2025-12-10",
        readTime: "6 min read",
        tags: ["Chaos Engineering", "Resilience", "SRE", "Kubernetes"],
        content: `
      ## Embrace the Failure

      Hope is not a strategy. Systems will fail. The only question is whether they fail when you are watching, or at 3 AM on a Sunday.

      ### Controlled Explosions

      We regularly inject failure into our systems:
      - Killing random pods
      - Introducing network latency
      - Simulating region failures

      ### The Result

      This practice forces us to build systems that degrade gracefully. Instead of a hard crash, users might experience slightly slower load times or a read-only mode. This is the difference between a minor annoyance and a major outage.
    `
    }
];
