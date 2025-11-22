import { Metadata } from "next";
import PublicationsClient from "./publications-client";

export const metadata: Metadata = {
  title: "Research & Publications | Shubham Singh",
  description:
    "Read my peer-reviewed research on Machine Learning, CVDs, and Genetic Algorithms published in Nature Scientific Reports and IEEE.",
  keywords: [
    "Research Publications",
    "Nature Scientific Reports",
    "IEEE",
    "Machine Learning",
    "Bioinformatics",
    "Genetic Algorithms",
    "Computer Vision",
  ],
};

export default function PublicationsPage() {
  return <PublicationsClient />;
}
