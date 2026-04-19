import { notFound } from "next/navigation";
import Link from "next/link";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/Section";
import { states, getState } from "@/data/states";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return states.map((s) => ({ state: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  const s = getState(state);
  if (!s) return {};
  return buildMetadata({
    title: `Is It Legal to Own a Slot Machine in ${s.name}?`,
    description: `${s.summary} Full rules, age restrictions, and buying guidance for ${s.name} residents.`,
    path: `/state-legality/${s.slug}`,
  });
}

export default async function StatePage({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  const s = getState(state);
  if (!s) notFound();
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "State Legality", path: "/state-legality" },
          { name: s.name, path: `/state-legality/${s.slug}` },
        ])}
      />
      <Section
        eyebrow="State Guide"
        title={`Slot machine ownership in ${s.name}`}
        subtitle={s.summary}
      >
        <div className="max-w-3xl">
          <div className="card p-6 mb-8">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs uppercase tracking-wider text-ink-400 mb-1">Rule</div>
                <div className="font-semibold text-white">{s.rule}</div>
              </div>
              {s.minAge && (
                <div>
                  <div className="text-xs uppercase tracking-wider text-ink-400 mb-1">Minimum age</div>
                  <div className="font-semibold text-white">{s.minAge}</div>
                </div>
              )}
            </div>
          </div>

          <div className="prose-slot">
            <h2>What this means for you</h2>
            <p>
              {s.status === "allowed-all" &&
                `${s.name} is one of the most permissive states for private slot machine ownership — you can buy any era of machine, including modern multi-denomination video slots, without age restrictions.`}
              {s.status === "age-restricted" &&
                `In ${s.name}, you can legally own a slot machine as long as it meets the minimum age requirement (${s.minAge}). Modern casino machines typically won't qualify — focus on vintage or antique classics. Buyers are responsible for verifying machine age at the time of purchase.`}
              {s.status === "class-ii-only" &&
                `${s.name} allows ownership of Class II slot machines (bingo-based) but not Class III (traditional casino slots with a random number generator). Call our sales team before purchasing to confirm compliance.`}
              {s.status === "prohibited" &&
                `Private ownership of slot machines is currently prohibited in ${s.name}. We do not ship functional slot machines to ${s.name} addresses. If you're a licensed operator or collector with a state-issued exemption, contact us for documentation requirements.`}
              {s.status === "restricted" &&
                `${s.name} has special licensing or county-level restrictions. Please contact a local attorney or our sales team — we'll help verify requirements before shipping.`}
            </p>
            <p>
              This page is a general reference and not legal advice. Laws change; consult a
              licensed attorney in your state for binding guidance.
            </p>

            {s.status !== "prohibited" && (
              <>
                <h2>Ready to buy?</h2>
                <p>
                  We ship to {s.name} weekly. Browse{" "}
                  <Link href="/shop">our full inventory</Link> or call{" "}
                  <a href={site.phoneHref}>{site.phone}</a> for a personal recommendation.
                </p>
              </>
            )}
          </div>

          <div className="mt-10">
            <Link href="/state-legality" className="btn-ghost">← All 50 states</Link>
          </div>
        </div>
      </Section>
    </>
  );
}
