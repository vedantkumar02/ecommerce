import BrandFilter from "@/components/filters/BrandFilter";
import CategoryFilter from "@/components/filters/CategoryFilter";
import PriceRangeFilter from "@/components/filters/PriceRangeFilter";
import type { FilterSidebarProps } from "@/components/filters/types";
import { useProductFilters } from "@/hooks";

export default function FilterSidebar({
  className = "",
  collapsed = false,
  categories,
  brands,
  onClose,
  showCloseButton = false,
}: FilterSidebarProps) {
  const {
    selectedCategories,
    minPrice,
    maxPrice,
    selectedBrands,
    setMinPrice,
    setMaxPrice,
    handleCategoryChange,
    handleBrandChange,
  } = useProductFilters();

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

      <CategoryFilter
        categories={categories}
        selectedCategories={selectedCategories}
        onCategoryChange={handleCategoryChange}
      />

      <PriceRangeFilter
        minPrice={minPrice}
        maxPrice={maxPrice}
        onMinPriceChange={setMinPrice}
        onMaxPriceChange={setMaxPrice}
      />

      <BrandFilter
        brands={brands}
        selectedBrands={selectedBrands}
        onBrandChange={handleBrandChange}
      />
    </aside>
  );
}
