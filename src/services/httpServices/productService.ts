import type { Category, Product, ProductListResponse } from "@/types/product";
import { API_ROUTES, type ProductListParams } from "@/services/httpServices/apiRoutes";
import httpClient from "@/services/httpServices/httpClient";

async function request<T>(url: string, params?: ProductListParams) {
  const { data } = await httpClient.get(url, params ? { params } : undefined);
  return data as T;
}

export function getProducts(params?: ProductListParams) {
  return request<ProductListResponse>(API_ROUTES.products.list, params);
}

export function getCategories() {
  return request<Category[]>(API_ROUTES.products.categories);
}

export function getProductsByCategory(
  category: string,
  params?: ProductListParams,
) {
  return request<ProductListResponse>(
    API_ROUTES.products.byCategory(category),
    params,
  );
}

export function getProductById(id: string | number) {
  return request<Product>(API_ROUTES.products.detail(id));
}
