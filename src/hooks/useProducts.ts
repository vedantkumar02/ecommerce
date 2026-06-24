import { useEffect, useState } from "react";
import {
  getProducts,
  getProductsByCategory,
  searchProducts,
} from "@/services/httpServices";
import type { ProductListParams } from "@/services/httpServices/types";
import type {
  ProductsState,
  UseProductsOptions,
  UseProductsResult,
} from "@/hooks/types";

export default function useProducts({
  limit = 0,
  skip = 0,
  category,
  searchQuery,
  sortBy,
  order,
  select,
  fetchAll = false,
}: UseProductsOptions): UseProductsResult {
  const queryKey = [
    limit,
    skip,
    category ?? "",
    searchQuery ?? "",
    sortBy ?? "",
    order ?? "",
    select ?? "",
    fetchAll,
  ].join("-");

  const [state, setState] = useState<ProductsState>({
    queryKey: "",
    products: [],
    total: 0,
    error: null,
  });

  const loading = state.queryKey !== queryKey;

  useEffect(() => {
    let cancelled = false;

    const params: ProductListParams = fetchAll
      ? { limit: 0 }
      : { limit, skip };

    if (sortBy) {
      params.sortBy = sortBy;
    }
    if (order) {
      params.order = order;
    }
    if (select) {
      params.select = select;
    }

    const fetchProducts = () => {
      if (searchQuery) {
        return searchProducts({ q: searchQuery, ...params });
      }
      if (category) {
        return getProductsByCategory(category, params);
      }
      return getProducts(params);
    };

    fetchProducts()
      .then((data) => {
        if (!cancelled) {
          setState({
            queryKey,
            products: data.products,
            total: data.total,
            error: null,
          });
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setState({
            queryKey,
            products: [],
            total: 0,
            error:
              err instanceof Error ? err.message : "Failed to fetch products",
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [
    queryKey,
    limit,
    skip,
    category,
    searchQuery,
    sortBy,
    order,
    select,
    fetchAll,
  ]);

  return {
    products: state.products,
    total: state.total,
    loading,
    error: state.queryKey === queryKey ? state.error : null,
  };
}
