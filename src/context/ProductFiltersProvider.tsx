import { ProductFiltersContext } from "@/context/productFiltersContext";
import type { ProviderProps } from "@/context/types";
import useProductFiltersLogic from "@/hooks/useProductFiltersLogic";

export function ProductFiltersProvider({ children }: ProviderProps) {
  const value = useProductFiltersLogic();

  return (
    <ProductFiltersContext.Provider value={value}>
      {children}
    </ProductFiltersContext.Provider>
  );
}
