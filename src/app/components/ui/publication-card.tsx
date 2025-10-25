"use client";

import { cn } from "@/utils/cn";

interface Publication {
  id: string;
  title: string;
  journal: string;
  year: string;
  description: string;
  impactFactor?: string;
  link: string;
  type: "journal" | "conference" | "research";
  tags: string[];
}

interface PublicationCardProps {
  publication: Publication;
  index: number;
  className?: string;
}

export function PublicationCard({ publication, index, className }: PublicationCardProps) {
  const { title, journal, year, description, impactFactor, link, type, tags } = publication;

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-800/50 backdrop-blur-sm transition-all duration-500",
        "hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/10",
        className
      )}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 via-pink-600/0 to-indigo-600/0 group-hover:from-purple-600/5 group-hover:via-pink-600/5 group-hover:to-indigo-600/5 transition-all duration-500" />
      
      <div className="relative z-10 p-8 lg:p-12">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              {/* Publication Type Icon */}
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
                <div className="relative w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg flex items-center justify-center">
                  {type === "journal" && (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  )}
                  {type === "conference" && (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  )}
                  {type === "research" && (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  )}
                </div>
              </div>

              {/* Title and Year */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white group-hover:text-purple-300 transition-colors line-clamp-2">
                  {title}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-purple-400 font-medium">{year}</span>
                  {impactFactor && (
                    <>
                      <span className="text-neutral-500">•</span>
                      <span className="text-sm text-pink-400 font-medium">Impact Factor: {impactFactor}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Journal/Conference Name */}
            <p className="text-neutral-300 mb-4 font-medium">{journal}</p>

            {/* Description */}
            <p className="text-neutral-400 leading-relaxed mb-6">{description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-300 border border-purple-500/20"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* View Publication Link */}
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 text-white font-medium hover:from-purple-600 hover:to-pink-700 transition-all duration-300 group/btn"
            >
              View Publication
              <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          {/* Decorative Element */}
          <div className="absolute top-8 right-8 w-32 h-32 opacity-5">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <pattern id={`pattern-${index}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1.5" fill="currentColor" className="text-purple-400" />
              </pattern>
              <rect x="0" y="0" width="100" height="100" fill={`url(#pattern-${index})`} />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
