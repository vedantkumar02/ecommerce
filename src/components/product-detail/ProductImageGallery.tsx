import { useEffect, useRef } from "react";
import type { ProductImageGalleryProps } from "@/components/product-detail/types";

export default function ProductImageGallery({
  src,
  alt,
  onLoad,
  onError,
}: ProductImageGalleryProps) {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete) {
      onLoad?.();
    }
  }, [src, onLoad]);

  return (
    <div className="flex w-full items-center justify-center">
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        onLoad={onLoad}
        onError={onError}
        className="mx-auto max-h-96 w-auto max-w-full object-contain sm:max-h-[28rem] lg:max-h-[min(36rem,70dvh)]"
      />
    </div>
  );
}
