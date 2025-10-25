"use client";

import { useState } from "react";
import { cn } from "@/utils/cn";

interface SkillGroup {
  id: string;
  title: string;
  skills: string[];
}

interface SkillCategoryProps {
  group: SkillGroup;
  index: number;
}

export function SkillCategory({ group, index }: SkillCategoryProps) {
  const { title, skills } = group;
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Show first 6 skills by default, rest on expand
  const visibleSkills = isExpanded ? skills : skills.slice(0, 6);
  const hasMore = skills.length > 6;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-800/50 backdrop-blur-sm transition-all duration-500 hover:border-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-500/10">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/0 via-blue-600/0 to-indigo-600/0 group-hover:from-cyan-600/5 group-hover:via-blue-600/5 group-hover:to-indigo-600/5 transition-all duration-500" />
      
      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-white group-hover:text-cyan-300 transition-colors">
                {title}
              </h3>
              <p className="text-sm text-neutral-400">{skills.length} technologies</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
              <div className="w-5 h-5 bg-gradient-to-br from-cyan-400 to-blue-400 rounded" />
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          {visibleSkills.map((skill, i) => (
            <span
              key={i}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 text-cyan-300 hover:from-cyan-500/20 hover:to-blue-500/20 hover:border-cyan-500/30 transition-all duration-300"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Show More/Less Button */}
        {hasMore && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-4 text-xs text-cyan-400 hover:text-cyan-300 transition-colors duration-200 flex items-center gap-1 font-medium"
          >
            {isExpanded ? (
              <>
                <span>Show less</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </>
            ) : (
              <>
                <span>View all {skills.length} skills</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </>
            )}
          </button>
        )}
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}

