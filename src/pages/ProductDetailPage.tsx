import { useLocation, useParams } from "react-router-dom";
import BackButton from "@/components/product-detail/BackButton";
import ProductDetailCard from "@/components/product-detail/ProductDetailCard";
import ProductDetailSkeleton from "@/components/product-detail/ProductDetailSkeleton";
import MaintenanceMessage from "@/components/ui/MaintenanceMessage";
import NotFoundPage from "@/pages/NotFoundPage";
import { useProduct } from "@/hooks";
import { getListingBackPath } from "@/router/types";

const pageShell = "min-h-[calc(100dvh-60px)] bg-white px-4 py-4 lg:px-6";

export default function ProductDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const { product, loading, error, notFound, refetch } = useProduct(id);

  const backTo = getListingBackPath(location.state);

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (notFound) {
    return (
      <NotFoundPage
        title="Product not found"
        description="The product you are looking for does not exist or may have been removed."
      />
    );
  }

  if (error) {
    return (
      <div className={`${pageShell} flex flex-col items-center justify-center`}>
        <MaintenanceMessage onRetry={refetch} className="w-full max-w-md" />
        <div className="mt-4">
          <BackButton to={backTo} />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <NotFoundPage
        title="Product not found"
        description="The product you are looking for does not exist or may have been removed."
      />
    );
  }

  return (
    <div className={pageShell}>
      <ProductDetailCard product={product} backTo={backTo} />
    </div>
  );
}
