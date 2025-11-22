import { Metadata } from "next";
import ContactClient from "./contact-client";

export const metadata: Metadata = {
  title: "Contact & Connect | Shubham Singh",
  description:
    "Get in touch for collaborations, speaking opportunities, or technical consulting. Connect via Email, LinkedIn, or GitHub.",
  keywords: [
    "Contact",
    "Hire Software Engineer",
    "Consulting",
    "Speaking Opportunities",
    "Collaboration",
    "Email",
    "LinkedIn",
  ],
};

export default function ContactPage() {
  return <ContactClient />;
}