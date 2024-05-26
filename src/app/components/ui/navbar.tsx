import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./navbar-menu";
import { cn } from "@/utils/cn";

export function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
    return (
        <div
            className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
        >
            <Menu setActive={setActive}>
                <HoveredLink href="/">Home</HoveredLink>
                <HoveredLink href="/about">Story</HoveredLink>
                <MenuItem setActive={setActive} active={active} item="Highlights">
                    <div className="flex flex-col space-y-4 text-sm">
                        <HoveredLink href="/about">Work chronicals</HoveredLink>
                        <HoveredLink href="/about">Startup(s) saga</HoveredLink>
                        <HoveredLink href="/team">What I've learnt</HoveredLink>
                        <HoveredLink href="/individual">What I've built</HoveredLink>
                        <HoveredLink href="/enterprise">What I excel at</HoveredLink>
                    </div>
                </MenuItem>
                <HoveredLink href="/about">How can I help?</HoveredLink>
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
    );
}