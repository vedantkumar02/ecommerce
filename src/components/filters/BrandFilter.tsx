import FilterCheckboxList from "@/components/filters/FilterCheckboxList";
import FilterGroup from "@/components/filters/FilterGroup";
import type { BrandFilterProps } from "@/components/filters/types";

export default function BrandFilter({
  brands,
  selectedBrands,
  onBrandChange,
}: BrandFilterProps) {
  const items = brands.map((brand) => ({
    id: brand,
    label: brand,
  }));

  return (
    <FilterGroup title="Brands">
      <FilterCheckboxList
        items={items}
        selectedIds={selectedBrands}
        onChange={onBrandChange}
      />
    </FilterGroup>
  );
}
