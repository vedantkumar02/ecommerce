import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FILTER_DEBOUNCE_MS } from "@/constants/filters";
import useDebounce from "@/hooks/useDebounce";
import type {
  ProductFiltersState,
  ProductFiltersValue,
} from "@/hooks/types";
import type { SortOrder } from "@/services/httpServices/types";

function parseList(value: string | null): string[] {
  return value ? value.split(",").filter(Boolean) : [];
}

function serializeList(values: string[]): string | null {
  return values.length > 0 ? values.join(",") : null;
}

function readFiltersFromParams(params: URLSearchParams): ProductFiltersState {
  return {
    searchQuery: params.get("q") ?? "",
    selectedCategories: parseList(params.get("categories")),
    minPrice: params.get("minPrice") ?? "",
    maxPrice: params.get("maxPrice") ?? "",
    selectedBrands: parseList(params.get("brands")),
    currentPage: Math.max(1, Number(params.get("page")) || 1),
    sortBy: params.get("sortBy") ?? "",
    order: params.get("order") === "desc" ? "desc" : "asc",
  };
}

function buildSearchParams(state: ProductFiltersState): URLSearchParams {
  const params = new URLSearchParams();

  if (state.searchQuery) {
    params.set("q", state.searchQuery);
  }
  const categories = serializeList(state.selectedCategories);
  if (categories) {
    params.set("categories", categories);
  }
  const brands = serializeList(state.selectedBrands);
  if (brands) {
    params.set("brands", brands);
  }
  if (state.minPrice) {
    params.set("minPrice", state.minPrice);
  }
  if (state.maxPrice) {
    params.set("maxPrice", state.maxPrice);
  }
  if (state.currentPage > 1) {
    params.set("page", String(state.currentPage));
  }
  if (state.sortBy) {
    params.set("sortBy", state.sortBy);
    params.set("order", state.order);
  }

  return params;
}

const DEFAULT_FILTERS: ProductFiltersState = {
  searchQuery: "",
  selectedCategories: [],
  minPrice: "",
  maxPrice: "",
  selectedBrands: [],
  currentPage: 1,
  sortBy: "",
  order: "asc",
};

