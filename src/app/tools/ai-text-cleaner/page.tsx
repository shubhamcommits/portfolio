import { Metadata } from "next";
import AiTextCleanerClient from "./ai-text-cleaner-client";

export const metadata: Metadata = {
  title: "AI Text Cleaner - Remove AI Patterns from Writing | Free Online Tool",
  description:
    "Free tool to clean AI-generated text. Removes overused ChatGPT phrases, filler words, and robotic patterns to make your writing sound human. No sign-up, runs in your browser.",
  keywords: [
    "AI text cleaner",
    "remove AI text",
    "humanize AI text",
    "clean ChatGPT text",
    "make AI text human",
    "AI writing detector bypass",
    "remove AI patterns",
    "AI text fixer",
    "ChatGPT rewriter",
    "AI content cleaner",
    "remove filler words",
    "clean AI writing",
    "humanize ChatGPT",
    "AI detection remover",
  ],
};

export default function AiTextCleanerPage() {
  return <AiTextCleanerClient />;
}
