"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { nav, site } from "@/data/site";
import { Logo } from "./Logo";

function isActive(pathname: string, href: string) {
  const p = pathname.replace(/\/?$/, "/");
  return href === "/" ? p === "/" : p.startsWith(href);
}

export function Header() {
  const pathname = usePathname() || "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) buttonRef.current?.focus();
  }, []);

  // Fermeture à la navigation
  useEffect(() => setOpen(false), [pathname]);

  // Échap, piège de focus, verrouillage du scroll
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const focusables = () =>
      Array.from(panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []);
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "Tab") {
        const f = focusables();
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const solid = scrolled || open;

  return (
    <header
      className={`on-dark fixed inset-x-0 top-0 z-50 text-white transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
        solid ? "bg-ink/95 shadow-[0_1px_0_rgb(255_255_255/0.08)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      {/* voile de lisibilité au-dessus du hero */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-black/60 to-transparent transition-opacity duration-500 ${
          solid ? "opacity-0" : "opacity-100"
        }`}
      />
      <div className={`wrap flex items-center justify-between gap-6 transition-[height] duration-500 ${solid ? "h-16" : "h-20 lg:h-24"}`}>
        <Link href="/" className="shrink-0" aria-label={`${site.name} — accueil`}>
          <Logo className={`w-auto transition-[height] duration-500 ${solid ? "h-8" : "h-9 lg:h-11"}`} />
        </Link>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-1 xl:gap-2">
            {nav.slice(1).map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`group relative px-3 py-2 font-display text-[1.05rem] font-semibold uppercase tracking-[0.08em] transition-colors ${
                      active ? "text-white" : "text-white/80 hover:text-white"
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={`absolute inset-x-3 -bottom-0.5 h-[3px] origin-left -skew-x-[24deg] bg-red transition-transform duration-300 ${
                        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/nous-rejoindre/" className="btn btn-red hidden !min-h-11 sm:inline-flex">
            Rejoindre le club
          </Link>
          <button
            ref={buttonRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => (open ? close() : setOpen(true))}
          >
            {open ? <X aria-hidden size={28} /> : <Menu aria-hidden size={28} />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <div
        id="menu-mobile"
        hidden={!open}
        className="fixed inset-0 top-16 z-40 lg:hidden"
        onClick={(e) => {
          if (e.target === e.currentTarget) close(false);
        }}
      >
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="speed-lines animate-rise bg-ink flex max-h-[calc(100dvh-4rem)] flex-col overflow-y-auto border-t border-white/10 pb-8 [--delay:0ms]"
          style={{ animationDuration: "0.45s" }}
        >
          <nav aria-label="Navigation mobile" className="wrap pt-4">
            <ul>
              {nav.map((item, i) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href} className="border-b border-white/10">
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => close(false)}
                      className="flex items-center justify-between py-4 font-display text-3xl font-bold uppercase tracking-wide"
                    >
                      <span className="flex items-baseline gap-4">
                        <span aria-hidden className="text-sm font-semibold text-white/40">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className={active ? "text-white" : "text-white/85"}>{item.label}</span>
                      </span>
                      {active && <span aria-hidden className="h-1 w-8 -skew-x-[24deg] bg-red" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link href="/nous-rejoindre/" onClick={() => close(false)} className="btn btn-red mt-8 w-full">
              Rejoindre le club <ArrowRight aria-hidden size={18} />
            </Link>
            <p className="mt-6 text-sm text-white/60">
              Départs mercredi &amp; samedi à 13h30 — place de la Mairie, Puymoyen.
            </p>
          </nav>
        </div>
      </div>
    </header>
  );
}
