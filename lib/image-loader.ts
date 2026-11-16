// Loader next/image pour l'export statique : sert les variantes WebP
// pré-générées par scripts/optimize-images.mjs (public/img/<nom>-<largeur>.webp).
const WIDTHS = [480, 828, 1200, 1920];

export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (!src.startsWith("/img/")) return `${base}${src}`;
  const w = WIDTHS.find((x) => x >= width) ?? WIDTHS[WIDTHS.length - 1];
  return `${base}${src}-${w}.webp`;
}
