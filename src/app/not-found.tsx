"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
    return (
        <div className="h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden relative">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 text-center px-4"
            >
                <h1 className="text-9xl font-bold text-white mb-4 tracking-tighter">
                    4<span className="text-cyan-500">0</span>4
                </h1>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 to-neutral-500 mb-8">
                        System Malfunction
                    </h2>
                    <p className="text-neutral-400 max-w-lg mx-auto mb-8 text-sm md:text-base">
                        The requested resource could not be located in this sector.
                        It may have been moved, deleted, or consumed by a black hole.
                    </p>

                    <Link
                        href="/"
                        className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold transition duration-200 hover:shadow-lg hover:shadow-cyan-500/50"
                    >
                        Return to Base
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
}
