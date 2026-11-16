# Cyclo Club de Puymoyen — site web (V1 de la refonte)

Site vitrine du Cyclo Club de Puymoyen (« les Rouges et Blancs »), club cycliste UFOLEP fondé en 1985 près d'Angoulême.
Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · hébergé sur **Vercel**. Les pages publiques sont pré-générées ; un **espace membres** protégé (connexion + téléchargement des parcours) s'exécute côté serveur.

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

`npm run build` génère d'abord les images optimisées puis lance `next build`. `npm run lint` lance le contrôle TypeScript.
Pour tester l'espace membres en local, copier `.env.example` en `.env.local` et le compléter (voir « Espace membres »).

## Structure

```
app/            pages (accueil, le-club, sorties, actualites, galerie, partenaires, nous-rejoindre, mentions-legales), sitemap, robots
sections/home/  sections de la page d'accueil
components/     composants réutilisables (header, footer, galerie/lightbox, calendrier, formulaire…)
data/           CONTENUS ÉDITABLES (voir ci-dessous)
lib/            utilitaires (SEO, dates, calendrier, loader d'images, polices)
assets/photos/  photos originales (non publiées telles quelles)
public/         fichiers publiés : logos, partenaires, images générées (public/img)
private/        documents RÉSERVÉS AUX MEMBRES (jamais publiés en accès direct)
scripts/        optimisation des images, redirections, contrôle des liens
styles/         design system (tokens de couleur, typographie, motifs, animations)
```

## Modifier les contenus

Tous les contenus sont dans `data/` : il suffit d'éditer le fichier, puis de relancer `npm run build`.

| Je veux… | Fichier |
| --- | --- |
| Ajouter une actualité | `data/news.ts` — copier un bloc, changer `slug` (unique), `date` (AAAA-MM-JJ), `title`, `excerpt`, `cover`, `body` |
| Mettre à jour le calendrier des samedis | `data/sorties-2026.json` (une entrée par parcours : date, groupes, nom, km, D+, itinéraire — consultation publique, aucun lien de tracé) + déposer le PDF dans `private/` et le déclarer dans `data/member-documents.ts` |
| Modifier horaires, adresse, réseaux sociaux, e-mail | `data/site.ts` |
| Ajouter / retirer un partenaire | `data/partners.ts` + logo dans `public/partners/` |
| Ajouter une photo | déposer le fichier dans `assets/photos/` (nom en minuscules avec tirets), l'ajouter dans `data/media.ts` avec son texte alternatif, puis éventuellement dans `data/gallery.ts` |
| Modifier l'historique ou le règlement | `data/history.ts` |
| Ajouter une redirection d'ancienne URL | `data/redirects.json` |

**Nouveau calendrier (2027…)** : créer `data/sorties-2027.json` sur le même modèle et remplacer l'import en tête de `lib/sorties.ts`. Le bloc « prochaines sorties » se met à jour tout seul dans le navigateur d'après la date du jour : inutile de republier chaque semaine. Si aucune sortie n'est à venir, un message l'indique honnêtement.

Les photos sont converties automatiquement en WebP (480, 828, 1200 et 1920 px) dans `public/img/` ; ce dossier est régénéré à chaque build.

## Formulaire de contact

Le site n'envoie pas d'e-mail lui-même. Le formulaire est prêt, mais **il ne s'affiche que s'il est relié à un service d'envoi** (gratuits pour un petit volume : Formspree, Web3Forms, Basin…).
1. Créer un formulaire chez l'un de ces services avec l'adresse e-mail du club.
2. Indiquer l'URL d'envoi fournie dans un fichier `.env.local` (et dans les variables de l'hébergeur) :

```bash
NEXT_PUBLIC_CONTACT_ENDPOINT=https://formspree.io/f/votre-identifiant
```

Sans cette variable, la page « Nous rejoindre » propose à la place le contact via Facebook et le rendez-vous au départ des sorties (aucun faux formulaire).

## Espace membres

Les parcours ne sont **pas téléchargeables publiquement** : la page « Nos sorties » permet seulement de les consulter (prochain samedi mis en avant, calendrier, itinéraires), sans PDF ni tracé. Le document officiel est téléchargeable uniquement dans l'espace membres (`/espace-membre/`), après connexion.

- Les fichiers réservés sont dans `private/` et listés dans `data/member-documents.ts` ; ils ne sont servis que par une route qui vérifie la session (`401` sinon).
- Les comptes sont créés par le bureau (pas d'inscription libre). Les mots de passe sont stockés hachés (bcrypt), jamais en clair.
- La session dure 30 jours (cookie `httpOnly`, signé). Retirer un membre de la liste coupe son accès immédiatement.
- Les tentatives de connexion sont limitées (8 échecs par adresse IP et par 15 minutes).

**Comptes membres** : ils sont enregistrés dans `data/members.json` (e-mail, nom, mot de passe haché — jamais en clair). Aucune configuration Vercel n'est nécessaire : la connexion fonctionne dès le déploiement.

Ajouter ou modifier un membre (sur un ordinateur où le projet est installé) :

```bash
npm run membre:ajouter -- prenom.nom@exemple.fr "Prénom Nom"
```

```bash
git add data/members.json && git commit -m "Ajout membre" && git push
```

Le script demande un mot de passe (ou en génère un si on laisse vide), puis Vercel redéploie automatiquement après le `git push`. Pour retirer un membre, supprimer son bloc dans `data/members.json` et pousser. Le fichier peut aussi être modifié directement sur GitHub.

Recommandé : définir dans Vercel une variable `AUTH_SECRET` (clé aléatoire de 32 caractères ou plus) pour signer les sessions ; sans elle, une clé dérivée des comptes est utilisée. La variable `MEMBERS` (même format JSON) reste acceptée en complément du fichier.

Limites de cette V1, sans base de données : pas de « mot de passe oublié » ni de changement de mot de passe par le membre (le bureau en refixe un avec le script). Pour une gestion autonome des comptes, prévoir un service d'authentification (Clerk, Supabase Auth…).

## Déploiement (Vercel)

Importer le dépôt GitHub dans Vercel sans changer les réglages (préréglage Next.js détecté). Chaque push sur `main` redéploie le site.

| Variable | Rôle | Obligatoire |
| --- | --- | --- |
| `AUTH_SECRET` | clé de signature des sessions membres | recommandé |
| `MEMBERS` | comptes membres supplémentaires (JSON) | non (comptes dans `data/members.json`) |
| `NEXT_PUBLIC_CONTACT_ENDPOINT` | service d'envoi du formulaire de contact | non (formulaire masqué) |
| `NEXT_PUBLIC_SITE_URL` | URL publique (canonical, sitemap, Open Graph) | non (défaut `https://www.ccpuymoyen.com`) |

Les redirections permanentes des anciennes URL (codes 308, équivalent 301 pour les moteurs de recherche) sont déclarées dans `data/redirects.json` et appliquées par `next.config.ts`. Ajouter le domaine `www.ccpuymoyen.com` dans *Settings → Domains*.

Le site n'est plus compatible avec un hébergement purement statique (GitHub Pages, FTP) à cause de l'espace membres.

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
- Contrôle des liens : 0 lien interne cassé (mesure faite sur la version statique initiale).
- Espace membres testé de bout en bout : refus d'un mauvais mot de passe, connexion, téléchargement du PDF, déconnexion, puis refus du téléchargement (401). Le PDF n'est accessible à aucune URL publique.
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
