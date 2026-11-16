"use client";

import { useActionState } from "react";
import { Loader2, LogIn } from "lucide-react";
import { login, type LoginState } from "@/app/connexion/actions";

export function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, {});
  const field =
    "mt-2 block w-full border border-ink/20 bg-white px-4 py-3 text-base outline-none transition focus:border-ink focus:ring-2 focus:ring-red/40";
  return (
    <form action={action} className="space-y-5" noValidate>
      {state.error && (
        <p role="alert" className="border-l-4 border-red bg-stone p-4 text-sm font-medium">
          {state.error}
        </p>
      )}
      <div>
        <label htmlFor="login-email" className="font-medium">E-mail</label>
        <input id="login-email" name="email" type="email" required autoComplete="username" defaultValue={state.email} className={field} />
      </div>
      <div>
        <label htmlFor="login-password" className="font-medium">Mot de passe</label>
        <input id="login-password" name="password" type="password" required autoComplete="current-password" className={field} />
      </div>
      <button type="submit" className="btn btn-red w-full" disabled={pending}>
        {pending ? <Loader2 aria-hidden size={18} className="animate-spin" /> : <LogIn aria-hidden size={18} />}
        {pending ? "Connexion…" : "Se connecter"}
      </button>
    </form>
  );
}
