import { Suspense } from "react";
import Image from "next/image";
import LoginForm from "./LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] grid place-items-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <Image
            src="/logo.png"
            alt="Used Slot Shop"
            width={96}
            height={96}
            priority
            className="h-20 w-20 rounded-xl mx-auto mb-4 object-cover"
          />
          <h1 className="font-display text-3xl font-bold text-white">Owner Login</h1>
          <p className="text-ink-400 mt-2 text-sm">
            Manage your inventory. Sign in with your admin password.
          </p>
        </div>
        <Suspense fallback={<div className="card p-6 text-ink-400 text-sm">Loading…</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
