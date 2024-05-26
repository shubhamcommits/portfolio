"use client";
import { HeroHighlight, Highlight } from "../components/ui/hero-highlight";
import { motion } from "framer-motion";
import { Navbar } from "../components/ui/navbar";

export default function Page() {
    return (
        <section id="about">
            <div className="relative w-full flex items-center justify-center">
                <Navbar className="top-2" />
            </div>
            <HeroHighlight>
                <motion.h1
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: [20, -5, 0],
                    }}
                    transition={{
                        duration: 0.5,
                        ease: [0.4, 0.0, 0.2, 1],
                    }}
                    className="text-2xl px-4 md:text-2xl lg:text-2xl font-semibold dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
                >
                    I am a versatile and passionate professional with over 7 years of experience in engineering, entrepreneurship, and research. My journey spans {" "}
                    <Highlight className="text-white">
                        core software development, platform engineering, DevOps/DevSecOps, system architecture, and more.
                    </Highlight> I thrive in solving complex problems and driving innovation across diverse industries.
                </motion.h1>
            </HeroHighlight>
        </section>
    );
}