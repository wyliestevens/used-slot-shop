import { ReactNode } from "react";

export function Section({
  eyebrow,
  title,
  subtitle,
  children,
  center = false,
  className = "",
}: {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  children?: ReactNode;
  center?: boolean;
  className?: string;
}) {
  return (
    <section className={`py-16 sm:py-20 ${className}`}>
      <div className="container-wide">
        {(eyebrow || title || subtitle) && (
          <div className={`mb-12 ${center ? "text-center mx-auto max-w-2xl" : "max-w-3xl"}`}>
            {eyebrow && (
              <div className="text-xs uppercase tracking-[0.2em] text-brand-400 font-semibold mb-3">
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                {title}
              </h2>
            )}
            {subtitle && <p className="mt-4 text-ink-300 text-lg leading-relaxed">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
