"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Navbar } from "../../components/ui/navbar";
import Link from "next/link";

interface CleanResult {
  cleaned: string;
  changes: { original: string; replacement: string; count: number }[];
  totalChanges: number;
  score: { before: number; after: number };
}

// Patterns that scream "AI wrote this"
const AI_PATTERNS: [RegExp, string, string][] = [
  // Filler openers
  [/\bIn today['']s (?:fast-paced|ever-evolving|rapidly changing|digital) (?:world|landscape|era|age),?\s*/gi, "", "Filler opener"],
  [/\bIn the realm of\b/gi, "In", "Filler opener"],
  [/\bIt['']s worth noting that\s*/gi, "", "Filler phrase"],
  [/\bIt is important to note that\s*/gi, "", "Filler phrase"],
  [/\bIt['']s important to (?:remember|understand|note) that\s*/gi, "", "Filler phrase"],
  [/\bAs we (?:delve|dive) (?:into|deeper into)\b/gi, "Looking at", "AI phrasing"],
  [/\bLet['']s (?:delve|dive) (?:into|deeper into)\b/gi, "Let's look at", "AI phrasing"],

  // Overused verbs
  [/\bdelve(?:s|d)?\b/gi, "explore", "Overused AI verb"],
  [/\bleverage(?:s|d)?\b/gi, "use", "Overused AI verb"],
  [/\butilize(?:s|d)?\b/gi, "use", "Overused AI verb"],
  [/\bfacilitat(?:e|es|ed|ing)\b/gi, "enable", "Overused AI verb"],
  [/\bspearhead(?:s|ed|ing)?\b/gi, "lead", "Overused AI verb"],
  [/\bpivot(?:al)?\b/gi, "key", "Overused AI word"],
  [/\bsynerg(?:y|ies|ize|istic)\b/gi, "collaboration", "Corporate AI jargon"],
  [/\bholistic(?:ally)?\b/gi, "comprehensive", "Overused AI word"],
  [/\bseamless(?:ly)?\b/gi, "smooth", "Overused AI word"],
  [/\brobust\b/gi, "strong", "Overused AI word"],

  // Filler adverbs
  [/\bfundamentally\b/gi, "", "Filler adverb"],
  [/\bultimately\b/gi, "", "Filler adverb"],
  [/\bessentially\b/gi, "", "Filler adverb"],
  [/\binherently\b/gi, "", "Filler adverb"],
  [/\bsignificantly\b/gi, "notably", "Filler adverb"],

  // Bloated phrases
  [/\bin order to\b/gi, "to", "Bloated phrase"],
  [/\bdue to the fact that\b/gi, "because", "Bloated phrase"],
  [/\bat the end of the day\b/gi, "ultimately", "Cliche"],
  [/\ba wide (?:range|variety|array) of\b/gi, "many", "Bloated phrase"],
  [/\bplays a (?:crucial|vital|pivotal|key) role\b/gi, "matters", "AI cliche"],
  [/\bgame[-\s]?changer\b/gi, "breakthrough", "AI cliche"],
  [/\btake(?:s)? it to the next level\b/gi, "improve it", "Cliche"],
  [/\bthe landscape of\b/gi, "", "AI filler"],
  [/\bnavigat(?:e|es|ed|ing) the (?:complexities|landscape|world) of\b/gi, "working with", "AI phrasing"],
  [/\btap(?:s|ped|ping)? into\b/gi, "use", "AI phrasing"],
  [/\bunlock(?:s|ed|ing)? the (?:full )?potential of\b/gi, "improve", "AI phrasing"],
  [/\bfoster(?:s|ed|ing)? a (?:culture|environment|sense) of\b/gi, "building", "AI phrasing"],

  // Hyperbolic qualifiers
  [/\bgroundbreaking\b/gi, "notable", "AI hyperbole"],
  [/\btrailblazing\b/gi, "innovative", "AI hyperbole"],
  [/\bcutting-edge\b/gi, "modern", "AI hyperbole"],
  [/\bstate-of-the-art\b/gi, "modern", "AI hyperbole"],
  [/\bworld-class\b/gi, "excellent", "AI hyperbole"],
  [/\bunparalleled\b/gi, "strong", "AI hyperbole"],
  [/\brevolutioniz(?:e|es|ed|ing)\b/gi, "transform", "AI hyperbole"],

  // Conclusion patterns
  [/\bIn conclusion,?\s*/gi, "", "AI conclusion opener"],
  [/\bTo (?:sum up|summarize|wrap up),?\s*/gi, "", "AI conclusion opener"],
  [/\bAll in all,?\s*/gi, "", "AI conclusion opener"],
];

function cleanText(input: string): CleanResult {
  let text = input;
  const changes: CleanResult["changes"] = [];

  for (const [pattern, replacement, category] of AI_PATTERNS) {
    const matches = text.match(pattern);
    if (matches && matches.length > 0) {
      changes.push({
        original: matches[0],
        replacement: replacement || "(removed)",
        count: matches.length,
      });
      text = text.replace(pattern, replacement);
    }
  }

  // Clean up double spaces and leading spaces on lines
  text = text.replace(/  +/g, " ");
  text = text.replace(/^ +/gm, "");
  text = text.replace(/\n{3,}/g, "\n\n");

  // Capitalize first letter after removals left a lowercase start
  text = text.replace(/^([a-z])/gm, (_, c) => c.toUpperCase());

  const totalChanges = changes.reduce((sum, c) => sum + c.count, 0);

  // Simple AI score based on pattern density
  const wordCount = input.split(/\s+/).length;
  const beforeScore = Math.min(100, Math.round((totalChanges / Math.max(wordCount, 1)) * 500));
  const afterScore = Math.max(0, Math.round(beforeScore * 0.1));

  return {
    cleaned: text.trim(),
    changes,
    totalChanges,
    score: { before: beforeScore, after: afterScore },
  };
}

