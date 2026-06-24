import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import BrandFilter from "@/components/filters/BrandFilter";
import CategoryFilter from "@/components/filters/CategoryFilter";
import PriceRangeFilter from "@/components/filters/PriceRangeFilter";
import Button from "@/components/ui/Button";
import {
  useCategories,
  useFilterPanel,
  useProductBrands,
  useProductFilters,
} from "@/hooks";
import type { Category } from "@/services/httpServices/types";

type FilterAsideOptions = {
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
};

function renderFilterAside({
  className = "",
  collapsed = false,
  categories,
  brands,
  onClose,
  showCloseButton = false,
  selectedCategories,
  minPrice,
  maxPrice,
  selectedBrands,
  applyPriceRange,
  toggleCategory,
  toggleBrand,
  onResetAll,
  hasActiveFilters,
}: FilterAsideOptions) {
  const widthClasses = collapsed
    ? "w-0 border-r-0 p-0 opacity-0"
    : showCloseButton
      ? "w-72 max-w-[85vw] p-4 opacity-100"
      : "w-full p-4 opacity-100 lg:w-64";

  if (collapsed) {
    return (
      <aside
        className={`shrink-0 overflow-hidden border-r border-gray-200 bg-gray-50 transition-all duration-300 ease-in-out ${widthClasses} ${className}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <aside
      className={`shrink-0 overflow-hidden border-r border-gray-200 bg-gray-50 transition-all duration-300 ease-in-out ${widthClasses} ${className}`}>
      {showCloseButton && onClose && (
        <div className="mb-4 flex items-center justify-between lg:hidden">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="rounded p-1 text-gray-500 hover:bg-gray-200 hover:text-gray-700">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}

      <Button
        variant="outline"
        size="sm"
        className="mb-4 w-full"
        disabled={!hasActiveFilters}
        onClick={onResetAll}>
        Reset all
      </Button>

      <CategoryFilter
        categories={categories}
        selectedCategories={selectedCategories}
        onCategoryChange={toggleCategory}
      />

      <PriceRangeFilter
        minPrice={minPrice}
        maxPrice={maxPrice}
        onApply={applyPriceRange}
      />

      <BrandFilter
        brands={brands}
        selectedBrands={selectedBrands}
        onBrandChange={toggleBrand}
      />
    </aside>
  );
}

export default function Sidebar() {
  const { isMobileOpen, isDesktopExpanded, closeMobile } = useFilterPanel();
  const { categories } = useCategories();
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
  const { brands, loading: brandsLoading } = useProductBrands({
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
  };

  return (
    <div className="flex">
      {renderFilterAside({
        ...filterAsideProps,
        collapsed: !isDesktopExpanded,
        className: "hidden lg:block",
      })}

      {isMobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            onClick={closeMobile}
            aria-hidden="true"
          />
          {renderFilterAside({
            ...filterAsideProps,
            className:
              "fixed inset-y-0 left-0 z-50 h-full overflow-y-auto lg:hidden",
            showCloseButton: true,
            onClose: closeMobile,
          })}
        </>
      )}

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
