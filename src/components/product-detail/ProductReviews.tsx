import ReviewItem from "@/components/product-detail/ReviewItem";
import type { ProductReviewsProps } from "@/components/product-detail/types";

export default function ProductReviews({ reviews }: ProductReviewsProps) {
  if (reviews.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="mb-4 text-base font-semibold text-gray-900">Reviews</h2>
      <div className="space-y-6">
        {reviews.map((review, index) => (
          <ReviewItem
            key={`${review.reviewerEmail}-${index}`}
            review={review}
          />
        ))}
      </div>
    </section>
  );
}
