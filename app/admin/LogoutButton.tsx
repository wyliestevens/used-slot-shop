"use client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }
  return (
    <button
      onClick={logout}
      className="flex items-center gap-1.5 text-sm text-ink-300 hover:text-brand-300"
    >
      <LogOut className="h-4 w-4" /> Sign out
    </button>
  );
}
