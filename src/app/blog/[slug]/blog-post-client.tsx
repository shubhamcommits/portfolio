"use client";

import { motion } from "framer-motion";
import { Navbar } from "../../components/ui/navbar";
import { HeroHighlight } from "../../components/ui/hero-highlight";
import { BlogPost } from "../blog-data";
import Link from "next/link";

export default function BlogPostClient({ post }: { post: BlogPost }) {
    // Simple markdown renderer for the content
    const renderContent = (content: string) => {
        return content.split('\n').map((line, index) => {
            const trimmed = line.trim();
            if (!trimmed) return <br key={index} />;

            if (trimmed.startsWith('## ')) {
                return <h2 key={index} className="text-2xl font-bold text-white mt-8 mb-4">{trimmed.replace('## ', '')}</h2>;
            }
            if (trimmed.startsWith('### ')) {
                return <h3 key={index} className="text-xl font-semibold text-purple-400 mt-6 mb-3">{trimmed.replace('### ', '')}</h3>;
            }
            if (trimmed.startsWith('1. ')) {
                return <li key={index} className="ml-6 list-decimal text-neutral-300 mb-2">{trimmed.replace('1. ', '')}</li>;
            }
            if (trimmed.startsWith('- ')) {
                return <li key={index} className="ml-6 list-disc text-neutral-300 mb-2">{trimmed.replace('- ', '')}</li>;
            }

            return <p key={index} className="text-neutral-300 leading-relaxed mb-4">{trimmed}</p>;
        });
    };

    return (
        <section className="relative min-h-screen bg-slate-950">
            <Navbar className="top-2" />
            <HeroHighlight containerClassName="items-start h-full min-h-screen">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-36 pb-12 lg:pb-24">
                    <Link
                        href="/blog"
                        className="inline-flex items-center text-sm text-neutral-400 hover:text-purple-400 transition-colors mb-8"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Blog
                    </Link>

                    <motion.article
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <header className="mb-12 text-center">
                            <div className="flex flex-wrap justify-center gap-2 mb-6">
                                {post.tags.map((tag) => (
                                    <span key={tag} className="text-xs font-medium px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                                {post.title}
                            </h1>

                            <div className="flex items-center justify-center gap-4 text-sm text-neutral-400">
                                <span>{post.date}</span>
                                <span>•</span>
                                <span>{post.readTime}</span>
                            </div>
                        </header>

                        <div className="prose prose-invert max-w-none bg-white/5 rounded-3xl p-8 sm:p-12 border border-white/10">
                            {renderContent(post.content)}
                        </div>
                    </motion.article>
                </div>
            </HeroHighlight>
        </section>
    );
}
