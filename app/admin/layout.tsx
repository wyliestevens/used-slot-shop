import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  LayoutDashboard,
  Plus,
  History,
  MessageSquare,
  Settings,
  Home,
  Newspaper,
  Image as ImageIcon,
  FileText,
  UserCircle,
} from "lucide-react";
import LogoutButton from "./LogoutButton";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/chat", label: "Chat", icon: MessageSquare },
  { href: "/admin/new", label: "Add Machine", icon: Plus },
  { href: "/admin/blog", label: "Blog", icon: Newspaper },
  { href: "/admin/homepage", label: "Homepage", icon: Home },
  { href: "/admin/pages", label: "Pages", icon: FileText },
  { href: "/admin/images", label: "Images", icon: ImageIcon },
  { href: "/admin/site-settings", label: "Site", icon: Settings },
  { href: "/admin/history", label: "History", icon: History },
  { href: "/admin/account", label: "Account", icon: UserCircle },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-ink-950">
      <div className="border-b border-ink-800 bg-ink-900/40">
        <div className="container-wide flex items-center justify-between gap-4 py-3">
          <div className="flex items-center gap-6 min-w-0 flex-1">
            <Link
              href="/admin"
              className="font-display font-bold text-white flex items-center gap-2 flex-shrink-0"
            >
              <Image src="/logo.png" alt="" width={64} height={64} className="h-8 w-8 rounded object-cover" />
              Admin
            </Link>
            <nav className="flex items-center gap-4 text-sm text-ink-300 flex-wrap">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="hover:text-brand-300 flex items-center gap-1.5 whitespace-nowrap"
                >
                  <item.icon className="h-4 w-4" /> {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <LogoutButton />
        </div>
      </div>
      {children}
    </div>
  );
}
