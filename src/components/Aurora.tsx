import { cn } from "@/lib/utils";

/** Soft, drifting aurora glow used behind hero / feature moments. */
export function Aurora({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div
        className="absolute left-1/2 top-[-18%] h-[55vh] w-[85vw] -translate-x-1/2 rounded-full opacity-25 blur-[120px] animate-aurora-drift dark:opacity-40"
        style={{ background: "radial-gradient(closest-side, hsl(var(--aurora-teal)), transparent)" }}
      />
      <div
        className="absolute left-[10%] top-[0%] h-[42vh] w-[48vw] rounded-full opacity-20 blur-[120px] animate-aurora-drift-2 dark:opacity-30"
        style={{ background: "radial-gradient(closest-side, hsl(var(--aurora-cyan)), transparent)" }}
      />
      <div
        className="absolute right-[6%] top-[-6%] h-[48vh] w-[42vw] rounded-full opacity-20 blur-[130px] animate-aurora-drift dark:opacity-30"
        style={{ background: "radial-gradient(closest-side, hsl(var(--aurora-violet)), transparent)" }}
      />
    </div>
  );
}
