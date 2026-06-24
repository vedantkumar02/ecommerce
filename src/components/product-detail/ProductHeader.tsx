import StarRating from "@/components/product/StarRating";
import type { ProductHeaderProps } from "@/components/product-detail/types";

export default function ProductHeader({
  title,
  price,
  rating,
}: ProductHeaderProps) {
  return (
    <header className="mb-4 lg:mb-3">
      <h1 className="mb-2 text-2xl font-bold text-gray-900">{title}</h1>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xl font-bold text-gray-900">${price}</span>
        <StarRating rating={rating} size="md" />
      </div>
    </header>
  );
}
