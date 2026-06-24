import type { ProductMetaProps } from "@/components/product-detail/types";

export default function ProductMeta({ brand, category }: ProductMetaProps) {
  return (
    <dl className="mb-6 space-y-1 border-b border-gray-200 pb-6 text-sm text-gray-600">
      <div>Brand: {brand}</div>
      <div>
        Category:{" "}
        <span className="capitalize">{category.replace(/-/g, " ")}</span>
      </div>
    </dl>
  );
}
