import { Metadata } from "next";
import StoryClient from "./story-client";

export const metadata: Metadata = {
  title: "My Story & Philosophy | Shubham Singh",
  description:
    "From curious engineer to Engineering Leader. Read about my operating philosophy, core values, and the journey that shaped my technical leadership.",
  keywords: [
    "Engineering Leadership",
    "Operating Philosophy",
    "Core Values",
    "Career Journey",
    "Mentorship",
    "Platform Engineering",
  ],
};

export default function StoryPage() {
  return <StoryClient />;
}