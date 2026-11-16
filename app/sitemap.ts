import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { sortedArticles } from "@/data/news";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "/", priority: 1 },
    { path: "/le-club/", priority: 0.8 },
    { path: "/le-club/reglement-interieur/", priority: 0.5 },
    { path: "/sorties/", priority: 0.9 },
    { path: "/actualites/", priority: 0.8 },
    { path: "/galerie/", priority: 0.5 },
    { path: "/partenaires/", priority: 0.6 },
    { path: "/nous-rejoindre/", priority: 0.9 },
    { path: "/mentions-legales/", priority: 0.2 },
  ];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p.path}`, priority: p.priority })),
    ...sortedArticles().map((a) => ({ url: `${site.url}/actualites/${a.slug}/`, lastModified: a.date, priority: 0.6 })),
  ];
}
