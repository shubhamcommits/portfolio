import { Metadata } from "next";
import MarkdownToPdfClient from "./markdown-to-pdf-client";

export const metadata: Metadata = {
  title: "Markdown to PDF Converter - Free Online Tool | No Sign-up Required",
  description:
    "Convert Markdown (.md) files to beautifully styled PDFs instantly. Live preview, GitHub-flavored markdown, syntax highlighting, and multiple themes. Free, no sign-up, runs in your browser.",
  keywords: [
    "markdown to pdf",
    "md to pdf",
    "markdown to pdf converter",
    "markdown to pdf online",
    "convert markdown to pdf",
    "markdown pdf generator",
    "github markdown to pdf",
    "markdown export pdf",
    "free markdown to pdf",
    "markdown renderer",
    "markdown preview",
  ],
};

export default function MarkdownToPdfPage() {
  return <MarkdownToPdfClient />;
}
