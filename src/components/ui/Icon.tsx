import { ICON_PATHS } from "@/components/ui/types";
import type { IconProps } from "@/components/ui/types";

export default function Icon({ name, className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d={ICON_PATHS[name]}
      />
    </svg>
  );
}
