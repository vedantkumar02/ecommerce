import { useMemo } from "react";
import { SORT_OPTIONS, useProductFilters, useProducts } from "@/hooks";

export const PAGE_SIZE = 28;

export default function useProductListing() {
  const {
    debouncedSearchQuery,
    debouncedSelectedCategories,
    minPrice,
    maxPrice,
    selectedBrands,
    currentPage,
    sortBy,
    order,
    setCurrentPage,
    setSort,
  } = useProductFilters();

  const needsClientFiltering =
    selectedBrands.length > 0 ||
    minPrice !== "" ||
    maxPrice !== "" ||
    debouncedSelectedCategories.length > 1 ||
    (debouncedSearchQuery !== "" && debouncedSelectedCategories.length >= 1);

  const apiCategory =
    !debouncedSearchQuery && debouncedSelectedCategories.length === 1
      ? debouncedSelectedCategories[0]
      : undefined;

  const { products, total, loading, error, refetch } = useProducts({
    limit: PAGE_SIZE,
    skip: (currentPage - 1) * PAGE_SIZE,
    category: apiCategory,
    searchQuery: debouncedSearchQuery || undefined,
    sortBy: sortBy || undefined,
    order: sortBy ? order : undefined,
    fetchAll: needsClientFiltering,
  });

  const filteredProducts = useMemo(() => {
    if (!needsClientFiltering) {
      return products;
    }

    return products.filter((product) => {
      if (
        debouncedSelectedCategories.length > 0 &&
        !debouncedSelectedCategories.includes(product.category)
      ) {
        return false;
      }

      if (
        selectedBrands.length > 0 &&
        !selectedBrands.includes(product.brand)
      ) {
        return false;
      }

      if (minPrice && product.price < Number(minPrice)) {
        return false;
      }

      if (maxPrice && product.price > Number(maxPrice)) {
        return false;
      }

      return true;
    });
  }, [
    products,
    needsClientFiltering,
    debouncedSelectedCategories,
    selectedBrands,
    minPrice,
    maxPrice,
  ]);

  const displayProducts = useMemo(() => {
    if (!needsClientFiltering) {
      return filteredProducts;
    }

    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredProducts.slice(start, start + PAGE_SIZE);
  }, [filteredProducts, needsClientFiltering, currentPage]);

  const isEmpty = needsClientFiltering
    ? filteredProducts.length === 0
    : total === 0;

  const totalPages = needsClientFiltering
    ? Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE))
    : Math.max(1, Math.ceil(total / PAGE_SIZE));

  const currentSortValue =
    SORT_OPTIONS.find(
      (option) => option.sortBy === sortBy && option.order === order,
    )?.label ?? "Default";

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = SORT_OPTIONS.find(
      (option) => option.label === event.target.value,
    );
    if (selected) {
      setSort(selected.sortBy, selected.order);
    }
  };

  return {
    displayProducts,
    isEmpty,
    totalPages,
    currentPage,
    loading,
    error,
    refetch,
    currentSortValue,
    handleSortChange,
    setCurrentPage,
  };
}
