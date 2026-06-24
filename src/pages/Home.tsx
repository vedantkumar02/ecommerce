import Pagination from "@/components/pagination/Pagination";
import ProductGrid from "@/components/product/ProductGrid";
import ProductGridSkeleton from "@/components/product/ProductGridSkeleton";
import EmptyState from "@/components/ui/EmptyState";
import MaintenanceMessage from "@/components/ui/MaintenanceMessage";
import useProductListing, { PAGE_SIZE } from "@/hooks/useProductListing";
import { SORT_OPTIONS } from "@/hooks";

const pageShell =
  "flex min-h-[calc(100dvh-60px)] flex-col px-4 py-6 lg:px-6";

export default function Home() {
  const {
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
  } = useProductListing();

  const showProducts = !loading && !error && !isEmpty;

  return (
    <div className={pageShell}>
      {showProducts && (
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
      )}

      {loading && <ProductGridSkeleton count={PAGE_SIZE} />}

      {error && !loading && (
        <div className="flex flex-1 items-center justify-center">
          <MaintenanceMessage onRetry={refetch} className="w-full" />
        </div>
      )}

      {!loading && !error && isEmpty && (
        <div className="flex flex-1 items-center justify-center">
          <EmptyState
            title="No products found"
            description="Try adjusting your search or filters."
          />
        </div>
      )}

      {showProducts && (
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
  );
}
