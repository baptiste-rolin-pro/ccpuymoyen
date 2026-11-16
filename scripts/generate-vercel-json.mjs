// Génère vercel.json (redirections 301 des anciennes URL) à partir de data/redirects.json.
// À relancer après toute modification de data/redirects.json : npm run redirects:vercel
import fs from "node:fs";

const { rules } = JSON.parse(fs.readFileSync("data/redirects.json", "utf8"));
const redirects = rules.map((r) => ({
  source: r.match === "prefix" ? `${r.from}:path*` : r.from,
  destination: r.to,
  permanent: true,
}));
const config = {
  $schema: "https://openapi.vercel.sh/vercel.json",
  redirects,
  headers: [
    {
      source: "/(img|partners|brand|_next/static)/(.*)",
      headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
    },
  ],
};
fs.writeFileSync("vercel.json", JSON.stringify(config, null, 2) + "\n");
console.log(`[vercel] ${redirects.length} redirections écrites dans vercel.json`);
