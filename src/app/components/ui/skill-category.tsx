"use client";

import { cn } from "@/utils/cn";

export type SkillTier = "expert" | "proficient" | "familiar";

export interface Skill {
  name: string;
  tier: SkillTier;
}

export interface SkillGroup {
  id: string;
  title: string;
  skills: Skill[];
}

interface SkillCategoryProps {
  group: SkillGroup;
  index: number;
}

const tierStyles: Record<SkillTier, { border: string; bg: string; text: string }> = {
  expert: {
    border: "border-cyan-400/40",
    bg: "from-cyan-500/20 to-blue-500/20",
    text: "text-cyan-300",
  },
  proficient: {
    border: "border-blue-400/25",
    bg: "from-blue-500/10 to-indigo-500/10",
    text: "text-blue-300",
  },
  familiar: {
    border: "border-white/10",
    bg: "from-white/5 to-white/5",
    text: "text-neutral-400",
  },
};

export function SkillCategory({ group }: SkillCategoryProps) {
  const { title, skills } = group;

  const expert = skills.filter((s) => s.tier === "expert");
  const proficient = skills.filter((s) => s.tier === "proficient");
  const familiar = skills.filter((s) => s.tier === "familiar");

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-800/50 backdrop-blur-sm transition-all duration-500 hover:border-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-500/10">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/0 via-blue-600/0 to-indigo-600/0 group-hover:from-cyan-600/5 group-hover:via-blue-600/5 group-hover:to-indigo-600/5 transition-all duration-500" />

      <div className="relative z-10 p-6">
        <div className="mb-5">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white group-hover:text-cyan-300 transition-colors">
              {title}
            </h3>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
              <div className="w-5 h-5 bg-gradient-to-br from-cyan-400 to-blue-400 rounded" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {expert.length > 0 && (
            <SkillTierRow label="Expert" skills={expert} tier="expert" />
          )}
          {proficient.length > 0 && (
            <SkillTierRow label="Proficient" skills={proficient} tier="proficient" />
          )}
          {familiar.length > 0 && (
            <SkillTierRow label="Familiar" skills={familiar} tier="familiar" />
          )}
        </div>
      </div>

      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}

function SkillTierRow({ label, skills, tier }: { label: string; skills: Skill[]; tier: SkillTier }) {
  const style = tierStyles[tier];

  return (
    <div>
      <p className={cn("text-[10px] font-semibold uppercase tracking-widest mb-2", style.text)}>
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill.name}
            className={cn(
              "px-3 py-1.5 text-xs font-medium rounded-lg bg-gradient-to-r border transition-all duration-300",
              style.bg,
              style.border,
              style.text,
              "hover:brightness-125"
            )}
          >
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  );
}
