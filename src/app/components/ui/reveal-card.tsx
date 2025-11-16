"use client";

import { cn } from "@/utils/cn";
import { useInView } from "framer-motion";
import { type ReactNode, useEffect, useRef, useState } from "react";

type RevealCardProps = {
  children: ReactNode;
  className?: string;
  initialClassName?: string;
  animatedClassName?: string;
  delay?: number; // seconds
  amount?: number; // viewport amount
};

export function RevealCard({
  children,
  className,
  initialClassName = "opacity-0 translate-y-6",
  animatedClassName = "opacity-100 translate-y-0",
  delay = 0,
  amount = 0.35,
}: RevealCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  const animationClasses = hasAnimated ? animatedClassName : initialClassName;

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-500 ease-out will-change-transform will-change-opacity",
        animationClasses,
        className
      )}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}


