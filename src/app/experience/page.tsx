import { Metadata } from "next";
import ExperienceClient from "./experience-client";

export const metadata: Metadata = {
    title: "Professional Experience - SRE at Salesforce, Airtel, Amway | Shubham Singh",
    description:
        "6+ years of Site Reliability Engineering, DevOps, and Platform Engineering experience. Currently managing 1,000+ Kubernetes clusters at Salesforce with 99.99% uptime. Previously SRE at Airtel (14 countries, 200+ microservices) and DevSecOps at Amway.",
    keywords: [
        "Site Reliability Engineer experience",
        "Salesforce SRE",
        "Kubernetes fleet management",
        "DevOps career",
        "Platform Engineer resume",
        "SRE at scale",
        "Airtel SRE",
        "DevSecOps engineer",
        "Infrastructure automation career",
        "AI Ops experience",
    ],
};

export default function ExperiencePage() {
    return <ExperienceClient />;
}
