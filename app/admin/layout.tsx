import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { LogOut, LayoutDashboard, Plus, History, MessageSquare, Settings, Home } from "lucide-react";
import LogoutButton from "./LogoutButton";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-ink-950">
      <div className="border-b border-ink-800 bg-ink-900/40">
        <div className="container-wide flex items-center justify-between h-14">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="font-display font-bold text-white flex items-center gap-2">
              <Image src="/logo.png" alt="" width={64} height={64} className="h-8 w-8 rounded object-cover" />
              Admin
            </Link>
            <nav className="flex items-center gap-5 text-sm text-ink-300 flex-wrap">
              <Link href="/admin" className="hover:text-brand-300 flex items-center gap-1.5"><LayoutDashboard className="h-4 w-4" /> Dashboard</Link>
              <Link href="/admin/new" className="hover:text-brand-300 flex items-center gap-1.5"><Plus className="h-4 w-4" /> Add Machine</Link>
              <Link href="/admin/chat" className="hover:text-brand-300 flex items-center gap-1.5"><MessageSquare className="h-4 w-4" /> Chat</Link>
              <Link href="/admin/homepage" className="hover:text-brand-300 flex items-center gap-1.5"><Home className="h-4 w-4" /> Homepage</Link>
              <Link href="/admin/site-settings" className="hover:text-brand-300 flex items-center gap-1.5"><Settings className="h-4 w-4" /> Site</Link>
              <Link href="/admin/history" className="hover:text-brand-300 flex items-center gap-1.5"><History className="h-4 w-4" /> History</Link>
            </nav>
          </div>
          <LogoutButton />
        </div>
      </div>
      {children}
    </div>
  );
}
