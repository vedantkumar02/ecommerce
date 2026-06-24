import {
  getProducts,
  getProductsByCategory,
  searchProducts,
} from "@/services/httpServices";
import type { ProductListParams } from "@/services/httpServices/types";
import type { UseProductsOptions } from "@/hooks/types";

export async function fetchProductList(
  {
    limit = 0,
    skip = 0,
    category,
    searchQuery,
    sortBy,
    order,
    select,
    fetchAll = false,
  }: UseProductsOptions,
  signal?: AbortSignal,
) {
  const params: ProductListParams = fetchAll ? { limit: 0 } : { limit, skip };

  if (sortBy) {
    params.sortBy = sortBy;
  }
  if (order) {
    params.order = order;
  }
  if (select) {
    params.select = select;
  }

  const requestOptions = { signal };

  if (searchQuery) {
    return searchProducts({ q: searchQuery, ...params }, requestOptions);
  }
  if (category) {
    return getProductsByCategory(category, params, requestOptions);
  }
  return getProducts(params, requestOptions);
}
