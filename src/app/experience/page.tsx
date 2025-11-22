import { Metadata } from "next";
import ExperienceClient from "./experience-client";

export const metadata: Metadata = {
    title: "Professional Experience | Shubham Singh - Salesforce, Airtel, Amway",
    description:
        "My professional journey from Salesforce to startups. Expertise in SRE, DevSecOps, and managing large-scale Kubernetes infrastructure.",
    keywords: [
        "Professional Experience",
        "Resume",
        "Salesforce",
        "Airtel",
        "Amway",
        "SRE",
        "DevSecOps",
        "Kubernetes",
        "Engineering Leadership",
    ],
};

export default function ExperiencePage() {
    return <ExperienceClient />;
}
