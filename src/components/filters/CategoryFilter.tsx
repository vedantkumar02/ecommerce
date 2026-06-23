import FilterCheckboxList from "@/components/filters/FilterCheckboxList";
import FilterGroup from "@/components/filters/FilterGroup";
import type { CategoryFilterProps } from "@/components/filters/types";

export default function CategoryFilter({
  categories,
  selectedCategories,
  onCategoryChange,
}: CategoryFilterProps) {
  const items = categories.map((category) => ({
    id: category.slug,
    label: category.name,
  }));

  return (
    <FilterGroup title="Categories">
      <FilterCheckboxList
        items={items}
        selectedIds={selectedCategories}
        onChange={onCategoryChange}
      />
    </FilterGroup>
  );
}
