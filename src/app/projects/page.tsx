import { Metadata } from "next";
import ProjectsClient from "./projects-client";

export const metadata: Metadata = {
    title: "Projects & Case Studies | Shubham Singh - Platform Engineering",
    description:
        "Discover my portfolio of projects including Tangerine Platform, Remix Recipe, and blockchain solutions. Real-world examples of scalable architecture and AI integration.",
    keywords: [
        "Software Projects",
        "Case Studies",
        "Platform Engineering",
        "React",
        "Node.js",
        "AWS",
        "Blockchain",
        "AI Integration",
        "Full Stack Development",
    ],
};

export default function ProjectsPage() {
    return <ProjectsClient />;
}
