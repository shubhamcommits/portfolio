"use client";
import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "./ui/lamp";
import { Navbar } from "./ui/navbar";

export function Hero() {
  return (
    <div className="bg-black">
      <section id="hero" className="w-full rounded-md antialiased bg-grid-white/[0.02] relative overflow-hidden">
        <Navbar />
        <LampContainer>
          <motion.h1
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-transparent"
          >
            Shubham Singh
            <span className="block text-xl sm:text-2xl md:text-3xl font-normal mt-4 sm:mt-6 tracking-wide">
              Scaling Platforms
              <span className="hidden sm:inline mx-3">|</span>
              <br className="block sm:hidden" />
              Engineering Intelligence
              <span className="hidden sm:inline mx-3">|</span>
              <br className="block sm:hidden" />
              Building Relations
            </span>
          </motion.h1>
        </LampContainer>
      </section>
    </div>
  );
}