const SAMPLE_TEXT = `In today's rapidly changing landscape, it's worth noting that leveraging cutting-edge AI technologies can fundamentally revolutionize the way organizations navigate the complexities of modern software development. By utilizing a holistic approach and fostering a culture of innovation, teams can seamlessly unlock the full potential of their robust infrastructure. This groundbreaking methodology plays a pivotal role in spearheading digital transformation, ultimately taking productivity to the next level. In conclusion, the synergy between AI-driven automation and state-of-the-art DevOps practices is truly a game-changer for the industry.`;

export default function AiTextCleanerClient() {
  const [input, setInput] = useState(SAMPLE_TEXT);
  const [showDiff, setShowDiff] = useState(false);

  const result = useMemo(() => cleanText(input), [input]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.cleaned);
  };

  return (
    <section data-track-section="tool_ai_text_cleaner" className="relative h-screen bg-black flex flex-col overflow-hidden">
      <Navbar className="top-2" />

      <div className="flex-1 flex flex-col max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-4 min-h-0">
        {/* Header */}
        <div className="flex-shrink-0 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/tools" className="text-xs text-neutral-500 hover:text-cyan-400 transition-colors mb-1 inline-flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                All Tools
              </Link>
              <h1 className="text-xl sm:text-2xl font-bold text-white">AI Text Cleaner</h1>
            </div>
            {result.totalChanges > 0 && (
              <div className="hidden sm:flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                  <span className="text-xs text-neutral-500">AI Score</span>
                  <span className="text-sm font-bold text-red-400">{result.score.before}%</span>
                  <svg className="w-3 h-3 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  <span className="text-sm font-bold text-green-400">{result.score.after}%</span>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                  <span className="text-sm font-bold text-white">{result.totalChanges}</span>
                  <span className="text-xs text-neutral-500 ml-1.5">fixes</span>
                </div>
              </div>
            )}
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Paste AI-generated text below. Strips overused phrases, filler words, and robotic patterns.
          </p>
        </div>

        {/* Main editor area */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0">
          {/* Input */}
          <div className="flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-2 flex-shrink-0">
              <label className="text-sm font-medium text-neutral-300">Input</label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-500">{input.split(/\s+/).filter(Boolean).length} words</span>
                <button
                  onClick={() => setInput("")}
                  className="px-2 py-1 text-[10px] font-medium rounded border border-white/10 text-neutral-500 hover:text-white hover:border-white/20 transition-all"
                >
                  Clear
                </button>
                <button
                  onClick={() => setInput(SAMPLE_TEXT)}
                  className="px-2 py-1 text-[10px] font-medium rounded border border-white/10 text-neutral-500 hover:text-white hover:border-white/20 transition-all"
                >
                  Example
                </button>
              </div>
            </div>
            <div className="relative flex-1 rounded-xl border border-white/10 bg-slate-900/80 overflow-hidden min-h-0">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-full bg-transparent text-neutral-200 text-sm p-4 resize-none focus:outline-none placeholder-neutral-600 leading-relaxed"
                placeholder="Paste your AI-generated text here..."
              />
            </div>
          </div>

          {/* Output */}
          <div className="flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-2 flex-shrink-0">
              <label className="text-sm font-medium text-neutral-300">Cleaned Output</label>
              <div className="flex items-center gap-3">
                {result.totalChanges > 0 && (
                  <button
                    onClick={() => setShowDiff(!showDiff)}
                    className="text-[10px] text-neutral-500 hover:text-neutral-300 transition-colors"
                  >
                    {showDiff ? "Hide" : "Show"} diff ({result.changes.length})
                  </button>
                )}
                <button
                  onClick={handleCopy}
                  className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1"
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  Copy
                </button>
              </div>
            </div>
            <div className="relative flex-1 rounded-xl border border-white/10 bg-slate-900/80 overflow-hidden min-h-0">
              {showDiff && result.totalChanges > 0 ? (
                <div className="w-full h-full overflow-y-auto p-4">
                  <div className="divide-y divide-white/5">
                    {result.changes.map((change, i) => (
                      <div key={i} className="flex items-center gap-3 py-2 text-xs">
                        <span className="text-red-400/80 line-through flex-1 truncate">{change.original}</span>
                        <svg className="w-3 h-3 text-neutral-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                        <span className="text-green-400/80 flex-1 truncate">{change.replacement}</span>
                        {change.count > 1 && (
                          <span className="text-neutral-600 flex-shrink-0">&times;{change.count}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="w-full h-full text-neutral-200 text-sm p-4 overflow-y-auto leading-relaxed whitespace-pre-wrap">
                  {result.cleaned || <span className="text-neutral-600">Cleaned text will appear here...</span>}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile stats bar */}
        {result.totalChanges > 0 && (
          <div className="flex-shrink-0 flex sm:hidden items-center justify-center gap-4 mt-3 text-xs">
            <span className="text-neutral-500">AI Score: <span className="text-red-400 font-bold">{result.score.before}%</span> → <span className="text-green-400 font-bold">{result.score.after}%</span></span>
            <span className="text-neutral-700">|</span>
            <span className="text-white font-bold">{result.totalChanges}</span><span className="text-neutral-500"> fixes</span>
          </div>
        )}

        <p className="flex-shrink-0 text-center text-[10px] text-neutral-600 mt-3">
          Everything runs in your browser. Your manifests never leave your machine.
        </p>
      </div>
    </section>
  );
}
