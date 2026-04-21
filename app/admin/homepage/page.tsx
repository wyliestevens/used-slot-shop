import { loadContent } from "@/lib/content";
import HomepageForm from "./HomepageForm";

export const dynamic = "force-dynamic";

export default async function HomepagePage() {
  const { content } = await loadContent<any>("homepage");
  return (
    <div className="container-wide py-8 max-w-2xl">
      <h1 className="font-display text-3xl font-bold text-white mb-1">Homepage</h1>
      <p className="text-ink-400 text-sm mb-8">
        Hero image, headline, subtitle, buttons. Save & redeploy to push live.
      </p>
      <HomepageForm initial={content} />
    </div>
  );
}
