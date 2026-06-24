import type { UseProductsOptions } from "@/hooks/types";

export const queryKeys = {
  categories: {
    all: ["categories"] as const,
  },
  products: {
    all: ["products"] as const,
    list: (options: UseProductsOptions) =>
      [...queryKeys.products.all, "list", options] as const,
    detail: (id: string | number) =>
      [...queryKeys.products.all, "detail", id] as const,
  },
};
