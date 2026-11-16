import { withBase } from "@/lib/format";

/** Logo officiel (détouré depuis l'original sur fond noir) — à utiliser sur fond sombre. */
export function Logo({ className = "h-9 w-auto" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={withBase("/brand/logo-ccp-puymoyen.webp")}
      alt="Cyclo Club de Puymoyen"
      width={520}
      height={134}
      className={className}
      decoding="async"
    />
  );
}
