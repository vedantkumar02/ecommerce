import { useMemo } from "react";
import useProducts from "@/hooks/useProducts";
import type {
  UseProductBrandsOptions,
  UseProductBrandsResult,
} from "@/hooks/types";

export default function useProductBrands({
  categories = [],
}: UseProductBrandsOptions = {}): UseProductBrandsResult {
  const categoryCount = categories.length;

  const { products, loading, error } = useProducts({
    limit: 0,
    skip: 0,
    fetchAll: true,
    category: categoryCount === 1 ? categories[0] : undefined,
    select: categoryCount > 1 ? "brand,category" : "brand",
  });

  const brands = useMemo(() => {
    const source =
      categoryCount > 1
        ? products.filter((product) => categories.includes(product.category))
        : products;

    return [
      ...new Set(source.map((product) => product.brand).filter(Boolean)),
    ].sort() as string[];
  }, [products, categoryCount, categories]);

  return { brands, loading, error };
}
