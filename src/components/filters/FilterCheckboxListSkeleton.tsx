import Skeleton from "@/components/ui/Skeleton";
import type { FilterCheckboxListSkeletonProps } from "@/components/filters/types";

const LABEL_WIDTHS = ["w-20", "w-28", "w-24", "w-32", "w-24"] as const;

export default function FilterCheckboxListSkeleton({
  count = 5,
  showMore = true,
}: FilterCheckboxListSkeletonProps) {
  return (
    <div>
      <div className="space-y-2">
        {Array.from({ length: count }, (_, index) => (
          <label
            key={index}
            className="flex items-center gap-2 text-sm text-gray-700"
            aria-hidden="true">
            <Skeleton className="h-4 w-4 shrink-0 rounded" />
            <Skeleton className={`h-5 ${LABEL_WIDTHS[index % LABEL_WIDTHS.length]}`} />
          </label>
        ))}
      </div>

      {showMore && <Skeleton className="mt-2 h-5 w-36" />}
    </div>
  );
}
