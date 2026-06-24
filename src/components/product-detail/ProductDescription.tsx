import type { ProductDescriptionProps } from "@/components/product-detail/types";

export default function ProductDescription({
  description,
}: ProductDescriptionProps) {
  return (
    <section className="mb-6 border-b border-gray-200 pb-6">
      <h2 className="mb-3 text-base font-semibold text-gray-900">
        Description
      </h2>
      <p className="leading-relaxed text-gray-600">{description}</p>
    </section>
  );
}
