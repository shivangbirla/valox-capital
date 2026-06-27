import { useId } from "react";
import { cn } from "@/lib/utils";

interface MarkProps {
  className?: string;
  gradient?: boolean;
}

export function LogoMark({ className, gradient = false }: MarkProps) {
  const id = useId();
  return (
    <svg
      viewBox="0 0 56 56"
      fill="none"
      stroke={gradient ? `url(#${id})` : "currentColor"}
      strokeWidth={1.5}
      aria-hidden="true"
      className={className}
    >
      {gradient && (
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="56" y2="56" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2BD9A8" />
            <stop offset="50%" stopColor="#22D3EE" />
            <stop offset="100%" stopColor="#8B7BF6" />
          </linearGradient>
        </defs>
      )}
      <rect x="2" y="2" width="52" height="52" />
      <line x1="2" y1="2" x2="54" y2="54" />
      <line x1="54" y1="2" x2="2" y2="54" />
    </svg>
  );
}

interface LogoProps {
  className?: string;
  markClassName?: string;
  wordmark?: boolean;
  gradient?: boolean;
}

export function Logo({
  className,
  markClassName,
  wordmark = true,
  gradient = false,
}: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark gradient={gradient} className={cn("h-7 w-7", markClassName)} />
      {wordmark && (
        <span className="font-display text-lg font-medium tracking-tight">
          Valox Capital
        </span>
      )}
    </span>
  );
}
