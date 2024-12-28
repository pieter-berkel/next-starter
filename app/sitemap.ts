import { env } from "process";

import type { MetadataRoute } from "next";

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
