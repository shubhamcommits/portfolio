import { redirect } from "next/navigation";
import { Suspense } from "react";
import { getAdminSession, isAdminConfigured } from "@/lib/admin-auth";
import { LoginForm } from "./login-form";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (!isAdminConfigured()) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-semibold mb-3">Admin not configured</h1>
          <p className="text-neutral-400 text-sm">
            Set <code className="text-cyan-400">ADMIN_EMAIL</code> and{" "}
            <code className="text-cyan-400">ADMIN_SECRET</code> environment variables to enable.
          </p>
        </div>
      </main>
    );
  }

  const existing = await getAdminSession();
  if (existing) redirect("/admin");

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold mb-2">Admin sign-in</h1>
        <p className="text-neutral-400 text-sm mb-8">
          We&apos;ll email a one-time link to the admin address.
        </p>
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
