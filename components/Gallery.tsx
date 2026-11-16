"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";

export type GalleryItem = {
  key: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
  blur: string;
  focus?: string;
};

type Props = {
  items: GalleryItem[];
  /** "mosaic" : grille éditoriale asymétrique (accueil) — "masonry" : colonnes (page galerie) */
  layout?: "mosaic" | "masonry";
};

// motif de la mosaïque : chaque tuile reprend une taille (colonnes / lignes) de cette séquence
const MOSAIC = [
  "col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-1 row-span-1",
  "col-span-2 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
];

export function Gallery({ items, layout = "mosaic" }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const [index, setIndex] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);

  const open = (i: number, el: HTMLButtonElement) => {
    triggerRef.current = el;
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const close = useCallback(() => dialogRef.current?.close(), []);
  const go = useCallback(
    (delta: number) => setIndex((i) => (i === null ? i : (i + delta + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    const onClose = () => {
      setIndex(null);
      triggerRef.current?.focus();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    d.addEventListener("close", onClose);
    d.addEventListener("keydown", onKey);
    return () => {
      d.removeEventListener("close", onClose);
      d.removeEventListener("keydown", onKey);
    };
  }, [go]);

  // précharge les photos voisines
  useEffect(() => {
    if (index === null) return;
    [1, -1].forEach((d) => {
      const it = items[(index + d + items.length) % items.length];
      const img = new window.Image();
      img.src = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${it.src}-1920.webp`;
    });
  }, [index, items]);

  const current = index !== null ? items[index] : null;

  return (
    <>
      <ul
        className={
          layout === "mosaic"
            ? "grid auto-rows-[9.5rem] grid-cols-2 gap-2 sm:auto-rows-[12rem] sm:gap-3 md:grid-cols-4 lg:auto-rows-[14rem]"
            : "columns-2 gap-2 sm:gap-3 md:columns-3 xl:columns-4"
        }
      >
        {items.map((it, i) => (
          <li
            key={it.key}
            className={layout === "mosaic" ? MOSAIC[i % MOSAIC.length] : "mb-2 break-inside-avoid sm:mb-3"}
            data-reveal
            style={{ ["--delay" as string]: `${(i % 4) * 70}ms` }}
          >
            <button
              type="button"
              onClick={(e) => open(i, e.currentTarget)}
              className="group relative block h-full w-full overflow-hidden bg-ink-2 text-left"
              aria-label={`Agrandir la photo : ${it.alt}`}
            >
              <Image
                src={it.src}
                alt=""
                width={it.width}
                height={it.height}
                placeholder="blur"
                blurDataURL={it.blur}
                sizes={layout === "mosaic" ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"}
                className={`transition duration-700 ease-[var(--ease-out-quart)] group-hover:scale-[1.05] group-hover:opacity-85 ${
                  layout === "mosaic" ? "h-full w-full object-cover" : "h-auto w-full"
                }`}
                style={it.focus ? { objectPosition: it.focus } : undefined}
              />
              <span className="pointer-events-none absolute inset-0 flex items-end justify-between gap-2 bg-gradient-to-t from-black/70 via-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                <span className="text-sm font-medium text-white">{it.caption}</span>
                <Expand aria-hidden size={18} className="shrink-0 text-white" />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label="Visionneuse de photos"
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-black/95 p-0 text-white backdrop:bg-black/80"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        {current && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between px-4 py-3 sm:px-6">
              <p className="font-display text-lg font-semibold tracking-wider" aria-live="polite">
                {index! + 1} / {items.length}
              </p>
              <button type="button" onClick={close} className="inline-flex h-11 w-11 items-center justify-center hover:text-red" aria-label="Fermer la visionneuse">
                <X aria-hidden size={28} />
              </button>
            </div>
            <figure className="relative flex min-h-0 flex-1 flex-col items-center justify-center px-2 sm:px-20">
              <div className="relative h-full w-full">
                <Image
                  key={current.key}
                  src={current.src}
                  alt={current.alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  placeholder="blur"
                  blurDataURL={current.blur}
                />
              </div>
              <figcaption className="max-w-3xl px-4 py-4 text-center text-sm text-white/80 sm:text-base">
                {current.caption ? <strong className="font-semibold text-white">{current.caption}</strong> : null}
                {current.caption ? " — " : null}
                {current.alt}
              </figcaption>
            </figure>
            <button
              type="button"
              onClick={() => go(-1)}
              className="absolute left-2 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-white/10 hover:bg-red sm:left-6"
              aria-label="Photo précédente"
            >
              <ChevronLeft aria-hidden size={28} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="absolute right-2 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-white/10 hover:bg-red sm:right-6"
              aria-label="Photo suivante"
            >
              <ChevronRight aria-hidden size={28} />
            </button>
          </div>
        )}
      </dialog>
    </>
  );
}
