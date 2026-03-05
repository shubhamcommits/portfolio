import { Metadata } from "next";
import AwardsClient from "./awards-client";

export const metadata: Metadata = {
  title: "Awards & Recognition - Einstein Award, UN, Best of Palo Alto | Shubham Singh",
  description:
    "Recognized with Einstein Award (Top 1% Engineering at Airtel), Best of Palo Alto, United Nations recognition for digital solutions, and multiple hackathon wins.",
  keywords: [
    "Einstein Award engineer",
    "Best of Palo Alto software engineer",
    "United Nations recognition",
    "Hackathon winner",
    "Top SRE awards",
    "Engineering excellence awards",
  ],
};

export default function AwardsPage() {
  return <AwardsClient />;
}
