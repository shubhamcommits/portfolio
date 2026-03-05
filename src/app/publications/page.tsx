import { Metadata } from "next";
import PublicationsClient from "./publications-client";

export const metadata: Metadata = {
  title: "Research Publications - Nature, IEEE | Shubham Singh",
  description:
    "Peer-reviewed research published in Nature Scientific Reports (Impact Factor 42.78) and IEEE on machine learning, bioinformatics, computer vision, and genetic algorithms.",
  keywords: [
    "Nature Scientific Reports author",
    "IEEE publication",
    "Machine learning research",
    "Bioinformatics database",
    "Computer vision GAN",
    "Published software engineer",
    "Research publications SRE",
  ],
};

export default function PublicationsPage() {
  return <PublicationsClient />;
}
