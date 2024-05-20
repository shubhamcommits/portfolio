"use client";
import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "./ui/lamp";
 
// Words array
const words = `I am a versatile and passionate professional with over 7 years of experience in engineering, entrepreneurship, and research. My journey spans core software development, platform engineering, DevOps/DevSecOps, system architecture, and more. I thrive in solving complex problems and driving innovation across diverse industries.`;

export function Hero() {
  return (
    <div className="w-full rounded-md flex md:items-center md:justify-center antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-3xl font-medium tracking-tight text-transparent md:text-6xl"
        >
           Hi, I&apos;m Shubham Singh <br /> - Engineer. Entrepreneur. Author -
        </motion.h1>
      </LampContainer>
      {/* <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
          I am a versatile and passionate professional with over 7 years of experience in engineering, entrepreneurship, and research. My journey spans core software development, platform engineering, DevOps/DevSecOps, system architecture, and more. I thrive in solving complex problems and driving innovation across diverse industries.
        </p> */}
    </div>
  );
}