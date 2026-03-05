import React, { useState } from "react";
import { HoveredLink, Menu } from "./navbar-menu";
import { cn } from "@/utils/cn";
import { navigation } from "@/data/navigation";

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
                    {navigation.map((item) => (
                        <HoveredLink key={item.name} href={item.href}>{item.name}</HoveredLink>
                    ))}
                </Menu>
            </div>

            {/* Mobile Navbar */}
            <div className="lg:hidden">
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="fixed top-4 right-4 z-[60] p-3 rounded-lg bg-black/20 backdrop-blur-md border border-white/10 hover:bg-black/40 transition-colors"
                    aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
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
                    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-center justify-center overflow-hidden">
                        <nav className="flex flex-col items-center justify-center space-y-6 px-4 py-20 w-full h-full">
                            {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="text-2xl text-white hover:text-cyan-400 transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </a>
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </>
    );
}
