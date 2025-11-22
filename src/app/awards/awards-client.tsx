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
        title: "Einstein Award",
        organization: "Airtel International",
        year: "2023",
        description: "Awarded for exceptional problem-solving skills and innovative contributions to the platform engineering team. Recognized for optimizing cloud infrastructure and reducing operational costs.",
        icon: "🏆",
    },
    {
        title: "Best of Palo Alto - Software Engineer",
        organization: "Palo Alto Award Program",
        year: "2024",
        description: "Selected for the 2024 Best of Palo Alto Award in the Software Engineer category. This recognition honors achievements and positive contributions to the local community and economy.",
        icon: "🌟",
    },
    {
        title: "United Nations Recognition",
        organization: "United Nations",
        year: "2020",
        description: "Recognized for contributions to digital solutions supporting sustainable development goals. Developed open-source tools for community empowerment.",
        icon: "🇺🇳",
    },
    {
        title: "Hackathon Winner",
        organization: "TechGig Code Gladiators",
        year: "2019",
        description: "Secured top position among 200+ teams in a national level hackathon. Built an AI-driven solution for predictive maintenance in manufacturing.",
        icon: "🥇",
    },
    {
        title: "Star Performer",
        organization: "Amway India",
        year: "2021",
        description: "Consistently rated as top performer for delivering critical projects ahead of schedule and with zero defects. Mentored junior developers and established best practices.",
        icon: "⭐",
    },
];

export default function AwardsClient() {
    return (
        <section id="awards" className="relative">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
                    >
                        {[
                            { label: "International Awards", value: "3+" },
                            { label: "Hackathons Won", value: "5+" },
                            { label: "Recognitions", value: "10+" },
                            { label: "Years of Excellence", value: "7+" },
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
