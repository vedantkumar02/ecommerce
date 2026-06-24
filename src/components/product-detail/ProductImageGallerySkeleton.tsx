import Skeleton from "@/components/ui/Skeleton";

export default function ProductImageGallerySkeleton() {
  return (
    <div className="flex w-full items-center justify-center">
      <Skeleton className="mx-auto aspect-square h-96 w-auto max-w-full object-contain sm:h-112 lg:h-[min(36rem,70dvh)] lg:max-h-[min(36rem,70dvh)]" />
    </div>
  );
}
