import ProductDetailsSectionSkeleton from "@/components/product-detail/ProductDetailsSectionSkeleton";
import ProductImageSectionSkeleton from "@/components/product-detail/ProductImageSectionSkeleton";
import Skeleton from "@/components/ui/Skeleton";

const pageShell = "min-h-[calc(100dvh-60px)] bg-white px-4 py-4 lg:px-6";

export default function ProductDetailSkeleton() {
  return (
    <div
      className={pageShell}
      aria-busy="true"
      aria-label="Loading product">
      <div className="mb-4">
        <Skeleton className="inline-block h-[34px] w-18 rounded-md" />
      </div>
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
        <ProductImageSectionSkeleton />
        <ProductDetailsSectionSkeleton />
      </div>
    </div>
  );
}
