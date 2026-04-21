import { loadContent } from "@/lib/content";
import SettingsForm from "./SettingsForm";

export const dynamic = "force-dynamic";

export default async function SiteSettingsPage() {
  const { content } = await loadContent<any>("site");
  return (
    <div className="container-wide py-8 max-w-2xl">
      <h1 className="font-display text-3xl font-bold text-white mb-1">Site Settings</h1>
      <p className="text-ink-400 text-sm mb-8">
        Logo, phone, email, address, hours. Saves commit to git and redeploy the public site.
      </p>
      <SettingsForm initial={content} />
    </div>
  );
}
