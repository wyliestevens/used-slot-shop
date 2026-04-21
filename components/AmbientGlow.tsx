// Fixed-position decorative glow that sits behind the whole site. Stays put
// as the user scrolls so every page feels warm — coral in the upper right,
// sage mint in the lower left, matching the logo palette.
export default function AmbientGlow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute -top-40 -right-32 h-[60vh] w-[60vh] rounded-full bg-brand-500/35 blur-3xl" />
      <div className="absolute -bottom-40 -left-32 h-[55vh] w-[55vh] rounded-full bg-accent-500/35 blur-3xl" />
    </div>
  );
}
