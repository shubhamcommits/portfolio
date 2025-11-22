import { Metadata } from "next";
import SkillsClient from "./skills-client";

export const metadata: Metadata = {
    title: "Technical Skills & Expertise | Shubham Singh - SRE & AI Ops",
    description:
        "Explore my technical expertise in Kubernetes, AWS, Platform Engineering, and AI/ML Operations. A comprehensive list of tools and technologies I use to build resilient systems.",
    keywords: [
        "Kubernetes",
        "AWS",
        "Platform Engineering",
        "DevSecOps",
        "SRE",
        "AI Ops",
        "Terraform",
        "Go",
        "Python",
        "React",
        "Next.js",
        "System Architecture",
    ],
};

export default function SkillsPage() {
    return <SkillsClient />;
}
