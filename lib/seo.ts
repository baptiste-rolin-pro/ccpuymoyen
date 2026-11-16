import type { Metadata } from "next";
import { site } from "@/data/site";

type Seo = { title: string; description: string; path: string; image?: string; type?: "website" | "article"; publishedTime?: string };

/** Métadonnées uniques par page : title, description, canonical, Open Graph, Twitter. */
export function pageMetadata({ title, description, path, image = "/og/og-default.jpg", type = "website", publishedTime }: Seo): Metadata {
  const url = `${site.url}${path}`;
  const img = image.startsWith("http") ? image : `${site.url}${image}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: site.name,
      locale: site.locale,
      images: [{ url: img, width: 1200, height: 630, alt: title }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: { card: "summary_large_image", title, description, images: [img] },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SportsOrganization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    alternateName: ["CC Puymoyen", "CCP", site.nickname],
    url: `${site.url}/`,
    logo: `${site.url}/brand/logo-ccp-puymoyen.png`,
    sport: "Cyclisme",
    foundingDate: String(site.foundingYear),
    description: site.description,
    memberOf: { "@type": "SportsOrganization", name: "UFOLEP" },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    location: {
      "@type": "Place",
      name: `${site.meetingPoint.label}, Puymoyen`,
      geo: { "@type": "GeoCoordinates", latitude: site.meetingPoint.lat, longitude: site.meetingPoint.lng },
    },
    areaServed: ["Puymoyen", "Angoulême", "Charente"],
    sameAs: [site.social.facebook, site.social.instagram, site.social.youtube].filter(Boolean),
  };
}
