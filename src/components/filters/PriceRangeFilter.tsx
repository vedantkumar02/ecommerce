import Input from "@/components/ui/Input";
import FilterGroup from "@/components/filters/FilterGroup";
import type { PriceRangeFilterProps } from "@/components/filters/types";

export default function PriceRangeFilter({
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
}: PriceRangeFilterProps) {
  return (
    <FilterGroup title="Price Range">
      <div className="grid grid-cols-2 gap-2">
        <Input
          label="Min"
          type="number"
          placeholder="0"
          value={minPrice}
          onChange={(event) => onMinPriceChange(event.target.value)}
        />
        <Input
          label="Max"
          type="number"
          placeholder="1000"
          value={maxPrice}
          onChange={(event) => onMaxPriceChange(event.target.value)}
        />
      </div>
    </FilterGroup>
  );
}
