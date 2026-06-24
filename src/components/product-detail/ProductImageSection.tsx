import { useState } from "react";
import ImageGalleryPagination from "@/components/product-detail/ImageGalleryPagination";
import ProductImageGallery from "@/components/product-detail/ProductImageGallery";
import type { ProductImageSectionProps } from "@/components/product-detail/types";

export default function ProductImageSection({
  product,
}: ProductImageSectionProps) {
  const images =
    product.images.length > 0 ? product.images : [product.thumbnail];
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const currentImage = images[activeImageIndex] ?? product.thumbnail;

  return (
    <div className="flex flex-col items-center">
      <ProductImageGallery src={currentImage} alt={product.title} />

      <div className="mt-4">
        <ImageGalleryPagination
          currentPage={activeImageIndex + 1}
          totalPages={images.length}
          onPageChange={(page) => setActiveImageIndex(page - 1)}
        />
      </div>
    </div>
  );
}