export default function useProductFiltersLogic(): ProductFiltersValue {
  const [searchParams, setSearchParams] = useSearchParams();
  const initial = readFiltersFromParams(searchParams);
  const urlResetKey = searchParams.toString();

  const [searchQuery, setSearchQueryState] = useState(initial.searchQuery);
  const debouncedSearchQuery = useDebounce(
    searchQuery,
    FILTER_DEBOUNCE_MS,
    urlResetKey,
  );
  const [selectedCategories, setSelectedCategories] = useState(
    initial.selectedCategories,
  );
  const debouncedSelectedCategories = useDebounce(
    selectedCategories,
    FILTER_DEBOUNCE_MS,
    urlResetKey,
  );
  const [minPrice, setMinPriceState] = useState(initial.minPrice);
  const [maxPrice, setMaxPriceState] = useState(initial.maxPrice);
  const [selectedBrands, setSelectedBrands] = useState(initial.selectedBrands);
  const [currentPage, setCurrentPageState] = useState(initial.currentPage);
  const [sortBy, setSortBy] = useState(initial.sortBy);
  const [order, setOrder] = useState<SortOrder>(initial.order);

  const isInitialMount = useRef(true);
  const isSyncingFromUrl = useRef(false);
  const isUserSearchChange = useRef(false);
  const isUserCategoryChange = useRef(false);

  const getState = useCallback(
    (): ProductFiltersState => ({
      searchQuery: debouncedSearchQuery,
      selectedCategories: debouncedSelectedCategories,
      minPrice,
      maxPrice,
      selectedBrands,
      currentPage,
      sortBy,
      order,
    }),
    [
      debouncedSearchQuery,
      debouncedSelectedCategories,
      minPrice,
      maxPrice,
      selectedBrands,
      currentPage,
      sortBy,
      order,
    ],
  );

  const syncToUrl = useCallback(
    (state: ProductFiltersState) => {
      isSyncingFromUrl.current = true;
      setSearchParams(buildSearchParams(state), { replace: true });
    },
    [setSearchParams],
  );

  useEffect(() => {
    if (isSyncingFromUrl.current) {
      isSyncingFromUrl.current = false;
      return;
    }

    const next = readFiltersFromParams(searchParams);

    setSearchQueryState(next.searchQuery);
    setSelectedCategories(next.selectedCategories);
    setMinPriceState(next.minPrice);
    setMaxPriceState(next.maxPrice);
    setSelectedBrands(next.selectedBrands);
    setCurrentPageState(next.currentPage);
    setSortBy(next.sortBy);
    setOrder(next.order);
  }, [searchParams]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    syncToUrl(getState());
  }, [
    debouncedSearchQuery,
    debouncedSelectedCategories,
    minPrice,
    maxPrice,
    selectedBrands,
    currentPage,
    sortBy,
    order,
    syncToUrl,
    getState,
  ]);

  useEffect(() => {
    if (!isUserSearchChange.current) {
      return;
    }

    isUserSearchChange.current = false;
    setCurrentPageState(1);
  }, [debouncedSearchQuery]);

  useEffect(() => {
    if (!isUserCategoryChange.current) {
      return;
    }

    isUserCategoryChange.current = false;
    setCurrentPageState(1);
  }, [debouncedSelectedCategories]);

  const setSearchQuery = useCallback((value: string) => {
    isUserSearchChange.current = true;
    setSearchQueryState(value);
  }, []);

  const applyPriceRange = useCallback((min: string, max: string) => {
    setMinPriceState(min);
    setMaxPriceState(max);
    setCurrentPageState(1);
  }, []);

  const setCurrentPage = useCallback((page: number) => {
    setCurrentPageState(page);
  }, []);

  const setSort = useCallback((newSortBy: string, newOrder: SortOrder) => {
    setSortBy(newSortBy);
    setOrder(newOrder);
    setCurrentPageState(1);
  }, []);

  const toggleCategory = useCallback((slug: string, checked: boolean) => {
    isUserCategoryChange.current = true;
    setSelectedCategories((prev) =>
      checked ? [...prev, slug] : prev.filter((item) => item !== slug),
    );
  }, []);

  const toggleBrand = useCallback((brand: string, checked: boolean) => {
    setSelectedBrands((prev) =>
      checked ? [...prev, brand] : prev.filter((item) => item !== brand),
    );
    setCurrentPageState(1);
  }, []);

  const pruneSelectedBrands = useCallback((validBrands: readonly string[]) => {
    const validSet = new Set(validBrands);
    setSelectedBrands((prev) => {
      const next = prev.filter((brand) => validSet.has(brand));
      if (next.length !== prev.length) {
        setCurrentPageState(1);
      }
      return next.length === prev.length ? prev : next;
    });
  }, []);

  const resetAllFilters = useCallback(() => {
    setSearchQueryState(DEFAULT_FILTERS.searchQuery);
    setSelectedCategories(DEFAULT_FILTERS.selectedCategories);
    setMinPriceState(DEFAULT_FILTERS.minPrice);
    setMaxPriceState(DEFAULT_FILTERS.maxPrice);
    setSelectedBrands(DEFAULT_FILTERS.selectedBrands);
    setCurrentPageState(DEFAULT_FILTERS.currentPage);
    setSortBy(DEFAULT_FILTERS.sortBy);
    setOrder(DEFAULT_FILTERS.order);
    syncToUrl(DEFAULT_FILTERS);
  }, [syncToUrl]);

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedCategories.length > 0 ||
    minPrice !== "" ||
    maxPrice !== "" ||
    selectedBrands.length > 0 ||
    sortBy !== "" ||
    currentPage > 1;

  return {
    searchQuery,
    selectedCategories,
    minPrice,
    maxPrice,
    selectedBrands,
    currentPage,
    sortBy,
    order,
    debouncedSearchQuery,
    debouncedSelectedCategories,
    setSearchQuery,
    applyPriceRange,
    setCurrentPage,
    setSort,
    toggleCategory,
    toggleBrand,
    pruneSelectedBrands,
    resetAllFilters,
    hasActiveFilters,
  };
}
