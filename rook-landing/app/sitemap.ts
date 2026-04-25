import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: "https://userook.app",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://userook.app/changelog",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];
}
