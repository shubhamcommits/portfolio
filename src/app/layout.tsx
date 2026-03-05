import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "./components/footer";

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ["latin"] });

const title = "Shubham Singh | Staff SRE & Platform Engineer | Kubernetes, AI Ops, DevSecOps";
const description =
  "Staff-level Site Reliability & Platform Engineer at Salesforce managing 1,000+ Kubernetes clusters at 99.99% uptime. Expert in SRE, DevOps, DevSecOps, AI-driven operations, infrastructure automation, and multi-cloud architecture across AWS, GCP, and Alibaba Cloud. Open to Staff/Lead SRE roles worldwide.";
const url = "https://shubhamsinngh.com";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: title,
    template: `%s | Shubham Singh - Staff SRE & Platform Engineer`,
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
    "Staff SRE",
    "Lead SRE",
    "Senior SRE",
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
    title: "Shubham Singh | Staff SRE & Platform Engineer | 1,000+ K8s Clusters at 99.99% Uptime",
    description: "Staff-level Site Reliability & Platform Engineer at Salesforce. Expert in Kubernetes fleet management, AI Ops, DevSecOps, and multi-cloud infrastructure automation. Published researcher (Nature, IEEE). Open to Staff/Lead roles worldwide.",
    siteName: "Shubham Singh - SRE Portfolio",
    locale: "en_US",
    images: [{
      url: "/og-image.png",
      width: 1200,
      height: 630,
      alt: "Shubham Singh - Staff SRE & Platform Engineer managing 1,000+ Kubernetes clusters",
    }],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@shubhamsinngh_",
    site: "@shubhamsinngh_",
    title: "Shubham Singh | Staff SRE & Platform Engineer",
    description: "Managing 1,000+ K8s clusters at 99.99% uptime at Salesforce. Expert in AI Ops, DevSecOps, Kubernetes, and multi-cloud infrastructure.",
    images: [{
      url: "/og-image.png",
      alt: "Shubham Singh - Staff SRE & Platform Engineer",
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
      "jobTitle": "Member of Technical Staff (Staff SRE / Platform Reliability)",
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
        "Site Reliability Engineering",
        "Platform Engineering",
        "Kubernetes",
        "Kubernetes Operators",
        "DevOps",
        "DevSecOps",
        "AI Ops",
        "Agentic AI",
        "Infrastructure Automation",
        "Cloud Architecture",
        "AWS",
        "GCP",
        "Terraform",
        "ArgoCD",
        "Prometheus",
        "Grafana",
        "Incident Response",
        "Chaos Engineering",
        "CI/CD",
        "GitOps",
        "Observability",
        "Self-Healing Infrastructure"
      ],
      "award": [
        "Einstein Award - Top 1% Engineering (Airtel International, 2023)",
        "Best of Palo Alto - Software Engineer (2024)",
        "United Nations Recognition for Digital Solutions (2020)",
        "TechGig Code Gladiators Winner (2019)",
        "Amway Star Performer (2021)"
      ],
      "hasOccupation": [
        {
          "@type": "Occupation",
          "name": "Site Reliability Engineer",
          "occupationLocation": { "@type": "Country", "name": "India" },
          "skills": "Kubernetes, AWS, GCP, Terraform, AI Ops, Prometheus, Grafana, ArgoCD, Incident Response, SLO Design"
        },
        {
          "@type": "Occupation",
          "name": "Platform Engineer",
          "occupationLocation": { "@type": "Country", "name": "India" },
          "skills": "Infrastructure as Code, CI/CD, GitOps, Cloud Architecture, Container Orchestration"
        }
      ]
    },
    {
      "@type": "WebSite",
      "@id": `${url}/#website`,
      "url": url,
      "name": "Shubham Singh - Staff SRE & Platform Engineer",
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
      </body>
    </html>
  );
}
