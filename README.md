# Cyclo Club de Puymoyen — site web (V1 de la refonte)

Site vitrine du Cyclo Club de Puymoyen (« les Rouges et Blancs »), club cycliste UFOLEP fondé en 1985 près d'Angoulême.
Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · export **100 % statique** (aucun serveur requis).

- Audit de l'ancien site : [`AUDIT_SITE_ACTUEL.md`](AUDIT_SITE_ACTUEL.md)
- Redirections des anciennes URL : [`PLAN_REDIRECTIONS.md`](PLAN_REDIRECTIONS.md)

## Installation et lancement

Prérequis : Node.js 20 ou plus récent.

```bash
npm install
```

```bash
npm run dev
```

Le site est alors disponible sur http://localhost:3000. Pour produire et tester la version publiable :

```bash
npm run build
```

```bash
npm start
```

`npm run build` enchaîne : génération des images optimisées → `next build` (dossier `out/`) → génération des redirections.
`npm run check:links` vérifie ensuite qu'aucun lien interne du dossier `out/` n'est cassé, et `npm run lint` lance le contrôle TypeScript.

## Structure

```
app/            pages (accueil, le-club, sorties, actualites, galerie, partenaires, nous-rejoindre, mentions-legales), sitemap, robots
sections/home/  sections de la page d'accueil
components/     composants réutilisables (header, footer, galerie/lightbox, calendrier, formulaire…)
data/           CONTENUS ÉDITABLES (voir ci-dessous)
lib/            utilitaires (SEO, dates, calendrier, loader d'images, polices)
assets/photos/  photos originales (non publiées telles quelles)
public/         fichiers publiés : logos, partenaires, PDF, images générées (public/img)
scripts/        optimisation des images, redirections, contrôle des liens
styles/         design system (tokens de couleur, typographie, motifs, animations)
```

## Modifier les contenus

Tous les contenus sont dans `data/` : il suffit d'éditer le fichier, puis de relancer `npm run build`.

| Je veux… | Fichier |
| --- | --- |
| Ajouter une actualité | `data/news.ts` — copier un bloc, changer `slug` (unique), `date` (AAAA-MM-JJ), `title`, `excerpt`, `cover`, `body` |
| Mettre à jour le calendrier des samedis | `data/sorties-2026.json` (une entrée par parcours : date, groupes, nom, km, D+, lien Garmin, itinéraire) + déposer le PDF dans `public/documents/` |
| Modifier horaires, adresse, réseaux sociaux, e-mail | `data/site.ts` |
| Ajouter / retirer un partenaire | `data/partners.ts` + logo dans `public/partners/` |
| Ajouter une photo | déposer le fichier dans `assets/photos/` (nom en minuscules avec tirets), l'ajouter dans `data/media.ts` avec son texte alternatif, puis éventuellement dans `data/gallery.ts` |
| Modifier l'historique ou le règlement | `data/history.ts` |
| Ajouter une redirection d'ancienne URL | `data/redirects.json` |

**Nouveau calendrier (2027…)** : créer `data/sorties-2027.json` sur le même modèle et remplacer l'import en tête de `lib/sorties.ts`. Le bloc « prochaines sorties » se met à jour tout seul dans le navigateur d'après la date du jour : inutile de republier chaque semaine. Si aucune sortie n'est à venir, un message l'indique honnêtement.

Les photos sont converties automatiquement en WebP (480, 828, 1200 et 1920 px) dans `public/img/` ; ce dossier est régénéré à chaque build.

## Formulaire de contact

