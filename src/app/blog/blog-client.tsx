"use client";

import { motion } from "framer-motion";
import { Navbar } from "../components/ui/navbar";
import { HeroHighlight } from "../components/ui/hero-highlight";
import { blogPosts } from "./blog-data";
import Link from "next/link";

export default function BlogClient() {
    return (
        <section id="blog" className="relative">
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
                            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                                Engineering Thoughts
                            </span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-base sm:text-lg lg:text-xl text-neutral-400 max-w-2xl mx-auto px-4"
                        >
                            Deep dives into Platform Engineering, SRE, and the future of AI Ops.
                        </motion.p>
                    </motion.div>

                    {/* Blog Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogPosts.map((post, index) => (
                            <motion.div
                                key={post.slug}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                            >
                                <Link href={`/blog/${post.slug}`} className="group block h-full">
                                    <div className="h-full relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-800/50 p-6 hover:border-purple-500/30 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 flex flex-col">
                                        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 via-pink-600/0 to-indigo-600/0 group-hover:from-purple-600/5 group-hover:via-pink-600/5 group-hover:to-indigo-600/5 transition-all duration-500" />

                                        <div className="relative z-10 flex flex-col h-full">
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {post.tags.map((tag) => (
                                                    <span key={tag} className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                                                {post.title}
                                            </h3>

                                            <p className="text-neutral-400 text-sm mb-6 flex-grow line-clamp-3">
                                                {post.excerpt}
                                            </p>

                                            <div className="flex items-center justify-between text-xs text-neutral-500 mt-auto pt-4 border-t border-white/5">
                                                <span>{post.date}</span>
                                                <span>{post.readTime}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </HeroHighlight>
        </section>
    );
}
