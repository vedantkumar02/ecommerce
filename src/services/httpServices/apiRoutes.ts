export type ProductListParams = {
  limit?: number;
  skip?: number;
};

export const API_ROUTES = {
  products: {
    list: "/products",
    categories: "/products/categories",
    byCategory: (category: string) => `/products/category/${category}`,
    detail: (id: string | number) => `/products/${id}`,
  },
} as const;
