// Génère, après `next build`, les redirections 301 des anciennes URL vers les nouvelles :
//  - out/_redirects  : Netlify, Cloudflare Pages
//  - out/.htaccess   : Apache (OVH, o2switch, Ionos…)
//  - pages HTML de redirection (meta refresh + canonical) pour les hébergeurs
//    sans redirection serveur, comme GitHub Pages.
import fs from "node:fs";
import path from "node:path";

const OUT = "out";
const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.ccpuymoyen.com").replace(/\/$/, "");
const { rules, stubs } = JSON.parse(fs.readFileSync("data/redirects.json", "utf8"));

if (!fs.existsSync(OUT)) {
  console.error("[redirects] dossier out/ absent : lancez d'abord next build");
  process.exit(1);
}

// _redirects
const netlify = rules.map((r) =>
  r.match === "prefix" ? `${base}${r.from}*  ${base}${r.to}  301` : `${base}${r.from}  ${base}${r.to}  301`,
);
fs.writeFileSync(path.join(OUT, "_redirects"), netlify.join("\n") + "\n");

// .htaccess
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const ht = [
  "# Généré par scripts/generate-redirects.mjs",
  "Options -Indexes",
  "ErrorDocument 404 " + base + "/404.html",
  "<IfModule mod_rewrite.c>",
  "RewriteEngine On",
  // forcer https + www
  "RewriteCond %{HTTPS} off [OR]",
  "RewriteCond %{HTTP_HOST} !^www\\. [NC]",
  "RewriteCond %{HTTP_HOST} ^(?:www\\.)?(.+)$ [NC]",
  "RewriteRule ^ https://www.%1%{REQUEST_URI} [L,R=301]",
  ...rules.map((r) => {
    const from = esc(`${base}${r.from}`.replace(/^\//, ""));
    return r.match === "prefix" ? `RewriteRule ^${from}.*$ ${base}${r.to} [L,R=301]` : `RewriteRule ^${from}$ ${base}${r.to} [L,R=301]`;
  }),
  "</IfModule>",
  "<IfModule mod_expires.c>",
  "ExpiresActive On",
  'ExpiresByType image/webp "access plus 1 year"',
  'ExpiresByType font/woff2 "access plus 1 year"',
  'ExpiresByType text/css "access plus 1 year"',
  'ExpiresByType application/javascript "access plus 1 year"',
  "</IfModule>",
];
fs.writeFileSync(path.join(OUT, ".htaccess"), ht.join("\n") + "\n");

// Pages de redirection statiques
function target(from) {
  const exact = rules.find((r) => r.match === "exact" && r.from === from);
  if (exact) return exact.to;
  const prefix = rules.filter((r) => r.match === "prefix" && from.startsWith(r.from)).sort((a, b) => b.from.length - a.from.length)[0];
  return prefix?.to;
}
const all = [...new Set([...rules.filter((r) => !r.from.endsWith(".pdf")).map((r) => r.from), ...stubs])];
let n = 0;
for (const from of all) {
  const to = target(from);
  if (!to || from === "/") continue;
  const file = from.endsWith("/") ? path.join(OUT, from, "index.html") : path.join(OUT, from);
  if (fs.existsSync(file)) continue; // ne jamais écraser une vraie page
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const url = `${base}${to}`;
  fs.writeFileSync(
    file,
    `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Page déplacée — Cyclo Club de Puymoyen</title>` +
      `<meta name="robots" content="noindex"><link rel="canonical" href="${siteUrl}${to}">` +
      `<meta http-equiv="refresh" content="0; url=${url}"><script>location.replace(${JSON.stringify(url)})</script></head>` +
      `<body><p>Cette page a été déplacée : <a href="${url}">${siteUrl}${to}</a></p></body></html>\n`,
  );
  n++;
}
// PDF : copie à l'ancienne adresse pour GitHub Pages (pas de redirection serveur possible)
for (const r of rules.filter((r) => r.from.endsWith(".pdf"))) {
  const dest = path.join(OUT, r.from);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(path.join(OUT, r.to), dest);
}
// GitHub Pages : ne pas ignorer les dossiers commençant par "_" (ex. _next)
fs.writeFileSync(path.join(OUT, ".nojekyll"), "");
console.log(`[redirects] ${rules.length} règles (_redirects, .htaccess), ${n} pages de redirection statiques`);
