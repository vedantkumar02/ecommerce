import { useState } from "react";
import type { KeyboardEvent } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import FilterGroup from "@/components/filters/FilterGroup";
import type { PriceRangeFilterProps } from "@/components/filters/types";

const NUMERIC_PRICE_PATTERN = /^\d*\.?\d*$/;

function isValidPriceInput(value: string) {
  return value === "" || NUMERIC_PRICE_PATTERN.test(value);
}

export default function PriceRangeFilter(props: PriceRangeFilterProps) {
  const { minPrice, maxPrice } = props;

  return (
    <PriceRangeFilterFields
      key={`${minPrice}|${maxPrice}`}
      {...props}
    />
  );
}

function PriceRangeFilterFields({
  minPrice,
  maxPrice,
  onApply,
}: PriceRangeFilterProps) {
  const [draftMin, setDraftMin] = useState(minPrice);
  const [draftMax, setDraftMax] = useState(maxPrice);

  const isUnchanged = draftMin === minPrice && draftMax === maxPrice;

  const handleApply = () => {
    onApply(draftMin, draftMax);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleApply();
    }
  };

  return (
    <FilterGroup title="Price Range">
      <div className="grid grid-cols-2 gap-2">
        <Input
          label="Min"
          type="text"
          inputMode="decimal"
          value={draftMin}
          onChange={(event) => {
            const value = event.target.value;
            if (isValidPriceInput(value)) {
              setDraftMin(value);
            }
          }}
          onKeyDown={handleKeyDown}
        />
        <Input
          label="Max"
          type="text"
          inputMode="decimal"
          value={draftMax}
          onChange={(event) => {
            const value = event.target.value;
            if (isValidPriceInput(value)) {
              setDraftMax(value);
            }
          }}
          onKeyDown={handleKeyDown}
        />
      </div>
      <Button
        variant="primary"
        size="sm"
        className="mt-2 w-full"
        disabled={isUnchanged}
        onClick={handleApply}>
        Apply
      </Button>
    </FilterGroup>
  );
}
