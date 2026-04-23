import type { Metadata } from "next";
import ChangePasswordForm from "./ChangePasswordForm";

export const metadata: Metadata = {
  title: "Change Password — Admin",
  robots: { index: false, follow: false },
};

export default function ChangePasswordPage() {
  return (
    <div className="container-pad mx-auto max-w-md pt-20 pb-24">
      <h1 className="text-2xl font-display mb-2 text-ink-50">Set a new password</h1>
      <p className="text-ink-300 mb-6">
        You must change the default password before continuing. Minimum 8 characters.
      </p>
      <ChangePasswordForm forced />
    </div>
  );
}
