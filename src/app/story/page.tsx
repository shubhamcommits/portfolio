"use client";

import { motion } from "framer-motion";
import { Navbar } from "../components/ui/navbar";
import { HeroHighlight } from "../components/ui/hero-highlight";
import { cn } from "@/utils/cn";

const journey = [
  {
    year: "2017",
    title: "The Beginning",
    description: "Started my journey in software engineering, diving deep into web technologies and building my first applications.",
    highlight: "First Steps in Tech",
    icon: "🚀",
  },
  {
    year: "2018-2021",
    title: "Entrepreneurial Venture",
    description: "Co-founded Octonius Inc., progressing from Software Engineer to Chief Product Officer. Built scalable platforms serving clients globally.",
    highlight: "From Code to Leadership",
    icon: "💡",
  },
  {
    year: "2020-2022",
    title: "DevOps Evolution",
    description: "Joined Amway India, transitioning from DevOps to DevSecOps Engineer. Reduced production incidents by 400 annually through innovative solutions.",
    highlight: "Mastering Infrastructure",
    icon: "⚙️",
  },
  {
    year: "2022-2024",
    title: "Site Reliability Excellence",
    description: "At Airtel International, managed 200+ microservices across 14 countries. Received Einstein Award for exceptional performance.",
    highlight: "Global Scale Impact",
    icon: "🌍",
  },
  {
    year: "2023-Present",
    title: "Platform Engineering Leadership",
    description: "Joined Legitmark's founding team, advancing from Senior Platform Engineer to Engineering Manager. Architecting AI-driven solutions.",
    highlight: "Building the Future",
    icon: "🔧",
  },
  {
    year: "2024-Present",
    title: "Enterprise Scale",
    description: "Currently at Salesforce, managing 800+ Kubernetes clusters. Pioneering AI-driven incident detection and self-healing infrastructure.",
    highlight: "AI-Powered Operations",
    icon: "🤖",
  },
];

const values = [
  {
    title: "Innovation First",
    description: "Constantly exploring new technologies and methodologies to solve complex problems.",
    icon: "💡",
  },
  {
    title: "Global Impact",
    description: "Building solutions that scale across continents and serve millions of users.",
    icon: "🌐",
  },
  {
    title: "Continuous Learning",
    description: "From MEAN stack to AI/ML operations, always expanding my technical horizons.",
    icon: "📚",
  },
  {
    title: "Leadership & Mentorship",
    description: "Guiding teams, mentoring engineers, and fostering collaborative environments.",
    icon: "👥",
  },
];

export default function StoryPage() {
  return (
    <section id="story" className="relative">
      <Navbar />
      <HeroHighlight containerClassName="items-start">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 lg:pt-36 pb-12 lg:pb-24">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 lg:mb-6"
            >
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                My Journey
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg lg:text-xl text-neutral-400 max-w-3xl mx-auto px-4"
            >
              From a curious engineer to a platform architect, here&apos;s how I&apos;ve evolved through 
              7+ years of solving complex problems and building scalable solutions
            </motion.p>
          </motion.div>

          {/* Journey Timeline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-20"
          >
            <h2 className="text-2xl font-semibold text-white text-center mb-12">Professional Evolution</h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500 hidden md:block" />
              
              <div className="space-y-12">
                {journey.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="relative flex items-start gap-6"
                  >
                    {/* Icon */}
                    <div className="hidden md:flex w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 items-center justify-center text-2xl shadow-lg shadow-cyan-500/50 flex-shrink-0">
                      {item.icon}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 bg-gradient-to-br from-slate-900/90 to-slate-800/50 rounded-2xl p-6 border border-white/10 hover:border-cyan-500/30 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-cyan-400 font-semibold">{item.year}</span>
                        <span className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-300">
                          {item.highlight}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                      <p className="text-neutral-400">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Core Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-20"
          >
            <h2 className="text-2xl font-semibold text-white text-center mb-12">What Drives Me</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-800/50 p-6 hover:border-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/0 via-blue-600/0 to-purple-600/0 group-hover:from-cyan-600/5 group-hover:via-blue-600/5 group-hover:to-purple-600/5 transition-all duration-500" />
                  <div className="relative z-10">
                    <div className="text-3xl mb-4">{value.icon}</div>
                    <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                    <p className="text-sm text-neutral-400">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Personal Touch */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="p-8 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
              <h2 className="text-2xl font-semibold text-white mb-4">Beyond the Code</h2>
              <p className="text-neutral-300 leading-relaxed mb-6">
                I believe in the power of technology to transform lives and businesses. My journey has been 
                about more than just writing code – it&apos;s about building systems that scale, leading teams 
                that innovate, and creating solutions that make a real difference. From managing infrastructure 
                for millions of users to mentoring the next generation of engineers, every experience has 
                shaped my approach to problem-solving and leadership.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <span className="px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-sm">
                  7+ Years Experience
                </span>
                <span className="px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-sm">
                  3 Continents
                </span>
                <span className="px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm">
                  100+ Technologies
                </span>
                <span className="px-4 py-2 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm">
                  Millions Impacted
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </HeroHighlight>
    </section>
  );
}