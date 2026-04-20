"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { LampContainer } from "./ui/lamp";
import { Navbar } from "./ui/navbar";

export function Hero() {
  return (
    <div className="bg-black">
      <section id="hero" className="w-full rounded-md antialiased bg-grid-white/[0.02] relative overflow-hidden">
        <Navbar />
        <LampContainer>
          <motion.div
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center"
          >
            {/* Headshot */}
            <div className="relative mb-6">
              <div className="absolute -inset-1.5 rounded-full bg-gradient-to-b from-cyan-500/60 to-cyan-500/10 blur-sm" />
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-2 border-cyan-500/20">
                <Image
                  src="/shubham-singh-portfolio.JPG"
                  alt="Shubham Singh - MTS, SRE & Platform Engineer at Salesforce"
                  fill
                  className="object-cover scale-150 object-[center_-50%]"
                  priority
                />
              </div>
            </div>

            <h1 className="bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-transparent">
              Shubham Singh
              <span className="block text-xl sm:text-2xl md:text-3xl font-normal mt-4 sm:mt-6 tracking-wide">
                Infrastructure
                <span className="hidden sm:inline mx-3">|</span>
                <br className="block sm:hidden" />
                SRE &amp; Platform
                <span className="hidden sm:inline mx-3">|</span>
                <br className="block sm:hidden" />
                DevSecOps
              </span>
              <span className="block text-sm sm:text-base font-normal mt-3 tracking-normal text-slate-400">
                Not your average DevOps engineer. I operate across the full infrastructure spectrum.
              </span>
            </h1>
          </motion.div>
        </LampContainer>
      </section>
    </div>
  );
}
