import { useContext } from "react";
import { ProductFiltersContext } from "@/context/productFiltersContext";

export default function useProductFilters() {
  const context = useContext(ProductFiltersContext);
  if (!context) {
    throw new Error(
      "useProductFilters must be used within ProductFiltersProvider",
    );
  }
  return context;
}
