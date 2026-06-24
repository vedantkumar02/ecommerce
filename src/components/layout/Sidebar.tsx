import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import FilterAside from "@/components/layout/FilterAside";
import {
  useCategories,
  useFilterPanel,
  useProductBrands,
  useProductFilters,
} from "@/hooks";

export default function Sidebar() {
  const { isMobileOpen, isDesktopExpanded, closeMobile } = useFilterPanel();
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
    refetch: refetchCategories,
  } = useCategories();
  const {
    selectedCategories,
    debouncedSelectedCategories,
    minPrice,
    maxPrice,
    selectedBrands,
    applyPriceRange,
    toggleCategory,
    toggleBrand,
    pruneSelectedBrands,
    resetAllFilters,
    hasActiveFilters,
  } = useProductFilters();
  const {
    brands,
    loading: brandsLoading,
    error: brandsError,
    refetch: refetchBrands,
  } = useProductBrands({
    categories: debouncedSelectedCategories,
  });

  useEffect(() => {
    if (brandsLoading) {
      return;
    }

    pruneSelectedBrands(brands);
  }, [brands, brandsLoading, pruneSelectedBrands]);

  const filterAsideProps = {
    categories,
    brands,
    selectedCategories,
    minPrice,
    maxPrice,
    selectedBrands,
    applyPriceRange,
    toggleCategory,
    toggleBrand,
    onResetAll: resetAllFilters,
    hasActiveFilters,
    categoriesLoading,
    categoriesError,
    onCategoriesRetry: refetchCategories,
    brandsLoading,
    brandsError,
    onBrandsRetry: refetchBrands,
  };

  return (
    <div className="flex min-h-[calc(100dvh-60px)] items-stretch">
      <FilterAside
        {...filterAsideProps}
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
          <FilterAside
            {...filterAsideProps}
            className="fixed inset-y-0 left-0 z-50 h-full overflow-y-auto lg:hidden"
            showCloseButton
            onClose={closeMobile}
          />
        </>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <Outlet />
      </div>
    </div>
  );
}
