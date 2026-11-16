/**
 * Espace membres — authentification sans base de données.
 *
 * - Les comptes sont déclarés dans la variable d'environnement MEMBERS (JSON) :
 *     [{"email":"prenom.nom@exemple.fr","name":"Prénom","hash":"$2b$12$..."}]
 *   Les mots de passe ne sont jamais stockés en clair (hachage bcrypt).
 *   Générer une entrée : npm run membre:ajouter -- prenom.nom@exemple.fr "Prénom Nom"
 * - La session est un jeton signé (HS256, clé AUTH_SECRET) stocké dans un cookie
 *   httpOnly. Retirer un membre de MEMBERS invalide immédiatement son accès.
 *
 * Ce module ne doit être importé que côté serveur.
 */
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";

export type Member = { email: string; name: string; hash: string };
export type Session = { email: string; name: string };

const COOKIE = "ccp_membre";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 jours

function secretKey() {
  const s = process.env.AUTH_SECRET;
  return s && s.length >= 32 ? new TextEncoder().encode(s) : null;
}

export function loadMembers(): Member[] {
  const raw = process.env.MEMBERS;
  if (!raw) return [];
  try {
    const list = JSON.parse(raw) as Member[];
    return list
      .filter((m) => m && typeof m.email === "string" && typeof m.hash === "string" && m.hash.startsWith("$2"))
      .map((m) => ({ email: m.email.trim().toLowerCase(), name: (m.name || m.email).trim(), hash: m.hash }));
  } catch {
    console.error("[auth] variable MEMBERS invalide (JSON attendu)");
    return [];
  }
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
