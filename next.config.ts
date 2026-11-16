import type { NextConfig } from "next";

/**
 * Export 100 % statique : compatible GitHub Pages, Netlify, Cloudflare Pages,
 * OVH / o2switch (Apache) ou tout hébergement de fichiers.
 * - NEXT_PUBLIC_BASE_PATH : à définir si le site est servi dans un sous-dossier
 *   (ex. "/ccp-puymoyen" pour https://<compte>.github.io/ccp-puymoyen).
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    deviceSizes: [480, 828, 1200, 1920],
    imageSizes: [240, 360],
  },
};

export default nextConfig;
