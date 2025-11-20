import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "./components/footer";

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ["latin"] });

const title = "Shubham Singh | Engineering Leader in SRE, DevSecOps & AI";
const description =
  "Shubham Singh is a seasoned Engineering Leader (SRE & DevSecOps). With a robust background in architecting and managing scalable, secure, and reliable infrastructure, he excels in driving technological innovation and operational excellence. Shubham's expertise spans across cloud-native technologies, DevOps practices, and site reliability engineering, making him a pivotal asset in building and sustaining high-performing tech environments.";
const url = "https://shubhamsinngh.com";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: title,
    template: `%s | Shubham Singh - SRE & AI Ops`,
  },
  description,
  keywords: [
    "Shubham Singh",
    "Member of Technical Staff",
    "Site Reliability Engineering",
    "Platform Engineering",
    "DevSecOps",
    "AI Ops",
    "ML Ops",
    "AI/ML Ops",
    "System Architect",
    "Software Engineer",
    "Full Stack Developer",
    "SRE Leader",
    "Kubernetes Expert",
    "Kubernetes Operators",
    "GitOps Automation",
    "800+ Kubernetes Clusters",
    "Hybrid Cloud",
    "AWS",
    "Amazon Web Services",
    "Google Cloud Platform",
    "GCP",
    "Alibaba Cloud",
    "Multi-cloud Architecture",
    "Terraform",
    "Terraform Modules",
    "Spinnaker",
    "ArgoCD",
    "FluxCD",
    "Rancher",
    "Jenkins",
    "GitOps",
    "Grafana",
    "Prometheus",
    "Splunk",
    "Observability Engineering",
    "Incident Response Automation",
    "Self-healing Infrastructure",
    "Cost Optimization",
    "FinOps",
    "CI/CD Automation",
    "Resilience Engineering",
    "AI Agentic Framework",
    "Warden AI Ops",
    "Customer Engagement Framework",
    "ACUTE Platform",
    "Einstein Award",
    "Reboot the Earth Winner",
    "United Nations Youth Climate Summit",
    "Nature Scientific Reports Author",
    "IEEE Conference Speaker",
    "Salesforce",
    "Airtel",
    "Legitmark",
    "Amway",
    "Octonius",
    "Portfolio",
  ],
  alternates: {
    canonical: './',
  },
  authors: [{ name: "Shubham Singh", url }],
  creator: "Shubham Singh",
  openGraph: {
    type: "website",
    url,
    title,
    description,
    siteName: title,
    images: [{
      url: "/og-image.png",
      width: 1200,
      height: 630,
      alt: description,
    }],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@shubhamsinngh_",
    title,
    description,
    images: [{
      url: "/og-image.png",
      alt: description,
    }],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Shubham Singh",
  "url": url,
  "email": "shubham.sinngh@outlook.com",
  "sameAs": [
    "https://github.com/shubhamcommits",
    "https://www.linkedin.com/in/shubham-sinngh/",
    "https://twitter.com/shubhamsinngh_"
  ],
  "jobTitle": "Member of Technical Staff | Site Reliability & AI Ops",
  "worksFor": {
    "@type": "Organization",
    "name": "Salesforce"
  },
  "alumniOf": [
    {
      "@type": "Organization",
      "name": "Netaji Subhas Institute of Technology"
    }
  ],
  "knowsAbout": [
    "Platform Engineering",
    "DevOps",
    "Site Reliability Engineering",
    "Kubernetes",
    "Kubernetes Operators",
    "Cloud Infrastructure",
    "Multi-cloud Architecture",
    "AI/ML Operations",
    "DevSecOps",
    "Terraform",
    "Spinnaker",
    "ArgoCD",
    "FluxCD",
    "Grafana",
    "Prometheus",
    "Splunk",
    "GitOps",
    "Observability Engineering",
    "Incident Response Automation",
    "Self-healing Infrastructure",
    "Cost Optimization",
    "AI Agentic Frameworks",
    "System Architecture"
  ],
  "description": description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
