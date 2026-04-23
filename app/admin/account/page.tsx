import type { Metadata } from "next";
import { loadCredentials } from "@/lib/auth";
import ChangePasswordForm from "../change-password/ChangePasswordForm";

export const metadata: Metadata = {
  title: "Account — Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const { creds } = await loadCredentials();
  return (
    <div className="container-pad mx-auto max-w-xl pt-16 pb-24 space-y-10">
      <div>
        <h1 className="text-2xl font-display mb-2 text-ink-50">Account</h1>
        <p className="text-ink-300">
          Signed in as <span className="font-mono text-ink-100">{creds.email}</span>.
        </p>
      </div>

      <section>
        <h2 className="text-lg font-medium text-ink-100 mb-3">Change password</h2>
        <ChangePasswordForm />
      </section>
    </div>
  );
}
