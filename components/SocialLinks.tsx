import { site } from "@/data/site";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "./icons";

const items = [
  { key: "facebook", label: "Facebook", Icon: FacebookIcon },
  { key: "instagram", label: "Instagram", Icon: InstagramIcon },
  { key: "youtube", label: "YouTube", Icon: YoutubeIcon },
] as const;

/** N'affiche que les réseaux dont l'adresse officielle est renseignée dans data/site.ts */
export function SocialLinks({ className = "" }: { className?: string }) {
  const links = items.filter((i) => site.social[i.key]);
  if (!links.length) return null;
  return (
    <ul className={`flex gap-2 ${className}`}>
      {links.map(({ key, label, Icon }) => (
        <li key={key}>
          <a
            href={site.social[key]!}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 border border-white/20 px-4 text-sm font-medium transition-colors hover:border-red hover:bg-red"
          >
            <Icon size={18} />
            <span>{label}</span>
            <span className="sr-only">(nouvel onglet)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
