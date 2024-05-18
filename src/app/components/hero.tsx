import React from "react";
import { cn } from "@/utils/cn";
import { Spotlight } from "./ui/spotlight";

export function Hero() {
  return (
    <div className="h-[40rem] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0">
        <h1 className="text-3xl p-2 md:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 mb-4">
          Hi, I&apos;m Shubham Singh <br /> - Engineer. Entrepreneur. Author -
        </h1>
        <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
          I am a versatile and passionate professional with over 7 years of experience in engineering, entrepreneurship, and research. My journey spans core software development, platform engineering, DevOps/DevSecOps, system architecture, and more. I thrive in solving complex problems and driving innovation across diverse industries.
        </p>
      </div>
    </div>
  );
}