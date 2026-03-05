import { Metadata } from "next";
import ContactClient from "./contact-client";

export const metadata: Metadata = {
  title: "Contact Shubham Singh | Hire Staff SRE & Platform Engineer",
  description:
    "Get in touch with Shubham Singh for Staff/Lead SRE roles, platform engineering consulting, speaking opportunities, or technical collaboration. Open to relocation worldwide.",
  keywords: [
    "Hire SRE",
    "Hire DevOps engineer",
    "Hire Platform Engineer",
    "Staff SRE available",
    "Kubernetes expert for hire",
    "SRE consultant",
    "DevOps consultant",
    "Infrastructure engineer contact",
  ],
};

export default function ContactPage() {
  return <ContactClient />;
}
