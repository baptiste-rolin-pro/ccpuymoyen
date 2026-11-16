import localFont from "next/font/local";

// Polices auto-hébergées (aucune requête vers Google Fonts : RGPD + performance)
export const display = localFont({
  src: [
    { path: "../node_modules/@fontsource/barlow-condensed/files/barlow-condensed-latin-600-normal.woff2", weight: "600" },
    { path: "../node_modules/@fontsource/barlow-condensed/files/barlow-condensed-latin-700-normal.woff2", weight: "700" },
    { path: "../node_modules/@fontsource/barlow-condensed/files/barlow-condensed-latin-800-normal.woff2", weight: "800" },
  ],
  variable: "--font-barlow",
  display: "swap",
  fallback: ["Arial Narrow", "Roboto Condensed", "sans-serif"],
});

export const sans = localFont({
  src: "../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "Roboto", "sans-serif"],
});
