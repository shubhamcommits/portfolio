import { Metadata } from "next";
import ToolsClient from "./tools-client";

export const metadata: Metadata = {
  title: "Free Developer Tools - Markdown to PDF, AI Text Cleaner | No Sign-up",
  description:
    "Free online developer tools: Convert Markdown to beautifully styled PDFs, clean AI-generated text to sound human. No sign-up required. Built by an MTS at Salesforce working across SRE, DevOps, and Platform Engineering.",
  keywords: [
    "markdown to pdf",
    "markdown to pdf converter",
    "md to pdf online",
    "markdown pdf generator",
    "AI text cleaner",
    "remove AI text",
    "humanize AI text",
    "make AI text sound human",
    "ChatGPT text cleaner",
    "free developer tools",
    "online developer tools",
    "developer utilities",
    "SRE tools",
    "DevOps tools",
  ],
};

export default function ToolsPage() {
  return <ToolsClient />;
}
