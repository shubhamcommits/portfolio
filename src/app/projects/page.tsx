import { Metadata } from "next";
import ProjectsClient from "./projects-client";

export const metadata: Metadata = {
    title: "Projects & Case Studies - Platform Engineering | Shubham Singh",
    description:
        "Portfolio of engineering projects: AI-Ops agentic framework for 1,000+ Kubernetes clusters at Salesforce Hyperforce, private-aviation platform (Tangerine / Nuhma NYC), and an LLM-powered recipe tool (Remix). Built with Go, Kubernetes, AWS, Terraform, and modern cloud architecture.",
    keywords: [
        "Platform engineering projects",
        "AI Ops agentic framework",
        "Kubernetes Operators",
        "K8sGPT",
        "AWS architecture case study",
        "Kafka microservices",
        "AI-powered application",
        "Node.js TypeScript projects",
        "Cloud architecture portfolio",
    ],
};

export default function ProjectsPage() {
    return <ProjectsClient />;
}
