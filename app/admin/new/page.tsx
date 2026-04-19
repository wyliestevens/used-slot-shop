import MachineForm from "./MachineForm";

export const dynamic = "force-dynamic";

export default function NewMachinePage() {
  return (
    <div className="container-wide py-8 max-w-3xl">
      <h1 className="font-display text-3xl font-bold text-white mb-1">Add Machine</h1>
      <p className="text-ink-400 text-sm mb-8">
        Upload a photo, fill in the details, save as draft. Publish when ready.
      </p>
      <MachineForm />
    </div>
  );
}
