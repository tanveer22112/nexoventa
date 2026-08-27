import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const routes = ["/", "/about", "/services", "/training", "/admission", "/contact", "/faq", "/announcements", "/privacy", "/terms"];
  return routes.map((route) => ({ url: `${baseUrl}${route}`, changeFrequency: route === "/training" || route === "/announcements" ? "weekly" : "monthly", priority: route === "/" ? 1 : 0.7 }));
}
