import { Metadata } from "next";
import StoryClient from "./story-client";

export const metadata: Metadata = {
  title: "My Story - From Founding Engineer to MTS at Salesforce | Shubham Singh",
  description:
    "The journey from co-founding a startup in Palo Alto to managing 1,000+ Kubernetes clusters at Salesforce. Operating philosophy, core values, and what drives my approach to reliability engineering.",
  keywords: [
    "SRE career journey",
    "Platform engineer story",
    "Engineering leadership",
    "Startup to enterprise",
    "Reliability engineering philosophy",
    "DevOps career path",
    "Kubernetes engineer journey",
  ],
};

export default function StoryPage() {
  return <StoryClient />;
}
