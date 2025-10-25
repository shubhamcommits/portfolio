"use client";
import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/utils/cn";

export type SubRole = {
  title: string;
  period?: string;
  bullets: string[];
};

export type ExperienceItem = {
  id?: string;
  company: string;
  title: string;
  location: string;
  period: string;
  employment?: string;
  summary?: string;
  highlights: string[];
  details?: string[];
  subRoles?: SubRole[];
  milestones?: { after: number; label: string }[];
  tags?: string[];
  logoSrc?: string;
  logoText?: string; // Text-based logo alternative
  impact?: {
    metrics?: string[];
    outcomes?: string[];
  };
  certificates?: {
    title: string;
    file: string;
    type: 'achievement' | 'letter' | 'award';
  }[];
};

type Props = ExperienceItem & {
  defaultExpanded?: boolean;
  className?: string;
  showTimelineDot?: boolean;
  index?: number;
};

export function ExperienceCard(props: Props) {
  const {
    id,
    company,
    title,
    location,
    period,
    employment,
    summary,
    highlights,
    details,
    subRoles,
    milestones,
    tags,
    logoSrc,
    logoText,
    impact,
    certificates,
    defaultExpanded = false,
    className,
    showTimelineDot = false,
    index = 0,
  } = props;

  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div
      id={id}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-800/50 backdrop-blur-sm transition-all duration-500",
        "hover:border-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-500/10",
        className
      )}
    >
      {/* Timeline dot */}
      {showTimelineDot && (
        <div className="absolute -left-8 md:-left-10 top-12 flex items-center justify-center">
          <span className="h-4 w-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/50" />
          <div className="absolute h-4 w-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 animate-ping" />
        </div>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/0 via-blue-600/0 to-purple-600/0 group-hover:from-cyan-600/5 group-hover:via-blue-600/5 group-hover:to-purple-600/5 transition-all duration-500" />
      
      <div className="relative z-10 p-6 sm:p-8 lg:p-12">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
          <div className="mb-4 lg:mb-0">
            <div className="flex items-start gap-4 mb-3">
              {(logoSrc || logoText) && (
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
                  {logoText ? (
                    <div className="relative w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg uppercase">
                        {logoText}
                      </span>
                    </div>
                  ) : (
                    <div className="relative w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center p-2 flex-shrink-0">
                      <Image
                        src={logoSrc || ''}
                        alt={`${company} logo`}
                        width={40}
                        height={40}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  )}
                </div>
              )}
              <div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:via-blue-400 group-hover:to-purple-400 transition-all duration-300">
                  {company}
                </h3>
                <p className="text-base sm:text-lg lg:text-xl text-cyan-400 font-medium mt-1">
                  {title}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-neutral-400">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {location}
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {period}
              </span>
            </div>
            {employment && (
              <p className="text-sm text-purple-400 font-medium mt-2">
                {employment}
              </p>
            )}
          </div>
        </div>

        {/* Summary */}
        {summary && (
          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed mb-8 max-w-4xl">
            {summary}
          </p>
        )}

        {/* Key Highlights */}
        {highlights && highlights.length > 0 && (
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-white mb-4">Key Highlights</h4>
            <ul className="space-y-3">
              {highlights.slice(0, expanded ? highlights.length : 3).map((highlight, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm sm:text-base text-neutral-300">
                    {highlight}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Expanded Content */}
        {expanded && (
          <div>
            {/* Additional Details */}
            {details && details.length > 0 && (
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-white mb-4">Key Achievements & Contributions</h4>
                <ul className="space-y-3">
                  {details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
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
            {impact && (impact.metrics || impact.outcomes) && (
              <div className="mb-8 p-6 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-xl border border-cyan-500/20">
                <h4 className="text-lg font-semibold text-white mb-4">Impact & Results</h4>
                {impact.metrics && impact.metrics.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {impact.metrics.map((metric, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-cyan-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <span className="text-sm text-neutral-300">{metric}</span>
                      </div>
                    ))}
                  </div>
                )}
                {impact.outcomes && impact.outcomes.length > 0 && (
                  <ul className="space-y-2">
                    {impact.outcomes.map((outcome, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-neutral-300">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* Sub-roles */}
            {subRoles && subRoles.length > 0 && (
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-white mb-4">Role Progression</h4>
                <div className="space-y-6">
                  {subRoles.map((role, idx) => (
                    <React.Fragment key={idx}>
                      <div className="relative pl-8 before:absolute before:left-0 before:top-3 before:h-full before:w-px before:bg-gradient-to-b before:from-cyan-500/50 before:to-transparent">
                        <div className="absolute left-0 top-3 w-2 h-2 rounded-full bg-cyan-500" />
                        <div className="pb-6">
                          <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-4">
                            <h5 className="text-xl font-semibold text-cyan-400">{role.title}</h5>
                            {role.period && (
                              <span className="text-sm text-neutral-400">{role.period}</span>
                            )}
                          </div>
                          <ul className="space-y-3">
                            {role.bullets.map((bullet, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-sm sm:text-base text-neutral-300">{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      {milestones?.some((m) => m.after === idx) && (
                        <div className="flex items-center gap-3 my-4">
                          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
                          <span className="px-4 py-2 text-sm font-medium text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
                            {milestones.find((m) => m.after === idx)?.label}
                          </span>
                          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}

            {/* Certificates & Achievements */}
            {certificates && certificates.length > 0 && (
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-white mb-4">Certificates & Achievements</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {certificates.map((cert, i) => {
                    const hasFile = cert.file && cert.file.trim() !== '';
                    return hasFile ? (
                      <a
                        key={i}
                        href={cert.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 hover:from-cyan-500/20 hover:to-blue-500/20 hover:border-cyan-500/30 transition-all duration-300"
                      >
                        <div className="flex-shrink-0">
                          {cert.type === 'achievement' && (
                            <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                          )}
                          {cert.type === 'award' && (
                            <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                          )}
                          {cert.type === 'letter' && (
                            <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white group-hover:text-cyan-300 transition-colors">
                            {cert.title}
                          </p>
                          <p className="text-xs text-neutral-400 mt-1">Click to view</p>
                        </div>
                        <svg className="w-5 h-5 text-neutral-400 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    ) : (
                      <div
                        key={i}
                        className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20"
                      >
                        <div className="flex-shrink-0">
                          {cert.type === 'achievement' && (
                            <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                          )}
                          {cert.type === 'award' && (
                            <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                          )}
                          {cert.type === 'letter' && (
                            <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">
                            {cert.title}
                          </p>
                          <p className="text-xs text-neutral-400 mt-1">Achievement</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tech Stack */}
        {tags && tags.length > 0 && (
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-white mb-4">Technologies & Tools</h4>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, i) => (
                <span 
                  key={i} 
                  className="text-xs sm:text-sm px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 text-cyan-300 font-medium hover:from-cyan-500/20 hover:to-blue-500/20 hover:border-cyan-500/30 transition-all duration-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Expand/Collapse Button */}
        {(highlights.length > 3 || details?.length || subRoles?.length || impact || certificates?.length) && (
          <div className="flex justify-center">
            <button
              onClick={() => setExpanded(!expanded)}
              className="group/btn inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 hover:from-cyan-600/30 hover:to-blue-600/30 text-white font-semibold rounded-full border border-cyan-500/30 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
            >
              <span>{expanded ? "Show Less" : "Show More"}</span>
              <svg 
                className={cn(
                  "w-4 h-4 transition-transform duration-300",
                  expanded ? "rotate-180" : ""
                )}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}

export default ExperienceCard;


