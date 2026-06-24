import type {
  Category,
  Product,
  ProductListParams,
  ProductListResponse,
  ProductSearchParams,
} from "@/services/httpServices/types";
import { API_ROUTES } from "@/services/httpServices/apiRoutes";
import httpClient from "@/services/httpServices/httpClient";

type RequestOptions = {
  signal?: AbortSignal;
};

async function request<T>(
  url: string,
  params?: ProductListParams | ProductSearchParams,
  options?: RequestOptions,
) {
  const { data } = await httpClient.get(url, {
    params,
    signal: options?.signal,
  });
  return data as T;
}

export function getProducts(
  params?: ProductListParams,
  options?: RequestOptions,
) {
  return request<ProductListResponse>(API_ROUTES.products.list, params, options);
}

export function searchProducts(
  params: ProductSearchParams,
  options?: RequestOptions,
) {
  return request<ProductListResponse>(
    API_ROUTES.products.search,
    params,
    options,
  );
}

export function getCategories() {
  return request<Category[]>(API_ROUTES.products.categories);
}

export function getProductsByCategory(
  category: string,
  params?: ProductListParams,
  options?: RequestOptions,
) {
  return request<ProductListResponse>(
    API_ROUTES.products.byCategory(category),
    params,
    options,
  );
}

export function getProductById(id: string | number) {
  return request<Product>(API_ROUTES.products.detail(id));
}
