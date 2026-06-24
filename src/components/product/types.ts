import type { Product } from "@/services/httpServices/types";

export type ProductCardProps = {
  product: Product;
};

export type ProductGridProps = {
  products: Product[];
};

export type StarRatingProps = {
  rating: number;
  size?: "sm" | "md";
};
