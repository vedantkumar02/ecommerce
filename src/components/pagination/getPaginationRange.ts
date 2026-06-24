import type { PageItem } from "@/components/pagination/types";

export function getPaginationRange(
  currentPage: number,
  totalPages: number,
): PageItem[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set<number>();

  pages.add(1);
  pages.add(totalPages);
  pages.add(currentPage);

  if (currentPage > 1) {
    pages.add(currentPage - 1);
  }

  if (currentPage < totalPages) {
    pages.add(currentPage + 1);
  }

  if (currentPage <= 3) {
    pages.add(2);
    pages.add(totalPages - 1);
  }

  if (currentPage >= totalPages - 2) {
    pages.add(totalPages - 1);
    pages.add(2);
  }

  const sorted = [...pages].sort((a, b) => a - b);
  const result: PageItem[] = [];

  for (let index = 0; index < sorted.length; index++) {
    if (index > 0 && sorted[index] - sorted[index - 1] > 1) {
      result.push("ellipsis");
    }
    result.push(sorted[index]);
  }

  return result;
}
