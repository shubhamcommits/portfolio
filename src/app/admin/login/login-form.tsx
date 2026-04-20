"use client";

import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";

const ERROR_MESSAGES: Record<string, string> = {
  invalid_token: "That link is invalid.",
  unknown_token: "That link doesn't match any pending request.",
  token_used: "That link has already been used. Request a new one.",
  token_expired: "That link expired. Request a new one.",
  not_admin: "You're not authorized.",
  lookup_failed: "Something went wrong. Try again.",
  mark_used_failed: "Something went wrong. Try again.",
  db_not_configured: "Database isn't configured yet.",
};

export function LoginForm() {
  const searchParams = useSearchParams();
  const initialError = searchParams?.get("error") ?? null;
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState<string>(
    initialError ? ERROR_MESSAGES[initialError] ?? "Sign-in failed." : ""
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setMessage("");

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        setState("error");
        setMessage("Couldn't send the link. Try again.");
        return;
      }
      setState("sent");
      setMessage("If that's the admin address, check your inbox.");
    } catch {
      setState("error");
      setMessage("Network error. Try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="email"
        type="email"
        required
        placeholder="you@example.com"
        autoComplete="email"
        disabled={state === "sending" || state === "sent"}
        className="w-full bg-white/5 border border-white/10 focus:border-cyan-500/60 outline-none rounded-md px-3 py-2 text-sm text-white placeholder-neutral-500 disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={state === "sending" || state === "sent"}
        className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold rounded-md py-2 disabled:opacity-50"
      >
        {state === "sending" ? "Sending..." : state === "sent" ? "Sent" : "Send sign-in link"}
      </button>
      {message && (
        <p className={`text-xs ${state === "sent" ? "text-cyan-400" : "text-neutral-400"}`}>
          {message}
        </p>
      )}
    </form>
  );
}
