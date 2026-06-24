import { useMemo } from "react";
import useProducts from "@/hooks/useProducts";
import type { UseProductBrandsResult } from "@/hooks/types";

export default function useProductBrands(): UseProductBrandsResult {
  const { products, loading, error } = useProducts({
    limit: 0,
    skip: 0,
    fetchAll: true,
    select: "brand",
  });

  const brands = useMemo(
    () =>
      [
        ...new Set(
          products.map((product) => product.brand).filter(Boolean),
        ),
      ].sort() as string[],
    [products],
  );

  return { brands, loading, error };
}
