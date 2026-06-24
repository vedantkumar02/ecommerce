import Skeleton from "@/components/ui/Skeleton";

type StarRatingSkeletonProps = {
  size?: "sm" | "md";
};

function StarRatingSkeleton({ size = "sm" }: StarRatingSkeletonProps) {
  const starSize = size === "md" ? "h-5 w-5" : "h-4 w-4";

  return (
    <div className="flex items-center gap-1" aria-hidden="true">
      <div className="flex">
        {Array.from({ length: 5 }, (_, index) => (
          <Skeleton key={index} className={starSize} />
        ))}
      </div>
      <Skeleton className="h-5 w-10" />
    </div>
  );
}

function ReviewItemSkeleton({ commentWidth }: { commentWidth: string }) {
  return (
    <article className="space-y-2" aria-hidden="true">
      <h3 className="font-semibold text-gray-900">
        <Skeleton className="inline-block h-5 w-28" />
      </h3>
      <StarRatingSkeleton />
      <Skeleton className={`h-5 ${commentWidth}`} />
    </article>
  );
}

export default function ProductDetailsSectionSkeleton() {
  return (
    <div className="min-w-0">
      <header className="mb-4 lg:mb-3">
        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          <Skeleton className="block h-8 w-4/5" />
        </h1>
        <div className="flex flex-wrap items-center gap-2">
          <Skeleton className="h-7 w-20" />
          <StarRatingSkeleton size="md" />
        </div>
      </header>

      <dl className="mb-6 space-y-1 border-b border-gray-200 pb-6 text-sm text-gray-600">
        <div>
          <Skeleton className="inline-block h-5 w-36" />
        </div>
        <div>
          <Skeleton className="inline-block h-5 w-32" />
        </div>
      </dl>

      <section className="mb-6 border-b border-gray-200 pb-6">
        <h2 className="mb-3 text-base font-semibold text-gray-900">
          Description
        </h2>
        <div className="space-y-2 leading-relaxed">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-base font-semibold text-gray-900">Reviews</h2>
        <div className="space-y-6">
          <ReviewItemSkeleton commentWidth="w-44" />
          <ReviewItemSkeleton commentWidth="w-52" />
          <ReviewItemSkeleton commentWidth="w-40" />
        </div>
      </section>
    </div>
  );
}
