import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./navbar-menu";
import { cn } from "@/utils/cn";

export function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    return (
        <>
            {/* Desktop Navbar */}
            <div
                className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50 hidden lg:block", className)}
            >
                <Menu setActive={setActive}>
                    <HoveredLink href="/">Home</HoveredLink>
                    <HoveredLink href="/story">Story</HoveredLink>
                    <HoveredLink href="/projects">Projects</HoveredLink>
                    <HoveredLink href="/experience">Experience</HoveredLink>
                    <HoveredLink href="/skills">Skills</HoveredLink>
                    <HoveredLink href="/publications">Publications</HoveredLink>
                    <HoveredLink href="/awards">Awards</HoveredLink>
                    <HoveredLink href="/contact">Contact</HoveredLink>
                {/* <MenuItem setActive={setActive} active={active} item="Services">
                    <div className="flex flex-col space-y-4 text-sm">
                        <HoveredLink href="/web-dev">Web Development</HoveredLink>
                        <HoveredLink href="/interface-design">Interface Design</HoveredLink>
                        <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
                        <HoveredLink href="/branding">Branding</HoveredLink>
                    </div>
                </MenuItem> */}
                {/* <MenuItem setActive={setActive} active={active} item="Recent projects">
                    <div className="  text-sm grid grid-cols-2 gap-10 p-4">
                        <ProductItem
                            title="Algochurn"
                            href="https://algochurn.com"
                            src="https://assets.aceternity.com/demos/algochurn.webp"
                            description="Prepare for tech interviews like never before."
                        />
                        <ProductItem
                            title="Tailwind Master Kit"
                            href="https://tailwindmasterkit.com"
                            src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
                            description="Production ready Tailwind css components for your next project"
                        />
                        <ProductItem
                            title="Moonbeam"
                            href="https://gomoonbeam.com"
                            src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
                            description="Never write from scratch again. Go from idea to blog in minutes."
                        />
                        <ProductItem
                            title="Rogue"
                            href="https://userogue.com"
                            src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
                            description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
                        />
                    </div>
                </MenuItem> */}
                </Menu>
            </div>
            
            {/* Mobile Navbar */}
            <div className="lg:hidden fixed top-4 right-4 z-50">
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-3 rounded-lg bg-black/20 backdrop-blur-md border border-white/10"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                        {isMobileMenuOpen ? (
                            <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        ) : (
                            <>
                                <path d="M4 6H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                <path d="M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </>
                        )}
                    </svg>
                </button>
                
                {isMobileMenuOpen && (
                    <div className="fixed inset-0 bg-black/95 backdrop-blur-lg flex items-center justify-center">
                        <nav className="flex flex-col items-center space-y-8">
                            <a href="/" className="text-2xl text-white hover:text-indigo-400 transition-colors">Home</a>
                            <a href="/story" className="text-2xl text-white hover:text-indigo-400 transition-colors">Story</a>
                            <a href="/projects" className="text-2xl text-white hover:text-indigo-400 transition-colors">Projects</a>
                            <a href="/experience" className="text-2xl text-white hover:text-indigo-400 transition-colors">Experience</a>
                            <a href="/skills" className="text-2xl text-white hover:text-indigo-400 transition-colors">Skills</a>
                            <a href="/publications" className="text-2xl text-white hover:text-indigo-400 transition-colors">Publications</a>
                            <a href="/awards" className="text-2xl text-white hover:text-indigo-400 transition-colors">Awards</a>
                            <a href="/contact" className="text-2xl text-white hover:text-indigo-400 transition-colors">Contact</a>
                        </nav>
                    </div>
                )}
            </div>
        </>
    );
}