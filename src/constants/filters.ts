import type { SortOption } from "@/hooks/types";

export const SORT_OPTIONS: SortOption[] = [
  { sortBy: "", order: "asc", label: "Recommended" },
  { sortBy: "price", order: "asc", label: "Price: Low to High" },
  { sortBy: "price", order: "desc", label: "Price: High to Low" },
  { sortBy: "title", order: "asc", label: "Title: A to Z" },
  { sortBy: "title", order: "desc", label: "Title: Z to A" },
];
