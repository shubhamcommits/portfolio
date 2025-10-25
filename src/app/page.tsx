"use client";
import { Hero } from "../app/components/hero";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div>
      <Hero />
      
      {/* Executive Summary Section */}
      <section className="relative bg-black -mt-32 md:-mt-40 pb-20 md:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative">
              {/* Decorative element */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-2xl blur-xl" />
              
              <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/50 border border-white/20 rounded-2xl p-8 md:p-12">
                <h2 className="text-cyan-400 text-sm font-semibold uppercase tracking-wider mb-6 text-center">
                  What I Bring to the Table
                </h2>
                <p className="text-lg md:text-xl text-neutral-300 leading-relaxed text-center mb-8">
                  I architect <span className="text-white font-semibold">resilient infrastructure at enterprise scale</span> while 
                  maintaining the velocity and innovation mindset of a startup founder. My approach: eliminate toil through 
                  intelligent automation, build platforms that empower teams rather than constrain them, and leverage 
                  smart solutions to anticipate failures before they impact users. <span className="text-white font-semibold">I don&apos;t just maintain 
                  systems—I transform them into competitive advantages.</span>
                </p>
                
                {/* Key metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 pt-8 border-t border-white/10">
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                      800+
                    </div>
                    <div className="text-sm text-neutral-400">K8s Clusters Managed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                      99.99%
                    </div>
                    <div className="text-sm text-neutral-400">Uptime Achieved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                      70%
                    </div>
                    <div className="text-sm text-neutral-400">Cost Reduction</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
