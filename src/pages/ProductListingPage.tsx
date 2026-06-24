import { useMemo } from "react";
import FilterSidebar from "@/components/filters/FilterSidebar";
import Pagination from "@/components/pagination/Pagination";
import ProductGrid from "@/components/product/ProductGrid";
import {
  SORT_OPTIONS,
  useCategories,
  useFilterPanel,
  useProductBrands,
  useProductFilters,
  useProducts,
} from "@/hooks";

const PAGE_SIZE = 28;

export default function ProductListingPage() {
  const { isMobileOpen, isDesktopExpanded, closeMobile } = useFilterPanel();

  const {
    listingSearch,
    selectedCategories,
    minPrice,
    maxPrice,
    selectedBrands,
    currentPage,
    sortBy,
    order,
    setCurrentPage,
    setSort,
  } = useProductFilters();

  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategories();
  const {
    brands,
    loading: brandsLoading,
    error: brandsError,
  } = useProductBrands();

  const needsClientFiltering =
    selectedBrands.length > 0 ||
    minPrice !== "" ||
    maxPrice !== "" ||
    selectedCategories.length > 1 ||
    (listingSearch !== "" && selectedCategories.length >= 1);

  const apiCategory =
    !listingSearch && selectedCategories.length === 1
      ? selectedCategories[0]
      : undefined;

  const { products, total, loading, error } = useProducts({
    limit: PAGE_SIZE,
    skip: (currentPage - 1) * PAGE_SIZE,
    category: apiCategory,
    searchQuery: listingSearch || undefined,
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
        selectedCategories.length > 0 &&
        !selectedCategories.includes(product.category)
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
    selectedCategories,
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

  const isLoading = loading || categoriesLoading || brandsLoading;
  const fetchError = error ?? categoriesError ?? brandsError;

  return (
    <div className="flex">
      <FilterSidebar
        categories={categories}
        brands={brands}
        collapsed={!isDesktopExpanded}
        className="hidden lg:block"
      />

      {isMobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            onClick={closeMobile}
            aria-hidden="true"
          />
          <FilterSidebar
            categories={categories}
            brands={brands}
            className="fixed inset-y-0 left-0 z-50 h-full overflow-y-auto lg:hidden"
            showCloseButton
            onClose={closeMobile}
          />
        </>
      )}

      <div className="flex-1 px-4 py-6 lg:px-6">
        <div className="mb-4 flex items-center justify-end">
          <label className="flex items-center gap-2 text-sm text-gray-600">
            Sort by
            <select
              value={currentSortValue}
              onChange={handleSortChange}
              className="rounded border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-900">
              {SORT_OPTIONS.map((option) => (
                <option key={option.label} value={option.label}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {isLoading && (
          <p className="py-12 text-center text-gray-500">Loading products...</p>
        )}

        {fetchError && !isLoading && (
          <p className="py-12 text-center text-red-600">{fetchError}</p>
        )}

        {!isLoading && !fetchError && (
          <>
            <ProductGrid products={displayProducts} />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </div>
  );
}
