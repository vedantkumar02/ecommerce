import type { FilterGroupProps } from "@/components/filters/types";

export default function FilterGroup({ title, children }: FilterGroupProps) {
  return (
    <div className="mb-6">
      <h3 className="mb-3 text-sm font-bold text-gray-900">{title}</h3>
      {children}
    </div>
  );
}
