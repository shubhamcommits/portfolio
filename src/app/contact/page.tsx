import { Metadata } from "next";
import ContactClient from "./contact-client";

export const metadata: Metadata = {
  title: "Contact Shubham Singh | Senior SRE, DevOps & Platform Engineer",
  description:
    "Get in touch with Shubham Singh for Senior/Lead/Staff SRE, Platform, or DevOps roles, engineering consulting, speaking opportunities, or technical collaboration. Open to relocation worldwide.",
  keywords: [
    "Hire SRE",
    "Hire DevOps engineer",
    "Hire Platform Engineer",
    "Senior SRE available",
    "Member of Technical Staff",
    "Kubernetes expert for hire",
    "SRE consultant",
    "DevOps consultant",
    "Infrastructure engineer contact",
  ],
};

export default function ContactPage() {
  return <ContactClient />;
}
