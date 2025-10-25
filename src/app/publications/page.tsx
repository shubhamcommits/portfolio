"use client";

import { motion } from "framer-motion";
import { Navbar } from "../components/ui/navbar";
import { PublicationCard } from "../components/ui/publication-card";
import { HeroHighlight } from "../components/ui/hero-highlight";

interface Publication {
  id: string;
  title: string;
  journal: string;
  year: string;
  description: string;
  impactFactor?: string;
  link: string;
  type: "journal" | "conference" | "research";
  tags: string[];
}

const publications: Publication[] = [
  {
    id: "morcvd",
    title: "MorCVD: A Unified Database for Host-Pathogen Protein-Protein Interactions of CVDs Related to Microbes",
    journal: "Nature Journal - Scientific Reports",
    year: "2019",
    description: "Microbe induced cardiovascular diseases (CVDs) are less studied at present. Host-pathogen interactions (HPIs) between human proteins and microbial proteins associated with CVD can be found dispersed in existing molecular interaction databases. MorCVD database is a curated resource that combines 23,377 protein interactions between human host and 432 unique pathogens involved in CVDs in a single intuitive web application. It covers endocarditis, myocarditis, pericarditis and 16 other microbe induced CVDs. The HPI information has been compiled, curated, and presented in a freely accessible web interface (http://morcvd.sblab-nsit.net/About). Apart from organization, enrichment of the HPI data was done by adding hyperlinked protein ID, PubMed, gene ontology records. For each protein in the database, drug target and interactors (same as well as different species) information has been provided. The database can be searched by disease, protein ID, pathogen name or interaction detection method. Interactions detected by more than one method can also be listed. The information can be presented in tabular form or downloaded. A comprehensive help file has been developed to explain the various options available. Hence, MorCVD acts as a unified resource for retrieval of HPI data for researchers in CVD and microbiology.",
    impactFactor: "42.78",
    link: "https://www.nature.com/articles/s41598-019-40704-5",
    type: "journal",
    tags: ["Machine Learning", "Database", "Bioinformatics", "CVD", "Protein Interactions"],
  },
  {
    id: "mast",
    title: "MAST: Multi-Attributed and Structured Text-to-Face Synthesis",
    journal: "Institute of Electrical and Electronics Engineers - IEEE",
    year: "2020",
    description: "Generative Adversarial Networks (GANs) have revolutionized image synthesis through many applications like face generation, photograph editing, and image super-resolution. Image synthesis using GANs has predominantly been uni-modal, with few approaches that can synthesize images from text or other data modes. Text-to-image synthesis, especially text-to-face synthesis, has promising use cases of robust face-generation from eye witness accounts and augmentation of the reading experience with visual cues. However, only a couple of datasets provide consolidated face data and textual descriptions for text-to-face synthesis. Moreover, these textual annotations are less extensive and descriptive, which reduces the diversity of faces generated from it. This paper empirically proves that increasing the number of facial attributes in each textual description helps GANs generate more diverse and real-looking faces. To prove this, we propose a new methodology that focuses on using structured textual descriptions. We also consolidate a Multi-Attributed and Structured Text-to-face (MAST) dataset consisting of high-quality images with structured textual annotations and make it available to researchers to experiment and build upon. Lastly, we report benchmark Fréchet’s Inception Distance (FID), Facial Semantic Similarity (FSS), and Facial Semantic Distance (FSD) scores for the MAST dataset.",
    link: "https://ieeexplore.ieee.org/abstract/document/9557583",
    type: "conference",
    tags: ["GANs", "Deep Learning", "Computer Vision", "Face Synthesis", "Neural Networks"],
  },
  {
    id: "exercise-selection",
    title: "Genetic Algorithms: The Best Exercise Selection Strategy",
    journal: "Independent Research",
    year: "2019",
    description: "The goal of this research was to assist one in selecting the best exercise among a wide range of contenders by utilising hereditary calculations.",
    link: "https://bit.ly/exerciseSelection",
    type: "research",
    tags: ["Genetic Algorithms", "Optimization", "Fitness", "Machine Learning"],
  }
];

export default function PublicationsPage() {
  return (
    <section id="publications" className="relative">
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
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
                Research Publications
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg lg:text-xl text-neutral-400 max-w-2xl mx-auto px-4"
            >
              My contributions to the scientific community through peer-reviewed journals, conferences, and research projects
            </motion.p>
          </motion.div>

          {/* Publications Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          >
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/20">
              <h3 className="text-3xl font-bold text-white mb-2">3</h3>
              <p className="text-neutral-400">Publications</p>
            </div>
            <div className="bg-gradient-to-br from-indigo-500/10 to-blue-500/10 rounded-2xl p-6 border border-indigo-500/20">
              <h3 className="text-3xl font-bold text-white mb-2">42.78</h3>
              <p className="text-neutral-400">Highest Impact Factor</p>
            </div>
            <div className="bg-gradient-to-br from-cyan-500/10 to-teal-500/10 rounded-2xl p-6 border border-cyan-500/20">
              <h3 className="text-3xl font-bold text-white mb-2">2019-2020</h3>
              <p className="text-neutral-400">Publication Years</p>
            </div>
          </motion.div>

          {/* Publications Grid */}
          <div className="space-y-8 lg:space-y-12">
            {publications.map((pub, index) => (
              <PublicationCard
                key={pub.id}
                publication={pub}
                index={index}
              />
            ))}
          </div>
        </div>
      </HeroHighlight>
    </section>
  );
}
