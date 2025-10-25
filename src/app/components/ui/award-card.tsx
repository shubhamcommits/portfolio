"use client";

import { cn } from "@/utils/cn";

interface Award {
  id: string;
  title: string;
  organization: string;
  year: string;
  location?: string;
  description: string;
  impact?: string[];
  details?: string[];
  type: "award" | "recognition" | "achievement" | "representation";
  tags: string[];
}

interface AwardCardProps {
  award: Award;
  index: number;
  className?: string;
}

export function AwardCard({ award, index, className }: AwardCardProps) {
  const { title, organization, year, location, description, impact, details, type, tags } = award;

  const getTypeIcon = () => {
    switch (type) {
      case "award":
        return (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        );
      case "recognition":
        return (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        );
      case "achievement":
        return (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case "representation":
        return (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case "award":
        return "from-amber-500 to-orange-600";
      case "recognition":
        return "from-rose-500 to-pink-600";
      case "achievement":
        return "from-orange-500 to-red-600";
      case "representation":
        return "from-amber-500 to-rose-600";
    }
  };

  const getTypeLabel = () => {
    switch (type) {
      case "award":
        return "Award";
      case "recognition":
        return "Recognition";
      case "achievement":
        return "Achievement";
      case "representation":
        return "Representation";
    }
  };

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-800/50 backdrop-blur-sm transition-all duration-500",
        "hover:border-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/10",
        className
      )}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-600/0 via-orange-600/0 to-rose-600/0 group-hover:from-amber-600/5 group-hover:via-orange-600/5 group-hover:to-rose-600/5 transition-all duration-500" />
      
      <div className="relative z-10 p-8 lg:p-12">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              {/* Award Type Icon */}
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
                <div className={cn("relative w-12 h-12 rounded-lg bg-gradient-to-br shadow-lg flex items-center justify-center", getTypeColor())}>
                  {getTypeIcon()}
                </div>
              </div>

              {/* Title and Year */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white group-hover:text-amber-300 transition-colors line-clamp-2">
                  {title}
                </h3>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className="text-sm text-amber-400 font-medium">{year}</span>
                  <span className="text-neutral-500">•</span>
                  <span className="text-sm text-orange-400 font-medium">{getTypeLabel()}</span>
                </div>
              </div>
            </div>

            {/* Organization */}
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <p className="text-neutral-300 font-medium">{organization}</p>
            </div>

            {/* Location */}
            {location && (
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-neutral-400 text-sm">{location}</p>
              </div>
            )}

            {/* Description */}
            <p className="text-neutral-400 leading-relaxed mb-6">{description}</p>

            {/* Impact */}
            {impact && impact.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Impact & Achievements
                </h4>
                <ul className="space-y-2">
                  {impact.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-neutral-400 text-sm">
                      <svg className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Details */}
            {details && details.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Key Details
                </h4>
                <ul className="space-y-2">
                  {details.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-neutral-400 text-sm">
                      <svg className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-amber-300 border border-amber-500/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Decorative Element */}
          <div className="absolute top-8 right-8 w-32 h-32 opacity-5">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <pattern id={`pattern-award-${index}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1.5" fill="currentColor" className="text-amber-400" />
              </pattern>
              <rect x="0" y="0" width="100" height="100" fill={`url(#pattern-award-${index})`} />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

