import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
  container?: boolean;
}

export function Section({
  id,
  className,
  containerClassName,
  children,
  container = true,
}: SectionProps) {
  return (
    <section id={id} className={cn("py-20 sm:py-24 lg:py-28", className)}>
      {container ? (
        <div className={cn("container", containerClassName)}>{children}</div>
      ) : (
        children
      )}
    </section>
  );
}

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary",
        className
      )}
    >
      <span className="h-px w-6 bg-primary/60" aria-hidden />
      {children}
    </span>
  );
}
