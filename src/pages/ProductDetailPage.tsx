import { useLocation, useParams } from "react-router-dom";
import BackButton from "@/components/product-detail/BackButton";
import ProductDetailCard from "@/components/product-detail/ProductDetailCard";
import { useProduct } from "@/hooks";

const pageShell = "min-h-[calc(100dvh-60px)] bg-white px-4 py-4 lg:px-6";

export default function ProductDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const { product, loading, error } = useProduct(id);

  const backTo = (location.state as { from?: string } | null)?.from ?? "/";

  if (loading) {
    return (
      <div
        className={`${pageShell} flex items-center justify-center text-gray-500`}>
        Loading product...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div
        className={`${pageShell} flex flex-col items-center justify-center`}>
        <p className="mb-4 text-gray-500">{error ?? "Product not found"}</p>
        <BackButton to={backTo} />
      </div>
    );
  }

  return (
    <div className={pageShell}>
      <ProductDetailCard product={product} backTo={backTo} />
    </div>
  );
}
