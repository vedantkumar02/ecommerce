import { type ReactNode } from "react";
import { ProductFiltersContext } from "@/context/productFiltersContext";
import useProductFiltersState from "@/hooks/useProductFiltersState";

export function ProductFiltersProvider({ children }: { children: ReactNode }) {
  const value = useProductFiltersState();

  return (
    <ProductFiltersContext.Provider value={value}>
      {children}
    </ProductFiltersContext.Provider>
  );
}
