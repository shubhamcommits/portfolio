"use client";

import { motion } from "framer-motion";
import { Navbar } from "../components/ui/navbar";
import { HeroHighlight } from "../components/ui/hero-highlight";
import { RevealCard } from "../components/ui/reveal-card";

interface Award {
    title: string;
    organization: string;
    year: string;
    description: string;
    icon: string;
    link?: string;
}

const awards: Award[] = [
    {
        title: "Einstein Award (Top 1% Engineering)",
        organization: "Airtel Africa",
        year: "2023",
        description: "Awarded to the top 1% of engineering talent for exceptional performance. Recognized for building the e-SIM & KYC 2.0 platforms and optimizing cloud infrastructure across 14 countries.",
        icon: "🏆",
    },
    {
        title: "Reboot the Earth — Country Winner (India)",
        organization: "United Nations Technology Innovation Labs",
        year: "2019",
        description: "First prize among Indian teams in the UN-organized global climate hackathon. Represented India at the United Nations for Project ViSTARa — empowering women in rural areas through climate education.",
        icon: "🇺🇳",
    },
    {
        title: "Best of Palo Alto — Software Company",
        organization: "Octonius Inc.",
        year: "2020",
        description: "Company recognition in the Software Company category while leading product as Chief Product Officer. Also recognized as TOP REMOTE WORK TECH by CIO Reviews.",
        icon: "🌟",
    },
    {
        title: "Inventor of the Month",
        organization: "Progate (Japan)",
        year: "2018",
        description: "Featured by Progate — a Japanese educational technology company — for contributions to the MorCVD web application, a database of host-pathogen interactions for cardiovascular diseases.",
        icon: "💡",
    },
    {
        title: "Flame & Ignite Awards (×3)",
        organization: "Amway India",
        year: "2020 – 2021",
        description: "Three-time recipient of Amway India's Flame & Ignite performance awards for outstanding contributions to CI/CD pipeline optimization, order-journey automation, and the ACUTE incident-reduction platform.",
        icon: "⭐",
    },
];

export default function AwardsClient() {
    return (
        <section id="awards" data-track-section="awards_root" className="relative">
            <Navbar className="top-2" />
            <HeroHighlight containerClassName="items-start">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-36 pb-12 lg:pb-24">
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
                            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                                Honors & Awards
                            </span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-base sm:text-lg lg:text-xl text-neutral-400 max-w-2xl mx-auto px-4"
                        >
                            Recognition for technical excellence, innovation, and impact in the software engineering community
                        </motion.p>
                    </motion.div>

                    {/* Awards Grid */}
                    <div data-track-section="awards_grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {awards.map((award, index) => (
                            <RevealCard
                                key={award.title}
                                delay={index * 0.1}
                                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-800/50 p-6 hover:border-yellow-500/30 hover:shadow-xl hover:shadow-yellow-500/10 transition-all duration-300"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/0 via-orange-600/0 to-red-600/0 group-hover:from-yellow-600/5 group-hover:via-orange-600/5 group-hover:to-red-600/5 transition-all duration-500" />
                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="text-4xl">{award.icon}</div>
                                        <span className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-neutral-300">
                                            {award.year}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                                        {award.title}
                                    </h3>
                                    <p className="text-sm font-medium text-neutral-400 mb-4">
                                        {award.organization}
                                    </p>
                                    <p className="text-sm text-neutral-400 leading-relaxed">
                                        {award.description}
                                    </p>
                                </div>
                            </RevealCard>
                        ))}
                    </div>

                    {/* Achievement Stats */}
                    <motion.div
                        data-track-section="awards_stats"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
                    >
                        {[
                            { label: "International Recognitions", value: "2" },
                            { label: "Company Performance Awards", value: "4" },
                            { label: "Peer-Reviewed Publications", value: "2" },
                            { label: "Years of Experience", value: "6+" },
                        ].map((stat, index) => (
                            <div
                                key={stat.label}
                                className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
                            >
                                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                                <div className="text-sm text-neutral-400">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </HeroHighlight>
        </section>
    );
}
