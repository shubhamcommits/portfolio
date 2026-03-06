export const siteConfig = {
  name: "Shubham Singh",
  title: "Shubham Singh | Platform Engineering & DevOps Leader",
  description: "Platform Engineering & DevOps Leader at Salesforce. Building scalable cloud infrastructure, Kubernetes platforms, and AI-driven operations.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://shubhamsinngh.com",
  ogImage: "/og-image.png",
  author: {
    name: "Shubham Singh",
    email: "shubham.sinngh@outlook.com",
    twitter: "@shubhamsinngh_",
    github: "shubhamcommits",
    linkedin: "shubham-sinngh",
  },
  keywords: [
    "Platform Engineering",
    "DevOps",
    "Kubernetes",
    "Cloud Architecture",
    "SRE",
    "Salesforce",
    "AI Ops",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
