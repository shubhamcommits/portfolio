import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { Footer } from "./components/footer";
import { AnalyticsTracker } from "./components/analytics-tracker";

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ["latin"] });

const title = "Shubham Singh | Infrastructure, SRE, Platform & DevSecOps Engineer | Kubernetes at Scale";
const description =
  "Not your average DevOps engineer. Member of Technical Staff at Salesforce operating across SRE, Platform Engineering, DevSecOps, AI Ops, and Cloud Architecture. Managing 1,000+ Kubernetes clusters at 99.99% uptime across AWS, GCP, and Alibaba Cloud. From kernel-level networking (IPVS, eBPF) to AI-driven fleet operations (K8sGPT). Open to Senior/Lead/Staff roles in Netherlands, UK, Germany, Switzerland, Singapore, Sweden.";
const url = "https://shubhamsinngh.com";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: title,
    template: `%s | Shubham Singh - Infrastructure, SRE & Platform Engineer`,
  },
  description,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  keywords: [
    // Primary identity
    "Shubham Singh",
    "Shubham Singh SRE",
    "Shubham Singh DevOps",
    "Shubham Singh Salesforce",
    "Shubham Singh Platform Engineer",

    // Core roles (what recruiters search)
    "Site Reliability Engineer",
    "Senior SRE",
    "Lead SRE",
    "Staff SRE",
    "Member of Technical Staff",
    "MTS at Salesforce",
    "Platform Engineer",
    "Staff Platform Engineer",
    "DevOps Engineer",
    "Senior DevOps Engineer",
    "Lead DevOps Engineer",
    "DevSecOps Engineer",
    "Infrastructure Engineer",
    "Cloud Engineer",
    "SRE Lead",
    "SRE Manager",

    // Kubernetes & Containers
    "Kubernetes Expert",
    "Kubernetes Engineer",
    "Kubernetes at Scale",
    "Kubernetes Operator Developer",
    "K8s Fleet Management",
    "Container Orchestration",
    "EKS",
    "GKE",
    "Kubernetes Multi-Cloud",
    "Helm",
    "ArgoCD",
    "Istio Service Mesh",

    // Cloud & Infrastructure
    "AWS Infrastructure",
    "GCP Infrastructure",
    "Multi-Cloud Architecture",
    "Terraform",
    "Infrastructure as Code",
    "Cloud Infrastructure Automation",
    "Hybrid Cloud",

    // AI & Automation
    "AI Ops",
    "AIOps Engineer",
    "AI Agents for SRE",
    "Agentic Debugging",
    "Agentic AI Operations",
    "K8sGPT",
    "Self-Healing Infrastructure",
    "AI-Driven Incident Response",
    "Autonomous Remediation",
    "Intelligent Automation",

    // SRE Practices
    "SLO SLI Design",
    "Error Budgets",
    "Incident Response",
    "Chaos Engineering",
    "Reliability Engineering",
    "Toil Reduction",
    "On-Call Optimization",

    // Observability
    "Prometheus",
    "Grafana",
    "Splunk",
    "Observability Engineering",
    "Monitoring at Scale",

    // CI/CD & GitOps
    "CI/CD Pipeline",
    "GitOps",
    "Spinnaker",
    "GitHub Actions",
    "FluxCD",

    // Security
    "DevSecOps",
    "OPA Gatekeeper",
    "HashiCorp Vault",
    "Security Automation",

    // Domain-specific
    "Telecom SRE",
    "Enterprise SRE",
    "FinOps",
    "Cost Optimization",
    "Production Engineering",
  ],
  alternates: {
    canonical: './',
  },
  authors: [{ name: "Shubham Singh", url }],
  creator: "Shubham Singh",
  publisher: "Shubham Singh",
  openGraph: {
    type: "website",
    url,
    title: "Shubham Singh | Infrastructure, SRE, Platform & DevSecOps | 1,000+ K8s Clusters at 99.99% Uptime",
    description: "Member of Technical Staff at Salesforce — Site Reliability & Platform Engineering. Expert in Kubernetes fleet management (1,000+ clusters), AI Ops, DevSecOps, and multi-cloud infrastructure. Published researcher (Nature, IEEE). Open to Senior/Lead/Staff roles in Netherlands, UK, Germany, Switzerland, Singapore, Sweden.",
    siteName: "Shubham Singh - Infrastructure, SRE & Platform Engineer",
    locale: "en_US",
    images: [{
      url: "/og-image.png",
      width: 1200,
      height: 630,
      alt: "Shubham Singh - MTS at Salesforce managing 1,000+ Kubernetes clusters",
    }],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@shubhamsinngh_",
    site: "@shubhamsinngh_",
    title: "Shubham Singh | Infrastructure, SRE, Platform & DevSecOps Engineer",
    description: "Not your average DevOps. Full-stack infra engineer managing 1,000+ K8s clusters at 99.99% uptime. SRE, Platform, DevSecOps, AI Ops, FinOps across AWS, GCP, Alibaba Cloud.",
    images: [{
      url: "/og-image.png",
      alt: "Shubham Singh - MTS, SRE & Platform Engineer at Salesforce",
    }],
  },
  icons: {
    icon: "/favicon.ico",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  category: "technology",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${url}/#person`,
      "name": "Shubham Singh",
      "givenName": "Shubham",
      "familyName": "Singh",
      "url": url,
      "image": `${url}/shubham-singh-portfolio.JPG`,
      "email": "shubham.sinngh@outlook.com",
      "telephone": "+919711778196",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "New Delhi",
        "addressRegion": "DL",
        "addressCountry": "IN"
      },
      "sameAs": [
        "https://github.com/shubhamcommits",
        "https://www.linkedin.com/in/shubham-sinngh/",
        "https://x.com/shubhamsinngh_"
      ],
      "jobTitle": "Member of Technical Staff - DevOps Engineering",
      "worksFor": {
        "@type": "Organization",
        "name": "Salesforce",
        "url": "https://www.salesforce.com"
      },
      "alumniOf": {
        "@type": "CollegeOrUniversity",
        "name": "Netaji Subhas Institute of Technology (NSIT)",
        "url": "http://www.nsut.ac.in"
      },
      "knowsAbout": [
        "Infrastructure Engineering",
        "Site Reliability Engineering",
        "Platform Engineering",
        "DevOps",
        "DevSecOps",
        "Cloud Architecture",
        "Kubernetes",
        "Kubernetes Operators",
        "Kubernetes Fleet Management",
        "AI Ops",
        "Agentic AI",
        "FinOps",
        "Infrastructure Automation",
        "AWS",
        "GCP",
        "Alibaba Cloud",
        "Terraform",
        "Crossplane",
        "ArgoCD",
        "Prometheus",
        "Grafana",
        "Splunk",
        "Incident Response",
        "Chaos Engineering",
        "CI/CD",
        "GitOps",
        "Observability",
        "Self-Healing Infrastructure",
        "Linux Kernel",
        "IPVS",
        "eBPF",
        "CNI Networking",
        "Istio Service Mesh",
        "Go",
        "Python",
        "SLO SLI Design",
        "Capacity Planning",
        "OPA Gatekeeper",
        "HashiCorp Vault"
      ],
      "award": [
        "Einstein Award - Top 1% Engineering (Airtel Africa, 2023)",
        "Reboot the Earth - Country Winner India, United Nations Technology Innovation Labs (2019)",
        "Best of Palo Alto - Software Company, Octonius Inc. (2020)",
        "Inventor of the Month, Progate Japan (2018)",
        "Flame & Ignite Awards x3, Amway India (2020-2021)"
      ],
      "hasOccupation": [
        {
          "@type": "Occupation",
          "name": "Infrastructure Engineer",
          "occupationLocation": [
            { "@type": "Country", "name": "India" },
            { "@type": "Place", "name": "Remote" }
          ],
          "skills": "Linux Kernel, IPVS, eBPF, Networking, Bare-Metal, Hybrid Cloud, Multi-Cloud, Capacity Planning"
        },
        {
          "@type": "Occupation",
          "name": "Site Reliability Engineer",
          "occupationLocation": [
            { "@type": "Country", "name": "India" },
            { "@type": "Place", "name": "Remote" }
          ],
          "skills": "Kubernetes Fleet Management, SLO/SLI, Incident Response, On-Call, Chaos Engineering, Observability, Prometheus, Grafana"
        },
        {
          "@type": "Occupation",
          "name": "Platform Engineer",
          "occupationLocation": [
            { "@type": "Country", "name": "India" },
            { "@type": "Place", "name": "Remote" }
          ],
          "skills": "Kubernetes Operators, GitOps, ArgoCD, Crossplane, Terraform, Developer Experience, Self-Service Platforms"
        },
        {
          "@type": "Occupation",
          "name": "DevSecOps Engineer",
          "occupationLocation": [
            { "@type": "Country", "name": "India" },
            { "@type": "Place", "name": "Remote" }
          ],
          "skills": "CI/CD Pipeline Security, OPA Gatekeeper, HashiCorp Vault, RBAC, Image Scanning, Compliance Automation"
        },
        {
          "@type": "Occupation",
          "name": "AI Ops Engineer",
          "occupationLocation": [
            { "@type": "Country", "name": "India" },
            { "@type": "Place", "name": "Remote" }
          ],
          "skills": "K8sGPT, Agentic AI, Self-Healing Automation, AI-Driven Incident Response, LangChain"
        }
      ],
      "seeks": {
        "@type": "Demand",
        "description": "Senior, Lead, or Staff Site Reliability Engineer / Platform Engineer / DevOps Engineer roles",
        "availableAtOrFrom": [
          { "@type": "Country", "name": "Netherlands" },
          { "@type": "Country", "name": "United Kingdom" },
          { "@type": "Country", "name": "Germany" },
          { "@type": "Country", "name": "Switzerland" },
          { "@type": "Country", "name": "Singapore" },
          { "@type": "Country", "name": "Sweden" }
        ]
      }
    },
    {
      "@type": "WebSite",
      "@id": `${url}/#website`,
      "url": url,
      "name": "Shubham Singh - MTS, SRE & Platform Engineer",
      "description": description,
      "publisher": { "@id": `${url}/#person` },
      "inLanguage": "en-US"
    },
    {
      "@type": "ProfilePage",
      "@id": `${url}/#profilepage`,
      "url": url,
      "name": "Shubham Singh Portfolio",
      "isPartOf": { "@id": `${url}/#website` },
      "about": { "@id": `${url}/#person` },
      "description": description,
      "inLanguage": "en-US"
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#000000" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
      </body>
    </html>
  );
}
