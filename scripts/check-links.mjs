// Contrôle des liens internes et des ressources du site exporté (dossier out/).
// Vérifie que chaque href/src interne pointe vers un fichier existant.
import fs from "node:fs";
import path from "node:path";

const OUT = "out";
const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
const files = [];
(function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (p.endsWith(".html")) files.push(p);
  }
})(OUT);

const broken = new Map();
let checked = 0;
for (const file of files) {
  const html = fs.readFileSync(file, "utf8");
  const refs = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((m) => m[1]);
  const srcsets = [...html.matchAll(/srcSet="([^"]+)"/gi)].flatMap((m) => m[1].split(",").map((s) => s.trim().split(" ")[0]));
  for (let ref of [...refs, ...srcsets]) {
    if (!ref.startsWith("/") || ref.startsWith("//")) continue;
    ref = ref.split("#")[0].split("?")[0];
    if (!ref) continue;
    if (base && ref.startsWith(base)) ref = ref.slice(base.length) || "/";
    checked++;
    const p = path.join(OUT, decodeURI(ref));
    const ok = fs.existsSync(p) && (fs.statSync(p).isFile() || fs.existsSync(path.join(p, "index.html")));
    if (!ok) {
      if (!broken.has(ref)) broken.set(ref, new Set());
      broken.get(ref).add(path.relative(OUT, file));
    }
  }
}
console.log(`[liens] ${files.length} pages HTML, ${checked} liens/ressources internes vérifiés`);
if (broken.size) {
  for (const [ref, from] of broken) console.log(`  CASSÉ ${ref}  ← ${[...from].slice(0, 3).join(", ")}`);
  process.exit(1);
}
console.log("[liens] aucun lien interne cassé");
