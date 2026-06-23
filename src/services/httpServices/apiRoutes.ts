export const API_ROUTES = {
  products: {
    list: "/products",
    search: "/products/search",
    categories: "/products/categories",
    byCategory: (category: string) => `/products/category/${category}`,
    detail: (id: string | number) => `/products/${id}`,
  },
} as const;
