import type { MetadataRoute } from "next";
import { env } from "process";

export default function sitemap(): MetadataRoute.Sitemap {
  const host = env.HOST_NAME;

  return [
    {
      url: `${host}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];
}
