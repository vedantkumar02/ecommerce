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
};

export type ProductsState = {
  queryKey: string;
  products: Product[];
  total: number;
  error: string | null;
};

export type UseProductResult = {
  product: Product | null;
  loading: boolean;
  error: string | null;
};

export type ProductState = {
  id: string;
  product: Product | null;
  error: string | null;
};

export type UseCategoriesResult = {
  categories: Category[];
  loading: boolean;
  error: string | null;
};

export type CategoriesState = {
  loaded: boolean;
  categories: Category[];
  error: string | null;
};

export type UseProductBrandsResult = {
  brands: string[];
  loading: boolean;
  error: string | null;
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
  setMinPrice: (value: string) => void;
  setMaxPrice: (value: string) => void;
  setCurrentPage: (page: number) => void;
  setSort: (sortBy: string, order: SortOrder) => void;
  handleCategoryChange: (slug: string, checked: boolean) => void;
  handleBrandChange: (brand: string, checked: boolean) => void;
  listingSearch: string;
};

export type ProductFiltersValue = ProductFiltersState & ProductFiltersActions;
