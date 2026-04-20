"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Navbar } from "../../components/ui/navbar";
import Link from "next/link";

type IndentSize = 2 | 4;

interface FormatResult {
  output: string;
  valid: boolean;
  error: string | null;
  stats: { keys: number; depth: number; size: string };
}

function getDepth(obj: unknown, current: number = 0): number {
  if (obj === null || typeof obj !== "object") return current;
  const children = Object.values(obj as Record<string, unknown>).map((v) =>
    getDepth(v, current + 1)
  );
  return children.length > 0 ? Math.max(...children) : current;
}

function countKeys(obj: unknown): number {
  if (obj === null || typeof obj !== "object") return 0;
  const entries = Object.entries(obj as Record<string, unknown>);
  return entries.reduce((sum, [, v]) => sum + 1 + countKeys(v), 0);
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatJson(input: string, indent: IndentSize, sortKeys: boolean): FormatResult {
  if (!input.trim()) {
    return { output: "", valid: true, error: null, stats: { keys: 0, depth: 0, size: "0 B" } };
  }

  try {
    let parsed = JSON.parse(input);

    if (sortKeys) {
      parsed = sortObjectKeys(parsed);
    }

    const output = JSON.stringify(parsed, null, indent);
    return {
      output,
      valid: true,
      error: null,
      stats: {
        keys: countKeys(parsed),
        depth: getDepth(parsed),
        size: formatBytes(new Blob([output]).size),
      },
    };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Invalid JSON";
    // Try to extract position info
    const posMatch = msg.match(/position (\d+)/);
    let hint = msg;
    if (posMatch) {
      const pos = parseInt(posMatch[1]);
      const line = input.substring(0, pos).split("\n").length;
      hint = `${msg} (around line ${line})`;
    }
    return {
      output: "",
      valid: false,
      error: hint,
      stats: { keys: 0, depth: 0, size: formatBytes(new Blob([input]).size) },
    };
  }
}

function sortObjectKeys(obj: unknown): unknown {
  if (Array.isArray(obj)) return obj.map(sortObjectKeys);
  if (obj !== null && typeof obj === "object") {
    return Object.keys(obj as Record<string, unknown>)
      .sort()
      .reduce((acc, key) => {
        acc[key] = sortObjectKeys((obj as Record<string, unknown>)[key]);
        return acc;
      }, {} as Record<string, unknown>);
  }
  return obj;
}

function minifyJson(input: string): string {
  try {
    return JSON.stringify(JSON.parse(input));
  } catch {
    return input;
  }
}

const SAMPLE_JSON = `{
  "name": "shubham-singh",
  "role": "Member of Technical Staff",
  "company": "Salesforce",
  "clusters": 1000,
  "uptime": "99.99%",
  "skills": ["Kubernetes", "Terraform", "AI Ops", "ArgoCD"],
  "experience": {
    "years": 6,
    "companies": [
      { "name": "Salesforce", "role": "MTS" },
      { "name": "Airtel", "role": "SRE II" },
      { "name": "Amway", "role": "DevSecOps" }
    ]
  },
  "open_to_relocation": true
}`;

export default function JsonFormatterClient() {
  const [input, setInput] = useState(SAMPLE_JSON);
  const [indent, setIndent] = useState<IndentSize>(2);
  const [sortKeys, setSortKeys] = useState(false);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => formatJson(input, indent, sortKeys), [input, indent, sortKeys]);

  const handleCopy = async () => {
    if (!result.output) return;
    await navigator.clipboard.writeText(result.output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleMinify = () => {
    setInput(minifyJson(input));
  };

  const handlePaste = async () => {
    const text = await navigator.clipboard.readText();
    setInput(text);
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
              <h1 className="text-xl sm:text-2xl font-bold text-white">JSON Formatter & Validator</h1>
              <p className="text-xs text-neutral-400 mt-1">
                Paste JSON on the left, get formatted output on the right. Validates as you type.
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap flex-shrink-0">
              <div className="inline-flex rounded-lg border border-white/10 overflow-hidden">
                {([2, 4] as IndentSize[]).map((n) => (
                  <button
                    key={n}
                    onClick={() => setIndent(n)}
                    className={`px-3 py-1.5 text-xs font-medium transition-all ${indent === n ? "bg-cyan-500/20 text-cyan-300" : "text-neutral-500 hover:text-white"}`}
                  >
                    {n} spaces
                  </button>
                ))}
              </div>
              <button
                onClick={() => setSortKeys(!sortKeys)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${sortKeys ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-300" : "border-white/10 text-neutral-500 hover:text-white"}`}
              >
                Sort Keys
              </button>
              <button
                onClick={handleMinify}
                className="px-3 py-1.5 text-xs font-medium rounded-lg border border-white/10 text-neutral-400 hover:text-white hover:border-white/20 transition-all"
              >
                Minify
              </button>
              <button
                onClick={() => setInput("")}
                className="px-3 py-1.5 text-xs font-medium rounded-lg border border-white/10 text-neutral-400 hover:text-white hover:border-white/20 transition-all"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Editor + Output */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-0 min-h-0">
          {/* Input */}
          <div className="relative rounded-xl lg:rounded-r-none border border-white/10 bg-slate-900/80 overflow-hidden flex flex-col min-h-0">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-white/5 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <span className="text-xs text-neutral-500">input.json</span>
              </div>
              <button
                onClick={handlePaste}
                className="text-[10px] text-neutral-500 hover:text-cyan-400 transition-colors"
              >
                Paste from clipboard
              </button>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full flex-1 min-h-0 bg-transparent text-neutral-200 text-sm font-mono p-5 resize-none focus:outline-none placeholder-neutral-600 leading-relaxed"
              placeholder='{"paste": "your json here"}'
              spellCheck={false}
            />
          </div>

          {/* Output */}
          <div className={`relative rounded-xl lg:rounded-l-none border lg:border-l-0 overflow-hidden flex flex-col min-h-0 ${result.valid ? "border-white/10" : "border-red-500/30"} bg-slate-900/80`}>
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-white/5 flex-shrink-0">
              <div className="flex items-center gap-3">
                {result.error ? (
                  <span className="flex items-center gap-1.5 text-xs text-red-400">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Invalid JSON
                  </span>
                ) : input.trim() ? (
                  <span className="flex items-center gap-1.5 text-xs text-green-400">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Valid JSON
                  </span>
                ) : (
                  <span className="text-xs text-neutral-500">output.json</span>
                )}
                {input.trim() && result.valid && (
                  <span className="text-[10px] text-neutral-600">{result.stats.keys} keys &middot; depth {result.stats.depth} &middot; {result.stats.size}</span>
                )}
              </div>
              <button
                onClick={handleCopy}
                disabled={!result.output}
                className="text-[10px] text-cyan-400 hover:text-cyan-300 transition-colors disabled:text-neutral-600 disabled:cursor-not-allowed inline-flex items-center gap-1"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>

            {result.error ? (
              <div className="p-5 flex-1 min-h-0">
                <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-4">
                  <p className="text-sm text-red-400 font-mono">{result.error}</p>
                </div>
              </div>
            ) : (
              <pre className="w-full flex-1 min-h-0 text-neutral-200 text-sm font-mono p-5 overflow-auto leading-relaxed">
                {result.output || <span className="text-neutral-600">Formatted JSON will appear here...</span>}
              </pre>
            )}
          </div>
        </div>

        <p className="flex-shrink-0 text-center text-[10px] text-neutral-600 mt-3">
          Everything runs in your browser. Your data never leaves your machine.
        </p>
      </div>
    </section>
  );
}
