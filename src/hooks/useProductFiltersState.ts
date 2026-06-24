import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
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

function statesEqual(a: ProductFiltersState, b: ProductFiltersState): boolean {
  return (
    a.searchQuery === b.searchQuery &&
    a.minPrice === b.minPrice &&
    a.maxPrice === b.maxPrice &&
    a.currentPage === b.currentPage &&
    a.sortBy === b.sortBy &&
    a.order === b.order &&
    a.selectedCategories.join(",") === b.selectedCategories.join(",") &&
    a.selectedBrands.join(",") === b.selectedBrands.join(",")
  );
}

export default function useProductFiltersState(): ProductFiltersValue {
  const [searchParams, setSearchParams] = useSearchParams();
  const initial = readFiltersFromParams(searchParams);

  const [searchQuery, setSearchQueryState] = useState(initial.searchQuery);
  const [listingSearch, setListingSearch] = useState(initial.searchQuery);
  const [selectedCategories, setSelectedCategories] = useState(
    initial.selectedCategories,
  );
  const [minPrice, setMinPriceState] = useState(initial.minPrice);
  const [maxPrice, setMaxPriceState] = useState(initial.maxPrice);
  const [selectedBrands, setSelectedBrands] = useState(initial.selectedBrands);
  const [currentPage, setCurrentPageState] = useState(initial.currentPage);
  const [sortBy, setSortBy] = useState(initial.sortBy);
  const [order, setOrder] = useState<SortOrder>(initial.order);

  const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isInitialMount = useRef(true);
  const isSyncingFromUrl = useRef(false);

  const getState = useCallback(
    (): ProductFiltersState => ({
      searchQuery: listingSearch,
      selectedCategories,
      minPrice,
      maxPrice,
      selectedBrands,
      currentPage,
      sortBy,
      order,
    }),
    [
      listingSearch,
      selectedCategories,
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
    const current = getState();

    if (statesEqual(next, current)) {
      return;
    }

    setSearchQueryState(next.searchQuery);
    setListingSearch(next.searchQuery);
    setSelectedCategories(next.selectedCategories);
    setMinPriceState(next.minPrice);
    setMaxPriceState(next.maxPrice);
    setSelectedBrands(next.selectedBrands);
    setCurrentPageState(next.currentPage);
    setSortBy(next.sortBy);
    setOrder(next.order);
  }, [searchParams, getState]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    syncToUrl(getState());
  }, [
    listingSearch,
    selectedCategories,
    minPrice,
    maxPrice,
    selectedBrands,
    currentPage,
    sortBy,
    order,
    syncToUrl,
    getState,
  ]);

  const setSearchQuery = useCallback((value: string) => {
    setSearchQueryState(value);

    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
    }

    searchDebounceRef.current = setTimeout(() => {
      setListingSearch(value);
      setCurrentPageState(1);
    }, 300);
  }, []);

  const setMinPrice = useCallback((value: string) => {
    setMinPriceState(value);
    setCurrentPageState(1);
  }, []);

  const setMaxPrice = useCallback((value: string) => {
    setMaxPriceState(value);
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

  const handleCategoryChange = useCallback(
    (slug: string, checked: boolean) => {
      setSelectedCategories((prev) =>
        checked ? [...prev, slug] : prev.filter((item) => item !== slug),
      );
      setCurrentPageState(1);
    },
    [],
  );

  const handleBrandChange = useCallback((brand: string, checked: boolean) => {
    setSelectedBrands((prev) =>
      checked ? [...prev, brand] : prev.filter((item) => item !== brand),
    );
    setCurrentPageState(1);
  }, []);

  return {
    searchQuery,
    selectedCategories,
    minPrice,
    maxPrice,
    selectedBrands,
    currentPage,
    sortBy,
    order,
    listingSearch,
    setSearchQuery,
    setMinPrice,
    setMaxPrice,
    setCurrentPage,
    setSort,
    handleCategoryChange,
    handleBrandChange,
  };
}
