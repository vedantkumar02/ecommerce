import type { ReactNode } from "react";
import type { Category } from "@/services/httpServices/types";

export type CheckboxFilterHandler = (id: string, checked: boolean) => void;

export type CategoryFilterProps = {
  categories: Category[];
  selectedCategories: string[];
  onCategoryChange: CheckboxFilterHandler;
};

export type BrandFilterProps = {
  brands: readonly string[];
  selectedBrands: string[];
  onBrandChange: CheckboxFilterHandler;
};

export type PriceRangeFilterProps = {
  minPrice: string;
  maxPrice: string;
  onApply: (min: string, max: string) => void;
};

export type FilterGroupProps = {
  title: string;
  children: ReactNode;
};

export type FilterCheckboxItem = {
  id: string;
  label: string;
};

export type FilterCheckboxListProps = {
  items: FilterCheckboxItem[];
  selectedIds: string[];
  onChange: (id: string, checked: boolean) => void;
  initialVisibleCount?: number;
};
