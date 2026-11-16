import { partners } from "@/data/partners";
import { withBase } from "@/lib/format";

export function PartnerGrid({ detailed = false }: { detailed?: boolean }) {
  return (
    <ul className={`grid gap-px border border-stone-2 bg-stone-2 ${detailed ? "sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-6"}`}>
      {partners.map((p, i) => {
        const logo = (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={withBase(p.logo)}
            alt={`Logo ${p.name}`}
            loading="lazy"
            decoding="async"
            width={240}
            height={140}
            className="h-full max-h-24 w-auto max-w-full object-contain transition duration-500 group-hover:scale-[1.04]"
          />
        );
        return (
          <li key={p.name} className="group bg-white" data-reveal style={{ ["--delay" as string]: `${(i % 6) * 60}ms` }}>
            <div className={`flex flex-col ${detailed ? "h-full p-6" : "p-4"}`}>
              <div className={`flex items-center justify-center ${detailed ? "h-36 bg-stone p-6" : "h-28 p-2"}`}>
                {p.url ? (
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="flex h-full items-center justify-center" aria-label={`${p.name} (site web, nouvel onglet)`}>
                    {logo}
                  </a>
                ) : (
                  logo
                )}
              </div>
              {detailed ? (
                <div className="mt-5">
                  <h3 className="font-display text-2xl font-bold uppercase">{p.name}</h3>
                  <p className="mt-2 text-mute">{p.description}</p>
                  {p.url && (
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="link mt-3 inline-block text-sm font-medium">
                      Visiter le site<span className="sr-only"> de {p.name} (nouvel onglet)</span>
                    </a>
                  )}
                </div>
              ) : (
                <p className="mt-2 text-center text-xs font-medium uppercase tracking-wider text-mute">{p.name}</p>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
