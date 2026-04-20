"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Navbar } from "../../components/ui/navbar";
import { marked } from "marked";
import Link from "next/link";

declare global {
  interface Window {
    html2pdf?: {
      (): {
        set: (options: Record<string, unknown>) => { from: (el: HTMLElement) => { save: () => Promise<void> } };
      };
    };
  }
}

const SAMPLE_MD = `# Project Report

## Overview

This is a sample **Markdown** document to demonstrate the converter. Edit this text or paste your own markdown.

### Features

- **Bold**, *italic*, and \`inline code\`
- Ordered and unordered lists
- Code blocks with syntax highlighting
- Tables, blockquotes, and more

## Code Example

\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet("World");
\`\`\`

## Table

| Feature | Status |
|---------|--------|
| Live Preview | Done |
| PDF Export | Done |
| Dark Mode | Done |

> "The best tool is the one you actually use." - Someone wise

---

Built with [shubhamsinngh.com/tools](https://shubhamsinngh.com/tools)
`;

export default function MarkdownToPdfClient() {
  const [markdown, setMarkdown] = useState(SAMPLE_MD);
  const [html, setHtml] = useState("");
  const [mounted, setMounted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined" && !window.html2pdf) {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.2/html2pdf.bundle.min.js";
      script.async = true;
      script.onload = () => setScriptLoaded(true);
      script.onerror = () => console.error("Failed to load html2pdf.js");
      document.head.appendChild(script);
    } else if (window.html2pdf) {
      setScriptLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      const result = marked.parse(markdown, { breaks: true, gfm: true, async: false });
      if (typeof result === "string") {
        setHtml(result);
      }
    } catch (err) {
      console.error("Markdown parse error:", err);
    }
  }, [markdown, mounted]);

  const getHtml = useCallback(() => {
    return html;
  }, [html]);

  const handleExportPdf = async () => {
    if (!previewRef.current) return;
    setIsGenerating(true);

    try {
      if (window.html2pdf) {
        await window.html2pdf()
          .set({
            margin: [12, 16, 12, 16],
            filename: "document.pdf",
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
          })
          .from(previewRef.current)
          .save();
      } else {
        throw new Error("html2pdf not loaded");
      }
    } catch (err) {
      console.error("PDF generation failed:", err);
      // Fallback to browser print
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(`
          <html><head><title>Document</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 800px; margin: 0 auto; padding: 40px; color: #1a1a1a; line-height: 1.7; }
            h1, h2, h3 { margin-top: 1.5em; } code { background: #f4f4f4; padding: 2px 6px; border-radius: 4px; font-size: 0.9em; }
            pre { background: #f8f8f8; padding: 16px; border-radius: 8px; overflow-x: auto; }
            table { border-collapse: collapse; width: 100%; } th, td { border: 1px solid #ddd; padding: 8px 12px; text-align: left; }
            blockquote { border-left: 4px solid #ddd; margin: 0; padding-left: 16px; color: #555; }
          </style></head><body>${getHtml()}</body></html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="relative h-screen bg-black flex flex-col overflow-hidden">
      <Navbar className="top-2" />
      <div className="flex-1 flex flex-col max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-4 min-h-0">
        {/* Header */}
        <div className="flex-shrink-0 mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <Link href="/tools" className="text-xs text-neutral-500 hover:text-cyan-400 transition-colors mb-1 inline-flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                All Tools
              </Link>
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                Markdown to PDF
              </h1>
              <p className="text-xs text-neutral-400 mt-1">
                Write or paste markdown on the left, preview on the right, export to PDF.
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={() => setMarkdown("")}
                className="px-3 py-1.5 text-xs font-medium rounded-lg border border-white/10 text-neutral-400 hover:text-white hover:border-white/20 transition-all"
              >
                Clear
              </button>
              <button
                onClick={handleExportPdf}
                disabled={isGenerating || !markdown.trim() || !scriptLoaded}
                className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-lg hover:shadow-cyan-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <div className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" /></svg>
                    Export PDF
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Editor + Preview */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-0 min-h-0">
          {/* Editor */}
          <div className="relative rounded-xl lg:rounded-r-none border border-white/10 bg-slate-900/80 overflow-hidden flex flex-col min-h-0">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10 bg-white/5 flex-shrink-0">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <span className="text-xs text-neutral-500 ml-2">editor.md</span>
            </div>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="w-full flex-1 min-h-0 bg-transparent text-neutral-200 text-sm font-mono p-5 resize-none focus:outline-none placeholder-neutral-600 leading-relaxed"
              placeholder="Type or paste your markdown here..."
              spellCheck={false}
            />
          </div>

          {/* Preview */}
          <div className="relative rounded-xl lg:rounded-l-none border border-white/10 lg:border-l-0 bg-white overflow-hidden flex flex-col min-h-0">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-neutral-200 bg-neutral-50 flex-shrink-0">
              <span className="text-xs text-neutral-500">Preview</span>
            </div>
            <div
              ref={previewRef}
              className="p-6 sm:p-8 flex-1 min-h-0 overflow-y-auto"
            >
              {!html ? (
                <p className="text-neutral-400 text-sm">Loading preview...</p>
              ) : (
                <div 
                  className="prose prose-sm sm:prose-base max-w-none prose-headings:text-neutral-900 prose-p:text-neutral-700 prose-a:text-blue-600 prose-strong:text-neutral-900 prose-code:text-pink-600 prose-code:bg-neutral-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-pre:bg-neutral-900 prose-pre:text-neutral-100 prose-blockquote:border-neutral-300 prose-th:bg-neutral-100 prose-td:border-neutral-200 prose-th:border-neutral-200"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              )}
            </div>
          </div>
        </div>

        <p className="flex-shrink-0 text-center text-[10px] text-neutral-600 mt-3">
          Everything runs in your browser. Your content never leaves your machine.
        </p>
      </div>
    </section>
  );
}
