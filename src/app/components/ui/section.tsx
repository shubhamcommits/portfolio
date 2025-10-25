import React from "react";
import { cn } from "@/utils/cn";

type SectionProps = {
  id?: string;
  title?: string;
  subtitle?: string;
  className?: string;
  children: React.ReactNode;
};

export function Section({ id, title, subtitle, className, children }: SectionProps) {
  return (
    <section id={id} className={cn("w-full py-16 px-6 md:px-10 lg:px-16 bg-black text-white", className)}>
      <div className="max-w-6xl mx-auto">
        {(title || subtitle) && (
          <header className="mb-8">
            {title && <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>}
            {subtitle && <p className="text-neutral-300 mt-2 max-w-3xl">{subtitle}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}

export default Section;


