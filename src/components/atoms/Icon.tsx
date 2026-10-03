import type { LucideIcon } from "lucide-react";

export function Icon({
  icon: Component,
  size = 16,
  className = "",
}: {
  icon: LucideIcon;
  size?: number;
  className?: string;
}) {
  return <Component size={size} className={`shrink-0 ${className}`} aria-hidden="true" />;
}
