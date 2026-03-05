import { MetadataRoute } from "next";

const baseUrl = "https://shubhamsinngh.com";

const routes: Array<{
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  lastModified: string;
}> = [
    { path: "", priority: 1, changeFrequency: "weekly", lastModified: "2026-03-01" },
    { path: "/story", priority: 0.85, changeFrequency: "monthly", lastModified: "2026-02-15" },
    { path: "/experience", priority: 0.95, changeFrequency: "monthly", lastModified: "2026-03-01" },
    { path: "/projects", priority: 0.9, changeFrequency: "monthly", lastModified: "2026-02-01" },
    { path: "/skills", priority: 0.85, changeFrequency: "monthly", lastModified: "2026-02-15" },
    { path: "/publications", priority: 0.7, changeFrequency: "yearly", lastModified: "2025-12-01" },
    { path: "/awards", priority: 0.7, changeFrequency: "yearly", lastModified: "2025-12-01" },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly", lastModified: "2026-03-01" },
    { path: "/blog", priority: 0.85, changeFrequency: "weekly", lastModified: "2026-03-01" },
    { path: "/tools", priority: 0.9, changeFrequency: "monthly", lastModified: "2026-03-05" },
    { path: "/tools/markdown-to-pdf", priority: 0.85, changeFrequency: "monthly", lastModified: "2026-03-05" },
    { path: "/tools/ai-text-cleaner", priority: 0.85, changeFrequency: "monthly", lastModified: "2026-03-05" },
    { path: "/tools/json-formatter", priority: 0.85, changeFrequency: "monthly", lastModified: "2026-03-05" },
    { path: "/tools/yaml-json-converter", priority: 0.85, changeFrequency: "monthly", lastModified: "2026-03-05" },
    { path: "/tools/k8s-manifest-generator", priority: 0.85, changeFrequency: "monthly", lastModified: "2026-03-05" },
    // Blog posts
    { path: "/blog/future-of-platform-engineering-ai-ops", priority: 0.75, changeFrequency: "monthly", lastModified: "2025-12-15" },
    { path: "/blog/scaling-kubernetes-800-clusters", priority: 0.75, changeFrequency: "monthly", lastModified: "2025-10-28" },
    { path: "/blog/building-resilient-systems", priority: 0.75, changeFrequency: "monthly", lastModified: "2025-08-10" },
  ];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(route.lastModified),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
