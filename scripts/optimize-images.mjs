// Génère des variantes WebP responsives à partir des photos originales (assets/photos)
// -> public/img/<nom>-<largeur>.webp  +  data/images.generated.json (dimensions)
// Les fichiers déjà générés et plus récents que l'original sont ignorés.
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SRC = "assets/photos";
const OUT = "public/img";
const WIDTHS = [480, 828, 1200, 1920];
fs.mkdirSync(OUT, { recursive: true });

const manifest = {};
const files = fs.readdirSync(SRC).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).sort();
let generated = 0;
for (const file of files) {
  const name = file.replace(/\.[^.]+$/, "");
  const src = path.join(SRC, file);
  const meta = await sharp(src).rotate().metadata();
  const w = meta.autoOrient?.width ?? meta.width;
  const h = meta.autoOrient?.height ?? meta.height;
  manifest[name] = { width: w, height: h };
  const srcTime = fs.statSync(src).mtimeMs;
  for (const width of WIDTHS) {
    const dest = path.join(OUT, `${name}-${width}.webp`);
    if (fs.existsSync(dest) && fs.statSync(dest).mtimeMs > srcTime) continue;
    await sharp(src)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: width >= 1200 ? 72 : 76, effort: 5 })
      .toFile(dest);
    generated++;
  }
  // petite vignette floutée (placeholder) encodée en base64
  const blur = await sharp(src).rotate().resize(16).webp({ quality: 40 }).toBuffer();
  manifest[name].blur = `data:image/webp;base64,${blur.toString("base64")}`;
}
fs.writeFileSync("data/images.generated.json", JSON.stringify(manifest, null, 2));
console.log(`[images] ${files.length} photos, ${generated} variantes générées`);
