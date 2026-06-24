import type {
  Category,
  Product,
  ProductListParams,
  SortOrder,
} from "@/services/httpServices/types";

export type UseProductsOptions = ProductListParams & {
  category?: string;
  searchQuery?: string;
  fetchAll?: boolean;
};

export type UseProductsResult = {
  products: Product[];
  total: number;
  loading: boolean;
  error: string | null;
  refetch: () => void;
};

export type UseProductResult = {
  product: Product | null;
  loading: boolean;
  error: string | null;
  notFound: boolean;
  refetch: () => void;
};

export type UseCategoriesResult = {
  categories: Category[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
};

export type UseProductBrandsOptions = {
  categories?: string[];
};

export type UseProductBrandsResult = {
  brands: string[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
};

export type SortOption = {
  sortBy: string;
  order: SortOrder;
  label: string;
};

export type ProductFiltersState = {
  searchQuery: string;
  selectedCategories: string[];
  minPrice: string;
  maxPrice: string;
  selectedBrands: string[];
  currentPage: number;
  sortBy: string;
  order: SortOrder;
};

export type ProductFiltersActions = {
  setSearchQuery: (value: string) => void;
  applyPriceRange: (min: string, max: string) => void;
  setCurrentPage: (page: number) => void;
  setSort: (sortBy: string, order: SortOrder) => void;
  toggleCategory: (slug: string, checked: boolean) => void;
  toggleBrand: (brand: string, checked: boolean) => void;
  pruneSelectedBrands: (validBrands: readonly string[]) => void;
  resetAllFilters: () => void;
  hasActiveFilters: boolean;
  debouncedSearchQuery: string;
  debouncedSelectedCategories: string[];
};

export type ProductFiltersValue = ProductFiltersState & ProductFiltersActions;
