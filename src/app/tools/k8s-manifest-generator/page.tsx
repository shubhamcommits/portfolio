import { Metadata } from "next";
import K8sManifestGeneratorClient from "./k8s-manifest-generator-client";

export const metadata: Metadata = {
  title: "Kubernetes Manifest Generator - Free YAML Generator for K8s",
  description:
    "Generate production-ready Kubernetes YAML manifests instantly. Create Deployments, Services, Ingress, ConfigMaps, CronJobs, and more with an interactive form. Free, no sign-up required.",
  keywords: [
    "kubernetes manifest generator",
    "k8s yaml generator",
    "kubernetes deployment yaml",
    "kubernetes service yaml",
    "kubernetes ingress yaml",
    "kubernetes configmap generator",
    "kubernetes cronjob yaml",
    "k8s manifest builder",
    "generate kubernetes yaml",
    "kubernetes yaml template",
    "kubernetes deployment template",
    "k8s yaml online",
    "kubernetes yaml creator",
    "helm alternative",
  ],
};

export default function K8sManifestGeneratorPage() {
  return <K8sManifestGeneratorClient />;
}
