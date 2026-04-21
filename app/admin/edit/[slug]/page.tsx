import { notFound } from "next/navigation";
import { loadCustomMachines, loadMachineOverrides } from "@/lib/github";
import { seedMachines } from "@/data/machines";
import EditForm from "./EditForm";

export const dynamic = "force-dynamic";

export default async function EditPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // 1) Custom machine?
  const { machines } = await loadCustomMachines();
  const custom = machines.find((m) => m.slug === slug);
  if (custom) {
    return (
      <div className="container-wide py-8 max-w-3xl">
        <h1 className="font-display text-3xl font-bold text-white mb-1">
          Edit: {custom.name}
        </h1>
        <p className="text-ink-400 text-sm mb-8">
          Admin-created machine. Changes commit to git for full history.
        </p>
        <EditForm
          source="custom"
          initial={{
            slug: custom.slug,
            name: custom.name,
            brand: custom.brand,
            type: custom.type,
            price: custom.price,
            image: custom.image,
            description: custom.description,
            cabinet: custom.cabinet,
            condition: custom.condition,
            inStock: custom.inStock,
            highlights: custom.highlights,
            status: custom.status,
          }}
          hidden={false}
          hasOverride={false}
        />
      </div>
    );
  }

  // 2) Seed machine with any override applied
  const seed = seedMachines.find((m) => m.slug === slug);
  if (!seed) notFound();
  const { overrides } = await loadMachineOverrides();
  const override = overrides.find((o) => o.slug === slug);
  const merged = { ...seed, ...(override?.patch || {}) };

  return (
    <div className="container-wide py-8 max-w-3xl">
      <h1 className="font-display text-3xl font-bold text-white mb-1">
        Edit: {merged.name}
      </h1>
      <p className="text-ink-400 text-sm mb-8">
        Inventory machine. Edits are saved as an override layer —
        {override ? " overrides active." : " click Reset to defaults anytime to restore."}
      </p>
      <EditForm
        source="seed"
        initial={{
          slug: seed.slug,
          name: merged.name,
          brand: merged.brand,
          type: merged.type,
          price: merged.price,
          image: merged.image,
          description: merged.description,
          cabinet: merged.cabinet,
          condition: merged.condition,
          inStock: merged.inStock,
          highlights: merged.highlights,
          status: "published",
        }}
        hidden={override?.hidden === true}
        hasOverride={Boolean(override)}
        seedDefaults={{
          name: seed.name,
          price: seed.price,
          image: seed.image,
          description: seed.description,
        }}
      />
    </div>
  );
}
