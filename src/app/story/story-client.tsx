"use client";

import { motion } from "framer-motion";
import { Navbar } from "../components/ui/navbar";
import { HeroHighlight } from "../components/ui/hero-highlight";
import { cn } from "@/utils/cn";
import { RevealCard } from "../components/ui/reveal-card";

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

export default function StoryClient() {
    return (
        <section id="story" className="relative">
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

                            <div className="space-y-8 md:space-y-12">
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

                    {/* Operating Philosophy */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1 }}
                        className="mb-20"
                    >
                        <h2 className="text-2xl font-semibold text-white text-center mb-12">Operating Philosophy</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                            {[
                                {
                                    number: "01",
                                    title: "Automate to Oblivion",
                                    description: "Human intervention is a bug, not a feature. Every repetitive task is an opportunity to build a system that scales infinitely.",
                                    color: "from-cyan-500 to-blue-500",
                                },
                                {
                                    number: "02",
                                    title: "Platforms Over Prisons",
                                    description: "Build infrastructure that empowers developers, not restricts them. The best platform is invisible until you need it.",
                                    color: "from-blue-500 to-indigo-500",
                                },
                                {
                                    number: "03",
                                    title: "Fail Forward, Fail Fast",
                                    description: "Design for failure, not perfection. Resilient systems anticipate problems and recover automatically-chaos engineering is production engineering.",
                                    color: "from-indigo-500 to-purple-500",
                                },
                                {
                                    number: "04",
                                    title: "Metrics Without Action Are Vanity",
                                    description: "Observability isn&apos;t about collecting data-it&apos;s about actionable insights. Every alert must have a runbook; every dashboard must drive decisions.",
                                    color: "from-purple-500 to-pink-500",
                                },
                                {
                                    number: "05",
                                    title: "Build With the End in Mind",
                                    description: "Think like a product manager, architect like an engineer, execute like a founder. The best infrastructure enables business outcomes, not just technical excellence.",
                                    color: "from-pink-500 to-rose-500",
                                },
                                {
                                    number: "06",
                                    title: "Lead by Multiplying, Not Adding",
                                    description: "Great leadership amplifies teams. Write code that teaches, build tools that enable, and mentor people who will surpass you.",
                                    color: "from-rose-500 to-orange-500",
                                },
                            ].map((principle, index) => (
                                <RevealCard
                                    key={principle.title}
                                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-800/50 p-6 hover:border-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/0 via-blue-600/0 to-purple-600/0 group-hover:from-cyan-600/5 group-hover:via-blue-600/5 group-hover:to-purple-600/5 transition-all duration-500" />
                                    <div className="relative z-10">
                                        <div className={`inline-block px-3 py-1 rounded-lg bg-gradient-to-r ${principle.color} text-white text-xs font-bold mb-3`}>
                                            {principle.number}
                                        </div>
                                        <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                                            {principle.title}
                                        </h3>
                                        <p className="text-sm text-neutral-400 leading-relaxed">
                                            {principle.description}
                                        </p>
                                    </div>
                                </RevealCard>
                            ))}
                        </div>
                    </motion.div>

                    {/* Testimonials */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.6 }}
                        className="mb-20"
                    >
                        <h2 className="text-2xl font-semibold text-white text-center mb-4">What Colleagues Say</h2>
                        <p className="text-neutral-400 text-center max-w-2xl mx-auto mb-12">
                            Real LinkedIn recommendations from engineers, mentees, and teammates who&apos;ve worked directly with me on complex technical projects.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                            {[
                                {
                                    quote: "I have worked with Shubham on a highly complex technical implementation at Octonius Inc. Although I did not join the team from the beginning, he helped me understand the core functionality of the project really quickly and that is thanks to his professionalism, social skills and willingness to cooperate. Shubham was highly regarded by the team and his expertise and knowledge, alongside his long practical experience, helped drive the project in the right direction.",
                                    author: "Adrian Anghel",
                                    role: "Senior Software Engineer, Octonius Inc.",
                                    highlight: "Technical Leadership",
                                },
                                {
                                    quote: "As a supervisor, Shubham was incredibly communicative and helpful. Whenever I had any issues or questions, he would always be more than happy to help me out and walk through all the steps without any hesitation. He is a great teacher and I found it very easy to learn from him and retain all the information. He is extremely passionate and hardworking about the work he is doing. He has a vast knowledge in developing applications and using multiple different Javascript frameworks.",
                                    author: "Charishma Thota",
                                    role: "Solutions Architect at BigPanda",
                                    highlight: "Teaching & Communication",
                                },
                                {
                                    quote: "While working for Octonius, Shubham was my mentor. His knowledge in Software Engineering and system design is incredible. Our product truly has the capability to scale to a large user base. As a leader, he cares about the growth of others. His kindness and patience help me grow from an intern who knows a little about Node.js to someone who can write full-stack code within 3 months. He has the motivation to constantly push and improve himself.",
                                    author: "Jessie Jia",
                                    role: "Founder | Ex Meta",
                                    highlight: "Mentorship & Growth",
                                },
                                {
                                    quote: "I was always in awe for Shubham's ability to quickly analyze the source of an emerging bug, brainstorm solutions and then quickly solve them. There were several times where I got stuck on an issue for quite some time and I could always count on Shubham to advice me and help me find a solution. Besides his great coding skills he is also an amazing person in general. He's hardworking, never complains, is funny and just simply lifts the group spirit.",
                                    author: "Tijl Declerck",
                                    role: "Web Developer, Octonius Inc.",
                                    highlight: "Problem Solving",
                                },
                                {
                                    quote: "We've been working for almost a year dealing with the same project. Shubham is a full stack skilled developer, he's humble, patient and responsible, always bringing his concerns to the team and researching for best solutions. He has natural social skills to maintain healthy communication with all coworkers and help the team evolve and take good decisions together. I'm very sure Shubham will develop an awesome career, due to his technical and social skills.",
                                    author: "Jonas Balieiro Rossi",
                                    role: "Sr. Infrastructure Engineer | SRE | DevOps",
                                    highlight: "Team Collaboration",
                                },
                            ].map((testimonial, index) => (
                                <RevealCard
                                    key={testimonial.author}
                                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-800/50 p-6 hover:border-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/0 via-blue-600/0 to-purple-600/0 group-hover:from-cyan-600/5 group-hover:via-blue-600/5 group-hover:to-purple-600/5 transition-all duration-500" />
                                    <div className="relative z-10">
                                        <div className="flex items-start gap-2 mb-4">
                                            <svg className="w-8 h-8 text-cyan-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                            </svg>
                                            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                                                {testimonial.highlight}
                                            </span>
                                        </div>
                                        <p className="text-neutral-300 leading-relaxed mb-6 italic">
                                            &quot;{testimonial.quote}&quot;
                                        </p>
                                        <div className="border-t border-white/10 pt-4">
                                            <p className="text-white font-semibold">{testimonial.author}</p>
                                            <p className="text-sm text-neutral-400">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </RevealCard>
                            ))}
                        </div>
                        <p className="text-center text-xs text-neutral-500 mt-8">
                            * Recommendations from LinkedIn colleagues and team members. Authentic feedback from real professional collaborations.
                        </p>
                    </motion.div>

                    {/* Personal Touch */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 2 }}
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
