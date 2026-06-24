import { Link, useLocation } from "react-router-dom";
import StarRating from "@/components/product/StarRating";
import type { ProductCardProps } from "@/components/product/types";
import type { ProductDetailLocationState } from "@/router/types";

export default function ProductCard({ product }: ProductCardProps) {
  const location = useLocation();
  const { id, title, price, rating, thumbnail } = product;

  const linkState = {
    from: `${location.pathname}${location.search}`,
  } satisfies ProductDetailLocationState;

  return (
    <Link
      to={`/product/${id}`}
      state={linkState}
      className="block rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-4 flex h-40 items-center justify-center">
        <img
          src={thumbnail}
          alt={title}
          className="max-h-full max-w-full object-contain"
        />
      </div>
      <h3 className="mb-2 font-semibold text-gray-900">{title}</h3>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-lg font-bold text-gray-900">${price}</span>
        <StarRating rating={rating} />
      </div>
    </Link>
  );
}
