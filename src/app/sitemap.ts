import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", priority: 1, freq: "weekly" as const },
    { path: "/nosotros", priority: 0.8, freq: "monthly" as const },
    { path: "/servicios", priority: 0.9, freq: "monthly" as const },
    { path: "/acreditaciones", priority: 0.8, freq: "monthly" as const },
    { path: "/certificados", priority: 0.7, freq: "monthly" as const },
    { path: "/contacto", priority: 0.7, freq: "yearly" as const },
    { path: "/centro-de-quejas", priority: 0.5, freq: "yearly" as const },
  ];

  const now = new Date();
  return routes.map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }));
}
