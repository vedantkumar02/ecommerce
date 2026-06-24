import BackButton from "@/components/product-detail/BackButton";
import ProductDetailsSection from "@/components/product-detail/ProductDetailsSection";
import ProductImageSection from "@/components/product-detail/ProductImageSection";
import type { ProductDetailCardProps } from "@/components/product-detail/types";

export default function ProductDetailCard({
  product,
  backTo,
}: ProductDetailCardProps) {
  return (
    <div>
      <div className="mb-4">
        <BackButton to={backTo} />
      </div>
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
        <ProductImageSection product={product} />
        <ProductDetailsSection product={product} />
      </div>
    </div>
  );
}
