"use client";

import { motion } from "framer-motion";
import { Navbar } from "../components/ui/navbar";
import { AwardCard } from "../components/ui/award-card";
import { HeroHighlight } from "../components/ui/hero-highlight";

interface Award {
  id: string;
  title: string;
  organization: string;
  year: string;
  location?: string;
  description: string;
  impact?: string[];
  details?: string[];
  type: "award" | "recognition" | "achievement" | "representation";
  tags: string[];
}

const awards: Award[] = [
  {
    id: "un-reboot-earth",
    title: "Country Winners - Reboot the Earth",
    organization: "United Nations",
    year: "2019",
    location: "UN Headquarters, New York",
    description: "Achieved the title of Country Winners at Reboot the Earth presented by the United Nations and represented India at UN Headquarters, New York.",
    impact: [
      "Represented India at UN Headquarters, New York",
      "Promoted women empowerment and climate change awareness",
      "Addressed impact on 150 Million people affected by climate change",
    ],
    details: [
      "Focused on how women are affected due to climate change",
      "Presented solutions to address climate impact on vulnerable populations",
      "Advocated for women's role in climate action and sustainable development",
    ],
    type: "award",
    tags: ["United Nations", "Climate Change", "Women Empowerment", "Sustainability", "Global Impact"],
  },
  {
    id: "youth-climate-summit",
    title: "Youth Climate Summit Representative",
    organization: "United Nations",
    year: "2018-2019",
    description: "Recognised as the Youth Climate Summit Representative at United Nations and worked on impactful projects addressing UN Global SDGs.",
    impact: [
      "Provided employment opportunities to women",
      "Connected women with diverse skill sets & STEAM skills",
      "Empowered women to work for climate, child protection, and social issues",
      "Contributed to decreasing Greenhouse Gases in the environment",
    ],
    details: [
      "Aimed to provide employment to women connecting them with diverse skill sets & STEAM skills",
      "Empowered women to work for climate action, child protection, and combat violence, exploitation, & abuse",
      "Focused on decreasing the number of Greenhouse Gases in the environment to address UN Global SDGs",
    ],
    type: "representation",
    tags: ["United Nations", "Climate Summit", "SDGs", "Women Empowerment", "STEAM", "Environmental Action"],
  },
  {
    id: "progate-inventor",
    title: "Inventor of the Month",
    organization: "Progate (Japan)",
    year: "August 2018",
    description: "Featured as the Inventor of the Month in the Month of August 2018 by Progate, a Japan-based company recognizing innovative contributions to technology and education.",
    type: "recognition",
    tags: ["Innovation", "Technology", "Education", "Recognition"],
  },
  {
    id: "carezilla-mvp",
    title: "Product Development Engineer",
    organization: "CareZilla",
    year: "2018",
    description: "Supervised as the Product Development Engineer at CareZilla and accomplished the MVP connecting caregivers and caretakers.",
    impact: [
      "Developed intuitive Progressive Web App (PWA) for healthcare",
      "Connected caregivers with patients needing care",
      "Addressed impairments related to old age, disability, disease, and mental disorders",
    ],
    details: [
      "Built platform connecting caregivers and caretakers (patients)",
      "Focused on caregiving for impairments related to old age, disability, disease, or mental disorders",
      "Delivered MVP as an intuitive Progressive Web Application",
    ],
    type: "achievement",
    tags: ["Healthcare", "PWA", "Product Development", "MVP", "Social Impact"],
  },
  {
    id: "mentors-without-borders",
    title: "Technical Mentor",
    organization: "Mentors without Borders",
    year: "2017-2018",
    location: "Middle East and Africa",
    description: "Taught 15+ children as a Technical Mentor at Mentors without Borders, providing education and guidance to students from Middle East and Africa.",
    impact: [
      "Mentored 15+ children from underserved regions",
      "Provided technical education and skill development",
      "Contributed to bridging the digital divide",
    ],
    type: "recognition",
    tags: ["Education", "Mentorship", "Social Impact", "Technology", "Global Outreach"],
  },
];

export default function AwardsPage() {
  return (
    <section id="awards" className="relative">
      <Navbar className="top-2" />
      <HeroHighlight containerClassName="items-start">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 lg:pt-36 pb-12 lg:pb-24">
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
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
                Awards & Recognition
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg lg:text-xl text-neutral-400 max-w-2xl mx-auto px-4"
            >
              Recognition for contributions to technology, social impact, and global initiatives
            </motion.p>
          </motion.div>

          {/* Awards Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          >
            <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-2xl p-6 border border-amber-500/20">
              <h3 className="text-3xl font-bold text-white mb-2">5</h3>
              <p className="text-neutral-400">Major Recognitions</p>
            </div>
            <div className="bg-gradient-to-br from-rose-500/10 to-pink-500/10 rounded-2xl p-6 border border-rose-500/20">
              <h3 className="text-3xl font-bold text-white mb-2">2</h3>
              <p className="text-neutral-400">UN Representations</p>
            </div>
            <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-2xl p-6 border border-orange-500/20">
              <h3 className="text-3xl font-bold text-white mb-2">150M+</h3>
              <p className="text-neutral-400">People Impacted</p>
            </div>
          </motion.div>

          {/* Awards Grid */}
          <div className="space-y-8 lg:space-y-12">
            {awards.map((award, index) => (
              <AwardCard
                key={award.id}
                award={award}
                index={index}
              />
            ))}
          </div>
        </div>
      </HeroHighlight>
    </section>
  );
}

