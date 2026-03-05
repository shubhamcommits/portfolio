import { Metadata } from "next";
import ProjectsClient from "./projects-client";

export const metadata: Metadata = {
    title: "Projects & Case Studies - Platform Engineering | Shubham Singh",
    description:
        "Portfolio of engineering projects: luxury aviation platform (Tangerine/Nuhma NYC), AI-powered recipe platform (Remix), and blockchain supply chain (CoffeeTrace). Built with TypeScript, AWS, Kafka, and modern cloud architecture.",
    keywords: [
        "Platform engineering projects",
        "Full stack projects",
        "AWS architecture case study",
        "Kafka microservices",
        "Blockchain supply chain",
        "AI-powered application",
        "Node.js TypeScript projects",
        "Cloud architecture portfolio",
    ],
};

export default function ProjectsPage() {
    return <ProjectsClient />;
}
