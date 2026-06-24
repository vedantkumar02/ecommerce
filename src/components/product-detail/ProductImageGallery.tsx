import type { ProductImageGalleryProps } from "@/components/product-detail/types";

export default function ProductImageGallery({
  src,
  alt,
}: ProductImageGalleryProps) {
  return (
    <div className="flex w-full items-center justify-center">
      <img
        src={src}
        alt={alt}
        className="mx-auto max-h-96 w-auto max-w-full object-contain sm:max-h-[28rem] lg:max-h-[min(36rem,70dvh)]"
      />
    </div>
  );
}
