import { Metadata } from "next";
import YamlJsonConverterClient from "./yaml-json-converter-client";

export const metadata: Metadata = {
  title: "YAML to JSON & JSON to YAML Converter - Free Online Tool",
  description:
    "Convert between YAML and JSON instantly. Supports Kubernetes manifests, Docker Compose files, CI/CD configs, and more. Free, no sign-up, runs in your browser.",
  keywords: [
    "yaml to json",
    "json to yaml",
    "yaml to json converter",
    "json to yaml converter",
    "yaml converter online",
    "yaml json online",
    "convert yaml to json",
    "convert json to yaml",
    "kubernetes yaml to json",
    "docker compose yaml to json",
    "yaml parser online",
    "yaml validator",
    "yaml formatter",
  ],
};

export default function YamlJsonConverterPage() {
  return <YamlJsonConverterClient />;
}
