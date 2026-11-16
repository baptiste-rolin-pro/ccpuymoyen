import { uniqueDestinations } from "@/lib/sorties";

/** Bandeau défilant : destinations réelles du calendrier 2026. */
export function DestinationsBand() {
  const list = uniqueDestinations().slice(0, 30);
  const Track = () => (
    <ul className="flex shrink-0 items-center">
      {list.map((d) => (
        <li key={d} className="flex items-center whitespace-nowrap px-6 font-display text-3xl font-bold uppercase tracking-wide sm:text-5xl">
          {d}
          <span aria-hidden className="ml-12 inline-block h-2 w-8 -skew-x-[24deg] bg-white/60" />
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-label="Destinations du calendrier 2026" className="on-dark overflow-hidden bg-red py-6 text-white sm:py-8">
      <p className="sr-only">Quelques destinations du calendrier 2026 : {list.join(", ")}.</p>
      <div className="marquee" aria-hidden>
        <div className="marquee-track flex w-max">
          <Track />
          <Track />
        </div>
      </div>
    </section>
  );
}
