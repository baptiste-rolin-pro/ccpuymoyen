import Image from "next/image";
import { photo, type PhotoKey } from "@/data/media";

type Props = {
  k: PhotoKey;
  sizes: string;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  alt?: string;
};

/** Image optimisée (WebP responsive, lazy loading, placeholder flouté, dimensions explicites). */
export function Photo({ k, sizes, className, priority, fill, alt }: Props) {
  const p = photo(k);
  const common = {
    src: p.src,
    alt: alt ?? p.alt,
    sizes,
    priority,
    placeholder: "blur" as const,
    blurDataURL: p.blur,
    className,
    style: p.focus ? { objectPosition: p.focus } : undefined,
  };
  return fill ? <Image {...common} fill /> : <Image {...common} width={p.width} height={p.height} />;
}
