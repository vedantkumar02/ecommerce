import Skeleton from "@/components/ui/Skeleton";

export default function ProductCardSkeleton() {
  return (
    <div className="block rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex h-40 items-center justify-center">
        <Skeleton className="max-h-full max-w-full object-contain size-36" />
      </div>
      <h3 className="mb-2 font-semibold text-gray-900">
        <Skeleton className="block h-6 w-4/5" />
      </h3>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Skeleton className="h-7 w-14" />
        <div className="flex items-center gap-1">
          <div className="flex">
            {Array.from({ length: 5 }, (_, index) => (
              <Skeleton key={index} className="h-4 w-4" />
            ))}
          </div>
          <Skeleton className="h-5 w-9" />
        </div>
      </div>
    </div>
  );
}
