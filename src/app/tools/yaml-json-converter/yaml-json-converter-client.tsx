"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Navbar } from "../../components/ui/navbar";
import Link from "next/link";
import yaml from "js-yaml";

type Direction = "yaml-to-json" | "json-to-yaml";

interface ConvertResult {
  output: string;
  valid: boolean;
  error: string | null;
}

const SAMPLE_YAML = `# Kubernetes Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
  namespace: production
  labels:
    app: web-app
    tier: frontend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web-app
  template:
    metadata:
      labels:
        app: web-app
    spec:
      containers:
        - name: web-app
          image: nginx:1.25-alpine
          ports:
            - containerPort: 80
          resources:
            limits:
              cpu: "500m"
              memory: "128Mi"
            requests:
              cpu: "250m"
              memory: "64Mi"
          livenessProbe:
            httpGet:
              path: /healthz
              port: 80
            initialDelaySeconds: 10
            periodSeconds: 5
`;

const SAMPLE_JSON = `{
  "apiVersion": "apps/v1",
  "kind": "Deployment",
  "metadata": {
    "name": "web-app",
    "namespace": "production",
    "labels": {
      "app": "web-app",
      "tier": "frontend"
    }
  },
  "spec": {
    "replicas": 3,
    "selector": {
      "matchLabels": {
        "app": "web-app"
      }
    }
  }
}`;

function convert(input: string, direction: Direction): ConvertResult {
  if (!input.trim()) {
    return { output: "", valid: true, error: null };
  }

  try {
    if (direction === "yaml-to-json") {
      const parsed = yaml.load(input);
      return {
        output: JSON.stringify(parsed, null, 2),
        valid: true,
        error: null,
      };
    } else {
      const parsed = JSON.parse(input);
      return {
        output: yaml.dump(parsed, {
          indent: 2,
          lineWidth: -1,
          noRefs: true,
          sortKeys: false,
        }),
        valid: true,
        error: null,
      };
    }
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Invalid input";
    return { output: "", valid: false, error: msg };
  }
}

export default function YamlJsonConverterClient() {
  const [direction, setDirection] = useState<Direction>("yaml-to-json");
  const [input, setInput] = useState(SAMPLE_YAML);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => convert(input, direction), [input, direction]);

  const handleSwap = () => {
    if (result.output) {
      setInput(result.output);
    }
    setDirection(direction === "yaml-to-json" ? "json-to-yaml" : "yaml-to-json");
  };

  const handleDirectionChange = (d: Direction) => {
    setDirection(d);
    setInput(d === "yaml-to-json" ? SAMPLE_YAML : SAMPLE_JSON);
  };

  const handleCopy = async () => {
    if (!result.output) return;
    await navigator.clipboard.writeText(result.output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handlePaste = async () => {
    const text = await navigator.clipboard.readText();
    setInput(text);
  };

  const inputLabel = direction === "yaml-to-json" ? "YAML" : "JSON";
  const outputLabel = direction === "yaml-to-json" ? "JSON" : "YAML";
  const inputFile = direction === "yaml-to-json" ? "input.yaml" : "input.json";
  const outputFile = direction === "yaml-to-json" ? "output.json" : "output.yaml";

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
              <h1 className="text-xl sm:text-2xl font-bold text-white">YAML &harr; JSON Converter</h1>
              <p className="text-xs text-neutral-400 mt-1">
                Convert between YAML and JSON. Works with K8s manifests, Docker Compose, CI configs, and more.
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap flex-shrink-0">
              <div className="inline-flex rounded-lg border border-white/10 overflow-hidden">
                <button
                  onClick={() => handleDirectionChange("yaml-to-json")}
                  className={`px-3 py-1.5 text-xs font-medium transition-all ${direction === "yaml-to-json" ? "bg-cyan-500/20 text-cyan-300" : "text-neutral-500 hover:text-white"}`}
                >
                  YAML &rarr; JSON
                </button>
                <button
                  onClick={() => handleDirectionChange("json-to-yaml")}
                  className={`px-3 py-1.5 text-xs font-medium transition-all ${direction === "json-to-yaml" ? "bg-cyan-500/20 text-cyan-300" : "text-neutral-500 hover:text-white"}`}
                >
                  JSON &rarr; YAML
                </button>
              </div>
              <button
                onClick={handleSwap}
                disabled={!result.output}
                className="px-3 py-1.5 text-xs font-medium rounded-lg border border-white/10 text-neutral-400 hover:text-white hover:border-white/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>
                Swap
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
                <span className="text-xs text-neutral-500">{inputFile}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-500">{inputLabel}</span>
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
              placeholder={`Paste your ${inputLabel} here...`}
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
                    Invalid {inputLabel}
                  </span>
                ) : input.trim() ? (
                  <span className="flex items-center gap-1.5 text-xs text-green-400">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Valid
                  </span>
                ) : (
                  <span className="text-xs text-neutral-500">{outputFile}</span>
                )}
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-500">{outputLabel}</span>
              </div>
              <button
                onClick={handleCopy}
                disabled={!result.output}
                className="text-[10px] text-cyan-400 hover:text-cyan-300 transition-colors disabled:text-neutral-600 disabled:cursor-not-allowed"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>

            {result.error ? (
              <div className="p-5 flex-1 min-h-0">
                <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-4">
                  <p className="text-sm text-red-400 font-mono break-all">{result.error}</p>
                </div>
              </div>
            ) : (
              <pre className="w-full flex-1 min-h-0 text-neutral-200 text-sm font-mono p-5 overflow-auto leading-relaxed">
                {result.output || <span className="text-neutral-600">Converted output will appear here...</span>}
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