Un site statique ne peut pas envoyer d'e-mail lui-même. Le formulaire est prêt, mais **il ne s'affiche que s'il est relié à un service d'envoi** (gratuits pour un petit volume : Formspree, Web3Forms, Basin…).
1. Créer un formulaire chez l'un de ces services avec l'adresse e-mail du club.
2. Indiquer l'URL d'envoi fournie dans un fichier `.env.local` (et dans les variables de l'hébergeur) :

```bash
NEXT_PUBLIC_CONTACT_ENDPOINT=https://formspree.io/f/votre-identifiant
```

Sans cette variable, la page « Nous rejoindre » propose à la place le contact via Facebook et le rendez-vous au départ des sorties (aucun faux formulaire).

## Déploiement

Le dossier `out/` contient tout le site. Variables d'environnement utiles :

| Variable | Rôle | Défaut |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL publique (canonical, sitemap, Open Graph) | `https://www.ccpuymoyen.com` |
| `NEXT_PUBLIC_BASE_PATH` | sous-dossier de publication (ex. `/ccp-puymoyen` pour un site GitHub Pages de projet) | vide |
| `NEXT_PUBLIC_CONTACT_ENDPOINT` | service d'envoi du formulaire | vide (formulaire masqué) |

**Vercel** : importer le dépôt GitHub dans Vercel, sans rien changer aux réglages (le préréglage Next.js est détecté, l'export statique aussi). Les redirections 301 des anciennes URL sont déclarées dans `vercel.json`, généré à partir de `data/redirects.json` : après toute modification de ce fichier, lancer `npm run redirects:vercel` puis commiter. Ajouter ensuite le domaine `www.ccpuymoyen.com` dans *Settings → Domains* et les variables d'environnement (`NEXT_PUBLIC_CONTACT_ENDPOINT`…) dans *Settings → Environment Variables*.

**Autres hébergeurs : Netlify ou Cloudflare Pages** (gratuits, HTTPS, vraies redirections 301 via `out/_redirects`). Commande de build `npm run build`, dossier publié `out`.

**Hébergement mutualisé Apache (OVH, o2switch…)** : envoyer le contenu de `out/` (y compris le fichier caché `.htaccess`) par FTP.

**GitHub Pages** : compatible (un fichier `.nojekyll` est généré). Publier `out/` via une GitHub Action ; avec un domaine personnalisé (`www.ccpuymoyen.com`), laisser `NEXT_PUBLIC_BASE_PATH` vide. Limite : pas de redirection 301 serveur, les anciennes URL utilisent des pages de redirection HTML.

Avant la bascule : récupérer la gestion du domaine `ccpuymoyen.com` auprès d'e-monsite, puis seulement ensuite résilier l'ancien site.

## Qualité — mesures réalisées le 16/11/2026

Mesurées sur le build de production servi localement (gzip), Lighthouse 12 :

| Page | Perf. mobile | Perf. desktop | Accessibilité | Bonnes pratiques | SEO | LCP mobile (simulé) | LCP desktop | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Accueil | 89–92 | 95 | 100 | 100 | 100 | 3,1–3,8 s | 0,8 s | 0 |
| Nos sorties | 91 | 100 | 100 | 100 | 100 | 3,4 s | 0,7 s | 0 |
| Article | 91 | 100 | 100 | 100 | 100 | 3,4 s | 0,6 s | 0 |
| Nous rejoindre | 91 | 100 | 100 | 100 | 100 | 3,2 s | 0,6 s | 0 |

- axe-core (WCAG 2.0/2.1/2.2 A et AA) : **0 violation** sur les 11 gabarits de pages testés.
- Aucun débordement horizontal à 390 px sur toutes les pages ; menu mobile (Échap, clic extérieur, piège de focus) et lightbox (flèches, Échap, retour du focus) testés au clavier.
- Contrôle des liens : 0 lien interne cassé.
- **Objectif non atteint** : LCP mobile < 2,5 s en simulation Lighthouse (3G/4G lente + CPU ralenti ×4). Le temps est surtout passé à exécuter le socle JavaScript React/Next (~190 Ko gzip). À mesurer en conditions réelles après mise en ligne (Search Console / PageSpeed Insights) ; pistes : alléger encore les composants client, ou servir l'image hero en AVIF.
- INP non mesurable en laboratoire (nécessite des données terrain).

## Éléments à confirmer par le club

Les données manquantes ne sont **pas inventées** : elles sont masquées ou signalées « à confirmer ».

- E-mail de contact / service d'envoi du formulaire (`data/site.ts`).
- Adresses des comptes Instagram et YouTube (`data/site.ts`).
- Tarifs d'adhésion (signalés « à confirmer » dans la FAQ).
- Nombre de licenciés (40 ou 50 selon les sources).
- Mentions légales : RNA, directeur·rice de publication, hébergeur (`data/site.ts` → `legal`).
- Accord de réutilisation des photos, logo vectoriel, logos partenaires en haute définition, site web d'ADB Bâtiment.
- Dates de publication exactes de 7 anciens articles (affichées sous forme approximative, ex. « Printemps 2024 »).
