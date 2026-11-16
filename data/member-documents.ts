/**
 * Documents réservés aux membres (téléchargeables uniquement après connexion).
 * Les fichiers sont rangés dans le dossier private/ : ils ne sont JAMAIS publiés
 * comme fichiers statiques. Pour ajouter un document : déposer le fichier dans
 * private/ puis ajouter une entrée ci-dessous (id unique, en minuscules).
 */
export type MemberDocument = {
  id: string;
  title: string;
  description: string;
  file: string; // nom du fichier dans private/
  downloadName: string;
  mime: string;
  size: string;
};

export const memberDocuments: MemberDocument[] = [
  {
    id: "parcours-2026",
    title: "Parcours CCP 2026",
    description: "Calendrier officiel des sorties du samedi (groupes CCP1 et CCP2), version 1.0 du 5 janvier 2026 — 13 pages.",
    file: "parcours-ccp-2026.pdf",
    downloadName: "Parcours-CCP-2026.pdf",
    mime: "application/pdf",
    size: "119 Ko",
  },
];
