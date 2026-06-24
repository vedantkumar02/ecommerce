import FilterCheckboxList from "@/components/filters/FilterCheckboxList";
import FilterCheckboxListSkeleton from "@/components/filters/FilterCheckboxListSkeleton";
import FilterGroup from "@/components/filters/FilterGroup";
import MaintenanceMessage from "@/components/ui/MaintenanceMessage";
import type { BrandFilterProps } from "@/components/filters/types";

export default function BrandFilter({
  brands,
  selectedBrands,
  onBrandChange,
  loading = false,
  error = null,
  onRetry,
}: BrandFilterProps) {
  const items = brands.map((brand) => ({
    id: brand,
    label: brand,
  }));

  return (
    <FilterGroup title="Brands">
      {loading ? (
        <FilterCheckboxListSkeleton />
      ) : error ? (
        <MaintenanceMessage onRetry={onRetry} compact />
      ) : (
        <FilterCheckboxList
          items={items}
          selectedIds={selectedBrands}
          onChange={onBrandChange}
        />
      )}
    </FilterGroup>
  );
}
