import { useState } from "react";
import type { ProductImageGalleryProps } from "@/components/product-detail/types";

const imageClassName =
  "mx-auto max-h-96 w-auto max-w-full object-contain transition-opacity duration-300 ease-in-out sm:max-h-[28rem] lg:max-h-[min(36rem,70dvh)]";

export default function ProductImageGallery({
  src,
  alt,
  onLoad,
  onError,
}: ProductImageGalleryProps) {
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const isVisible = loadedSrc === src;

  const markLoaded = () => {
    setLoadedSrc(src);
    onLoad?.();
  };

  const handleRef = (img: HTMLImageElement | null) => {
    if (img?.complete && img.naturalWidth > 0) {
      markLoaded();
    }
  };

  const handleError = () => {
    setLoadedSrc(src);
    onError?.();
  };

  return (
    <div className="flex w-full items-center justify-center">
      <img
        key={src}
        ref={handleRef}
        src={src}
        alt={alt}
        onLoad={markLoaded}
        onError={handleError}
        className={`${imageClassName} ${isVisible ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
