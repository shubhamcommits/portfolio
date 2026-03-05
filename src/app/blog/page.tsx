import { Metadata } from "next";
import BlogClient from "./blog-client";

export const metadata: Metadata = {
    title: "SRE & Platform Engineering Blog | Shubham Singh",
    description:
        "Deep dives into Site Reliability Engineering, Kubernetes at scale, AI Ops, agentic debugging, chaos engineering, and platform engineering from an engineer managing 1,000+ clusters.",
    keywords: [
        "SRE blog",
        "Platform Engineering blog",
        "Kubernetes at scale",
        "AI Ops articles",
        "Agentic debugging",
        "Chaos engineering",
        "DevOps insights",
        "Infrastructure automation blog",
        "Site Reliability Engineering articles",
        "K8s fleet management",
    ],
};

export default function BlogPage() {
    return <BlogClient />;
}
