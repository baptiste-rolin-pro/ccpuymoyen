import { photo, type PhotoKey } from "@/data/media";
import type { GalleryItem } from "@/components/Gallery";

export function toGalleryItems(keys: PhotoKey[]): GalleryItem[] {
  return keys.map((k) => {
    const p = photo(k);
    return { key: k, src: p.src, width: p.width, height: p.height, alt: p.alt, caption: p.caption, blur: p.blur, focus: p.focus };
  });
}
