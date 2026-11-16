"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  authConfigured,
  clearFailures,
  createSession,
  destroySession,
  recordFailure,
  tooManyAttempts,
  verifyCredentials,
} from "@/lib/auth";

export type LoginState = { error?: string; email?: string };

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!authConfigured()) return { error: "L'espace membres n'est pas encore activé. Contactez le bureau du club.", email };
  if (!email || !password) return { error: "Indiquez votre e-mail et votre mot de passe.", email };

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0].trim() || h.get("x-real-ip") || "local";
  if (tooManyAttempts(ip)) return { error: "Trop de tentatives. Réessayez dans 15 minutes.", email };

  const member = await verifyCredentials(email, password);
  if (!member) {
    recordFailure(ip);
    return { error: "E-mail ou mot de passe incorrect.", email };
  }
  clearFailures(ip);
  await createSession(member);
  redirect("/espace-membre/");
}

export async function logout() {
  await destroySession();
  redirect("/connexion/?deconnecte=1");
}
