import ProductDescription from "@/components/product-detail/ProductDescription";
import ProductHeader from "@/components/product-detail/ProductHeader";
import ProductMeta from "@/components/product-detail/ProductMeta";
import ProductReviews from "@/components/product-detail/ProductReviews";
import type { ProductDetailsSectionProps } from "@/components/product-detail/types";

export default function ProductDetailsSection({
  product,
}: ProductDetailsSectionProps) {
  return (
    <div className="min-w-0">
      <ProductHeader
        title={product.title}
        price={product.price}
        rating={product.rating}
      />
      <ProductMeta brand={product.brand} category={product.category} />
      <ProductDescription description={product.description} />
      <ProductReviews reviews={product.reviews ?? []} />
    </div>
  );
}
