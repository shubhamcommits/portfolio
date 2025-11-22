import { Metadata } from "next";
import BlogClient from "./blog-client";

export const metadata: Metadata = {
    title: "Engineering Blog | Shubham Singh",
    description:
        "Insights on Platform Engineering, SRE, Kubernetes, and AI Ops. Read deep dives from an Engineering Leader managing 800+ clusters.",
    keywords: [
        "Engineering Blog",
        "SRE Blog",
        "Platform Engineering",
        "Kubernetes",
        "AI Ops",
        "DevOps Articles",
        "Shubham Singh Blog",
    ],
};

export default function BlogPage() {
    return <BlogClient />;
}
