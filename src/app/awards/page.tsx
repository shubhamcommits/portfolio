import { Metadata } from "next";
import AwardsClient from "./awards-client";

export const metadata: Metadata = {
  title: "Awards & Recognition | Shubham Singh",
  description:
    "Honors and awards including United Nations recognition, Einstein Award, and 'Best of Palo Alto'. A testament to impactful technical work.",
  keywords: [
    "Awards",
    "Recognition",
    "Einstein Award",
    "United Nations",
    "Hackathon Winner",
    "Best of Palo Alto",
    "Software Engineer",
  ],
};

export default function AwardsPage() {
  return <AwardsClient />;
}
