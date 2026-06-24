import type { Category } from "@/services/httpServices/types";

export type FilterAsideProps = {
  className?: string;
  collapsed?: boolean;
  categories: Category[];
  brands: readonly string[];
  onClose?: () => void;
  showCloseButton?: boolean;
  selectedCategories: string[];
  minPrice: string;
  maxPrice: string;
  selectedBrands: string[];
  applyPriceRange: (min: string, max: string) => void;
  toggleCategory: (id: string, checked: boolean) => void;
  toggleBrand: (id: string, checked: boolean) => void;
  onResetAll: () => void;
  hasActiveFilters: boolean;
  categoriesLoading?: boolean;
  categoriesError?: string | null;
  onCategoriesRetry?: () => void;
  brandsLoading?: boolean;
  brandsError?: string | null;
  onBrandsRetry?: () => void;
};
