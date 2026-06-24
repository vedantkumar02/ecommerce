import FilterCheckboxListSkeleton from "@/components/filters/FilterCheckboxListSkeleton";
import FilterGroup from "@/components/filters/FilterGroup";
import PriceRangeFilterSkeleton from "@/components/filters/PriceRangeFilterSkeleton";

export default function FilterSidebarSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading filters">
      <FilterGroup title="Categories">
        <FilterCheckboxListSkeleton />
      </FilterGroup>

      <PriceRangeFilterSkeleton />

      <FilterGroup title="Brands">
        <FilterCheckboxListSkeleton />
      </FilterGroup>
    </div>
  );
}
