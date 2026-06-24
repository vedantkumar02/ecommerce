import BrandFilter from "@/components/filters/BrandFilter";
import CategoryFilter from "@/components/filters/CategoryFilter";
import FilterSidebarSkeleton from "@/components/filters/FilterSidebarSkeleton";
import PriceRangeFilter from "@/components/filters/PriceRangeFilter";
import type { FilterAsideProps } from "@/components/layout/types";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import MaintenanceMessage from "@/components/ui/MaintenanceMessage";

export default function FilterAside({
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
  categoriesLoading = false,
  categoriesError = null,
  onCategoriesRetry,
  brandsLoading = false,
  brandsError = null,
  onBrandsRetry,
}: FilterAsideProps) {
  const showBrandFilter =
    selectedCategories.length === 0 ||
    brandsLoading ||
    Boolean(brandsError) ||
    brands.length > 0;

  const widthClasses = collapsed
    ? "w-0 border-r-0 p-0 opacity-0"
    : showCloseButton
      ? "w-72 max-w-[85vw] p-4 opacity-100"
      : "w-full p-4 opacity-100 lg:w-64";

  if (collapsed) {
    return (
      <aside
        className={`shrink-0 self-stretch overflow-hidden border-r border-gray-200 bg-gray-50 transition-all duration-300 ease-in-out ${widthClasses} ${className}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <aside
      className={`shrink-0 self-stretch overflow-hidden border-r border-gray-200 bg-gray-50 transition-all duration-300 ease-in-out ${widthClasses} ${className}`}>
      {showCloseButton && onClose && (
        <div className="mb-4 flex items-center justify-between lg:hidden">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="rounded p-1 text-gray-500 hover:bg-gray-200 hover:text-gray-700">
            <Icon name="x" className="h-5 w-5" />
          </button>
        </div>
      )}

      <Button
        variant="outline"
        size="sm"
        className="mb-4 w-full"
        disabled={!hasActiveFilters || categoriesLoading}
        onClick={onResetAll}>
        Reset all
      </Button>

      {categoriesLoading ? (
        <FilterSidebarSkeleton />
      ) : categoriesError ? (
        <MaintenanceMessage onRetry={onCategoriesRetry} compact />
      ) : (
        <>
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

          {showBrandFilter && (
            <BrandFilter
              brands={brands}
              selectedBrands={selectedBrands}
              onBrandChange={toggleBrand}
              loading={brandsLoading}
              error={brandsError}
              onRetry={onBrandsRetry}
            />
          )}
        </>
      )}
    </aside>
  );
}
