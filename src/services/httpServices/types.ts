export type SortOrder = "asc" | "desc";

export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  brand: string;
  thumbnail: string;
  images: string[];
};

export type ProductListResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export type Category = {
  slug: string;
  name: string;
  url: string;
};

export type ProductListParams = {
  limit?: number;
  skip?: number;
  sortBy?: string;
  order?: SortOrder;
  select?: string;
};

export type ProductSearchParams = ProductListParams & { q: string };
