/**
 * Espace membres — authentification sans base de données.
 *
 * - Les comptes sont dans data/members.json (et, en option, dans la variable
 *   d'environnement MEMBERS, même format). Mots de passe hachés (bcrypt), jamais en clair.
 *   Ajouter un membre : npm run membre:ajouter -- prenom.nom@exemple.fr "Prénom Nom"
 *   puis commiter/pousser : Vercel redéploie automatiquement.
 * - La session est un jeton signé (HS256) stocké dans un cookie httpOnly. Clé :
 *   AUTH_SECRET si elle est définie (recommandé), sinon une clé dérivée des
 *   hachages des comptes. Retirer un membre invalide immédiatement son accès.
 *
 * Ce module ne doit être importé que côté serveur.
 */
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { createHash } from "node:crypto";
import fileMembers from "@/data/members.json";

export type Member = { email: string; name: string; hash: string };
export type Session = { email: string; name: string };

const COOKIE = "ccp_membre";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 jours

function normalize(list: unknown): Member[] {
  if (!Array.isArray(list)) return [];
  return (list as Member[])
    .filter((m) => m && typeof m.email === "string" && typeof m.hash === "string" && m.hash.startsWith("$2"))
    .map((m) => ({ email: m.email.trim().toLowerCase(), name: (m.name || m.email).trim(), hash: m.hash }));
}

export function loadMembers(): Member[] {
  let fromEnv: Member[] = [];
  const raw = process.env.MEMBERS?.trim();
  if (raw) {
    try {
      // tolère une valeur collée entre guillemets simples
      fromEnv = normalize(JSON.parse(raw.replace(/^'(.*)'$/s, "$1")));
    } catch {
      console.error("[auth] variable MEMBERS ignorée : JSON invalide");
    }
  }
  // la variable d'environnement est prioritaire en cas de doublon d'e-mail
  const byEmail = new Map<string, Member>();
  for (const m of [...normalize(fileMembers), ...fromEnv]) byEmail.set(m.email, m);
  return [...byEmail.values()];
}

function secretKey() {
  const s = process.env.AUTH_SECRET?.trim();
  if (s && s.length >= 32) return new TextEncoder().encode(s);
  // Repli sans configuration : clé dérivée des hachages des comptes (connus seulement
  // du dépôt privé et de l'hébergeur). Définir AUTH_SECRET reste recommandé.
  const members = loadMembers();
  if (!members.length) return null;
  const seed = "ccp-session-v1:" + members.map((m) => m.hash).sort().join("|");
  return new Uint8Array(createHash("sha256").update(seed).digest());
}

/** L'espace membres est-il utilisable (clé de session + au moins un compte) ? */
export function authConfigured() {
  return Boolean(secretKey()) && loadMembers().length > 0;
}

// Hachage factice : la vérification prend le même temps que l'e-mail existe ou non.
const DUMMY_HASH = "$2b$12$S9TmWGZFit6R0K3ciSrWcea5UAZ3cQj1B3aPBe2Chvb.PIhF5lq6u";

export async function verifyCredentials(email: string, password: string): Promise<Member | null> {
  const member = loadMembers().find((m) => m.email === email.trim().toLowerCase());
  const ok = await bcrypt.compare(password, member?.hash ?? DUMMY_HASH);
  return member && ok ? member : null;
}

export async function createSession(member: Member) {
  const key = secretKey();
  if (!key) throw new Error("AUTH_SECRET manquant");
  const token = await new SignJWT({ name: member.name })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(member.email)
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(key);
  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function getSession(): Promise<Session | null> {
  const key = secretKey();
  const token = (await cookies()).get(COOKIE)?.value;
  if (!key || !token) return null;
  try {
    const { payload } = await jwtVerify(token, key, { algorithms: ["HS256"] });
    const email = payload.sub;
    // le compte doit toujours exister (révocation immédiate)
    const member = loadMembers().find((m) => m.email === email);
    return member ? { email: member.email, name: member.name } : null;
  } catch {
    return null;
  }
}

export async function destroySession() {
  (await cookies()).delete(COOKIE);
}

// Limitation simple des tentatives de connexion (par adresse IP, en mémoire de l'instance).
const attempts = new Map<string, { count: number; until: number }>();
export function tooManyAttempts(ip: string) {
  const a = attempts.get(ip);
  return Boolean(a && a.count >= 8 && a.until > Date.now());
}
export function recordFailure(ip: string) {
  const now = Date.now();
  const a = attempts.get(ip);
  if (!a || a.until < now) attempts.set(ip, { count: 1, until: now + 15 * 60_000 });
  else a.count++;
}
export function clearFailures(ip: string) {
  attempts.delete(ip);
}
