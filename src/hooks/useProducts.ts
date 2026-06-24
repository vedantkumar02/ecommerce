import axios from "axios";
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

function isAbortError(err: unknown): boolean {
  return (
    axios.isCancel(err) ||
    (err instanceof Error && err.name === "CanceledError") ||
    (typeof err === "object" &&
      err !== null &&
      "code" in err &&
      err.code === "ERR_CANCELED")
  );
}

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
    const controller = new AbortController();

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

    const requestOptions = { signal: controller.signal };

    const fetchProducts = () => {
      if (searchQuery) {
        return searchProducts({ q: searchQuery, ...params }, requestOptions);
      }
      if (category) {
        return getProductsByCategory(category, params, requestOptions);
      }
      return getProducts(params, requestOptions);
    };

    fetchProducts()
      .then((data) => {
        if (!controller.signal.aborted) {
          setState({
            queryKey,
            products: data.products,
            total: data.total,
            error: null,
          });
        }
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted || isAbortError(err)) {
          return;
        }

        setState({
          queryKey,
          products: [],
          total: 0,
          error:
            err instanceof Error ? err.message : "Failed to fetch products",
        });
      });

    return () => {
      controller.abort();
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
