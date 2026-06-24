import ProductCardSkeleton from "@/components/product/ProductCardSkeleton";
import type { ProductGridSkeletonProps } from "@/components/product/types";

export default function ProductGridSkeleton({
  count = 28,
}: ProductGridSkeletonProps) {
  return (
    <div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      aria-busy="true"
      aria-label="Loading products">
      {Array.from({ length: count }, (_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}
