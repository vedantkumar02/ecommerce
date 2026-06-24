import FilterGroup from "@/components/filters/FilterGroup";
import Skeleton from "@/components/ui/Skeleton";

export default function PriceRangeFilterSkeleton() {
  return (
    <FilterGroup title="Price Range">
      <div className="grid grid-cols-2 gap-2">
        <div className="w-full">
          <label className="mb-1 block text-xs font-medium text-gray-600">
            Min
          </label>
          <Skeleton className="h-[38px] w-full rounded-md" />
        </div>
        <div className="w-full">
          <label className="mb-1 block text-xs font-medium text-gray-600">
            Max
          </label>
          <Skeleton className="h-[38px] w-full rounded-md" />
        </div>
      </div>
      <Skeleton className="mt-2 h-[34px] w-full rounded-md" />
    </FilterGroup>
  );
}
