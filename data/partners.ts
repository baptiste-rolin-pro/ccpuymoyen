/**
 * Partenaires officiels — liste confirmée par l'article du 9 mars 2026
 * (« Mars 2026, un nouveau maillot… ») et la colonne « Nos partenaires Officiels »
 * de l'ancien site. Logos repris de l'ancien site.
 */
export type Partner = {
  name: string;
  logo: string;
  url: string | null;
  /** Fond du logo, pour l'intégrer proprement dans la grille */
  tone: "light" | "dark";
  description: string;
};

export const partners: Partner[] = [
  {
    name: "Eiffage Énergie Systèmes",
    logo: "/partners/eiffage-energie-systemes.jpg",
    url: "https://www.eiffageenergiesystemes.com/",
    tone: "light",
    description: "Partenaire officiel du club, présent sur le maillot.",
  },
  {
    name: "Berton Aluminium",
    logo: "/partners/berton-aluminium.jpg",
    url: "https://www.menuiserie-aluminium-berton.com/",
    tone: "dark",
    description: "Menuiserie aluminium, partenaire officiel du club.",
  },
  {
    name: "Bouticycle Angoulême",
    logo: "/partners/bouticycle.jpg",
    url: "https://bouticycle.com/-Angouleme-",
    tone: "light",
    description: "Magasin de cycles à Angoulême, partenaire officiel du club.",
  },
  {
    name: "Nuances Unikalo",
    logo: "/partners/nuances-unikalo.jpg",
    url: "https://unikalo.com/magasins/nuances-unikalo-angouleme/",
    tone: "dark",
    description: "Peintures — magasin d'Angoulême. Partenaire depuis 2026.",
  },
  {
    name: "ADB Bâtiment",
    logo: "/partners/adb-batiment.jpg",
    url: null, // aucun site web indiqué sur l'ancien site — à confirmer
    tone: "light",
    description: "Second œuvre : placo, peinture, carrelage. Partenaire depuis 2026.",
  },
  {
    name: "Ville de Puymoyen",
    logo: "/partners/ville-de-puymoyen.jpg",
    url: "https://www.puymoyen.fr/",
    tone: "light",
    description: "La municipalité soutient le club depuis ses débuts sur la commune.",
  },
];
