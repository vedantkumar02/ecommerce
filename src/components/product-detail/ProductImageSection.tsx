import { useCallback, useState } from "react";
import PaginationControls from "@/components/pagination/PaginationControls";
import ProductImageGallery from "@/components/product-detail/ProductImageGallery";
import type { ProductImageSectionProps } from "@/components/product-detail/types";

export default function ProductImageSection({
  product,
}: ProductImageSectionProps) {
  const images =
    product.images.length > 0 ? product.images : [product.thumbnail];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [loadedImageUrl, setLoadedImageUrl] = useState<string | null>(null);

  const currentImage = images[activeImageIndex] ?? product.thumbnail;
  const isImageLoaded = loadedImageUrl === currentImage;

  const handleImageReady = useCallback(() => {
    setLoadedImageUrl(currentImage);
  }, [currentImage]);

  return (
    <div className="flex flex-col items-center">
      <ProductImageGallery
        src={currentImage}
        alt={product.title}
        onLoad={handleImageReady}
        onError={handleImageReady}
      />

      {isImageLoaded && (
        <div className="mt-4">
          <PaginationControls
            variant="gallery"
            hideWhenSinglePage
            currentPage={activeImageIndex + 1}
            totalPages={images.length}
            onPageChange={(page) => setActiveImageIndex(page - 1)}
          />
        </div>
      )}
    </div>
  );
}
