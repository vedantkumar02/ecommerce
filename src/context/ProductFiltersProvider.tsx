import { type ReactNode } from "react";
import { ProductFiltersContext } from "@/context/productFiltersContext";
import useProductFiltersLogic from "@/hooks/useProductFiltersLogic";

export function ProductFiltersProvider({ children }: { children: ReactNode }) {
  const value = useProductFiltersLogic();

  return (
    <ProductFiltersContext.Provider value={value}>
      {children}
    </ProductFiltersContext.Provider>
  );
}
