import StarRating from "@/components/product/StarRating";
import type { ReviewItemProps } from "@/components/product-detail/types";

export default function ReviewItem({ review }: ReviewItemProps) {
  return (
    <article className="space-y-2">
      <h3 className="font-semibold text-gray-900">{review.reviewerName}</h3>
      <StarRating rating={review.rating} />
      <p className="leading-relaxed text-gray-600">{review.comment}</p>
    </article>
  );
}
