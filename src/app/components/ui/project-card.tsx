"use client";
import React from "react";
import { cn } from "@/utils/cn";

export type ProjectCardProps = {
  name: string;
  company?: string;
  year?: string;
  link?: string | null;
  linkType?: "live" | "github" | "private";
  blurb?: string;
  stack?: string; // comma separated
  details?: string[];
  impact?: string;
  role?: string;
  className?: string;
  index?: number;
};

export function ProjectCard({ name, company, year, link, linkType = "live", blurb, stack, details, impact, role, className, index = 0 }: ProjectCardProps) {
  const tags = (stack ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-800/50 backdrop-blur-sm transition-all duration-500",
        "hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/10",
        className
      )}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/0 via-purple-600/0 to-pink-600/0 group-hover:from-indigo-600/5 group-hover:via-purple-600/5 group-hover:to-pink-600/5 transition-all duration-500" />
      
      <div className="relative z-10 p-6 sm:p-8 lg:p-12">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
          <div className="mb-4 lg:mb-0">
            <div className="mb-2">
              <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:via-purple-400 group-hover:to-pink-400 transition-all duration-300">
                {name}
              </h3>
              {company && (
                <p className="text-base sm:text-lg lg:text-xl text-neutral-400 mt-1">
                  {company}
                </p>
              )}
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              {role && (
                <p className="text-sm text-purple-400 font-medium">
                  {role}
                </p>
              )}
              {year && (
                <span className="px-3 py-1 text-sm font-medium text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
                  {year}
                </span>
              )}
            </div>
          </div>
          
          {linkType === "private" ? (
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold rounded-full">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Internal Project</span>
            </div>
          ) : link && (
            <a
              href={link}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/50 hover:scale-105 group/btn"
            >
              {linkType === "github" ? (
                <>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span>View on GitHub</span>
                </>
              ) : (
                <>
                  <span>View Demo</span>
                  <svg 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300"
                  >
                    <path d="M7 17L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 7H17V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </>
              )}
            </a>
          )}
        </div>

        {/* Description */}
        {blurb && (
          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed mb-8 max-w-4xl">
            {blurb}
          </p>
        )}

        {/* Key Achievements */}
        {details && details.length > 0 && (
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-white mb-4">Key Achievements</h4>
            <ul className="space-y-3">
              {details.map((detail, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm sm:text-base text-neutral-300">
                    {detail}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Impact Section */}
        {impact && (
          <div className="mb-8 p-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl border border-indigo-500/20">
            <h4 className="text-lg font-semibold text-white mb-2">Impact</h4>
            <p className="text-sm sm:text-base text-neutral-300">
              {impact}
            </p>
          </div>
        )}

        {/* Tech Stack */}
        {tags.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Technologies Used</h4>
            <div className="flex flex-wrap gap-2">
              {tags.map((t, i) => (
                <span 
                  key={i} 
                  className="text-xs sm:text-sm px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-neutral-300 font-medium hover:bg-white/10 hover:border-indigo-500/30 transition-all duration-200"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}

export default ProjectCard;


