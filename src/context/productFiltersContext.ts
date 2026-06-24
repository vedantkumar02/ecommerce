import type { ProductFiltersValue } from "@/hooks/types";
import { createContext } from "react";

export const ProductFiltersContext =
  createContext<ProductFiltersValue | null>(null);
