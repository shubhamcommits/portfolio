import { Metadata } from "next";
import SkillsClient from "./skills-client";

export const metadata: Metadata = {
    title: "Technical Skills - Kubernetes, AWS, GCP, Terraform, AI Ops | Shubham Singh",
    description:
        "Comprehensive technical expertise in Kubernetes, AWS, GCP, Terraform, ArgoCD, Prometheus, Grafana, AI Ops, DevSecOps, and 100+ technologies for building resilient infrastructure at scale.",
    keywords: [
        "Kubernetes expert",
        "AWS infrastructure skills",
        "GCP engineer",
        "Terraform specialist",
        "ArgoCD GitOps",
        "Prometheus Grafana",
        "AI Ops skills",
        "DevSecOps tools",
        "SRE technical skills",
        "Platform engineering stack",
        "Istio service mesh",
        "Spinnaker CI/CD",
        "Infrastructure as Code",
    ],
};

export default function SkillsPage() {
    return <SkillsClient />;
}
