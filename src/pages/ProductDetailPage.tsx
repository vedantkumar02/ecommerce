import { Link, useLocation, useParams } from "react-router-dom";
import StarRating from "@/components/product/StarRating";
import { useProduct } from "@/hooks";

export default function ProductDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const { product, loading, error } = useProduct(id);

  const backTo = (location.state as { from?: string } | null)?.from ?? "/";

  if (loading) {
    return (
      <div className="px-4 py-12 text-center text-gray-500 lg:px-6">
        Loading product...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="px-4 py-12 text-center lg:px-6">
        <p className="mb-4 text-gray-500">{error ?? "Product not found"}</p>
        <Link to={backTo} className="text-blue-600 hover:underline">
          Back to products
        </Link>
      </div>
    );
  }

  const image = product.images[0] ?? product.thumbnail;

  return (
    <div className="px-4 py-6 lg:px-6">
      <Link
        to={backTo}
        className="mb-6 inline-flex items-center gap-1 text-sm text-blue-600 hover:underline">
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to products
      </Link>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="flex items-center justify-center rounded-lg border border-gray-200 bg-white p-8">
          <img
            src={image}
            alt={product.title}
            className="max-h-96 max-w-full object-contain"
          />
        </div>

        <div>
          <h1 className="mb-4 text-2xl font-bold text-gray-900">
            {product.title}
          </h1>

          <div className="mb-4 flex flex-wrap items-center gap-4">
            <span className="text-3xl font-bold text-gray-900">
              ${product.price}
            </span>
            <StarRating rating={product.rating} />
          </div>

          <dl className="mb-6 space-y-2 text-sm">
            <div className="flex gap-2">
              <dt className="font-medium text-gray-500">Brand:</dt>
              <dd className="text-gray-900">{product.brand}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-medium text-gray-500">Category:</dt>
              <dd className="text-gray-900 capitalize">
                {product.category.replace(/-/g, " ")}
              </dd>
            </div>
          </dl>

          <p className="leading-relaxed text-gray-700">{product.description}</p>
        </div>
      </div>
    </div>
  );
}
