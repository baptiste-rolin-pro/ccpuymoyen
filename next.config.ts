import type { NextConfig } from "next";
import redirectMap from "./data/redirects.json";

/**
 * Mode serveur Next.js (hébergement Vercel) : nécessaire pour l'espace membres
 * (connexion, téléchargements protégés). Les pages publiques restent pré-générées.
 */
const nextConfig: NextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    deviceSizes: [480, 828, 1200, 1920],
    imageSizes: [240, 360],
  },
  // les documents réservés (dossier private/) sont embarqués uniquement dans la route protégée
  outputFileTracingIncludes: {
    "/api/membres/documents/[id]": ["./private/**/*"],
  },
  async redirects() {
    return redirectMap.rules.map((r) => ({
      source: r.match === "prefix" ? `${r.from}:path*` : r.from,
      destination: r.to,
      permanent: true,
    }));
  },
  async headers() {
    return [
      {
        source: "/:dir(img|partners|brand)/:file*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
      {
        source: "/(espace-membre|connexion|api)/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
