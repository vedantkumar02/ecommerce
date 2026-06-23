import { useState } from "react";
import Checkbox from "@/components/ui/Checkbox";
import type { FilterCheckboxListProps } from "@/components/filters/types";

export default function FilterCheckboxList({
  items,
  selectedIds,
  onChange,
  initialVisibleCount = 5,
}: FilterCheckboxListProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasMore = items.length > initialVisibleCount;
  const visibleItems = hasMore && !isExpanded
    ? items.slice(0, initialVisibleCount)
    : items;

  return (
    <div>
      <div className="space-y-2">
        {visibleItems.map((item) => (
          <Checkbox
            key={item.id}
            label={item.label}
            checked={selectedIds.includes(item.id)}
            onChange={(event) => onChange(item.id, event.target.checked)}
          />
        ))}
      </div>

      {hasMore && (
        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-700">
          {isExpanded
            ? "Show less"
            : `Show more (${items.length - initialVisibleCount})`}
        </button>
      )}
    </div>
  );
}
