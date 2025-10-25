"use client";
import { Navbar } from "../components/ui/navbar";
import Section from "../components/ui/section";
import { HeroHighlight } from "../components/ui/hero-highlight";
import Link from "next/link";

export default function AboutPage() {
  return (
    <section id="about">
      <div className="relative w-full flex items-center justify-center">
        <Navbar className="top-2" />
      </div>
      <HeroHighlight>
        <Section title="About" subtitle="Engineer. Entrepreneur. Author." className="bg-transparent pt-24 pb-20">
          <div className="space-y-6 text-neutral-200">
            <p>
              I design and build resilient platforms, automation, and products. Over the years I
              have worked across platform engineering, DevSecOps, SRE, and full-stack development,
              leading large-scale Kubernetes estates, optimizing CI/CD, and crafting AI-assisted
              operational tooling.
            </p>
            <p>
              I enjoy tackling ambiguous problems, shaping architecture, and mentoring teams. Outside
              of work I write, tinker with agents, and build tools that reduce toil.
            </p>
            <div className="flex gap-4 pt-2">
              <a
                className="px-4 py-2 rounded-md bg-cyan-500 text-black font-medium"
                href="/SHUBHAM_CV_'25.pdf" download
              >
                Download Resume
              </a>
              <Link className="px-4 py-2 rounded-md border border-white/20" href="/contact">
                Get in touch
              </Link>
            </div>
          </div>
        </Section>
      </HeroHighlight>
    </section>
  );
}


