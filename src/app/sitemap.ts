import { MetadataRoute } from "next";

const baseUrl = "https://shubhamsinngh.com";

const routes: Array<{
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}> = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/story", priority: 0.85, changeFrequency: "monthly" },
    { path: "/experience", priority: 0.95, changeFrequency: "weekly" },
    { path: "/projects", priority: 0.9, changeFrequency: "weekly" },
    { path: "/skills", priority: 0.85, changeFrequency: "monthly" },
    { path: "/publications", priority: 0.7, changeFrequency: "yearly" },
    { path: "/awards", priority: 0.7, changeFrequency: "yearly" },
    { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
    // Blog posts
    { path: "/blog/future-of-platform-engineering-ai-ops", priority: 0.7, changeFrequency: "monthly" },
    { path: "/blog/scaling-kubernetes-800-clusters", priority: 0.7, changeFrequency: "monthly" },
    { path: "/blog/building-resilient-systems", priority: 0.7, changeFrequency: "monthly" },
  ];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
