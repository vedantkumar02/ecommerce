import type { PageItem, PaginationProps } from "@/components/pagination/types";

function getPaginationRange(
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

const cellBase =
  "inline-flex size-9 items-center justify-center rounded-md text-sm font-medium transition-colors";

function ChevronLeft() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  );
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = getPaginationRange(currentPage, totalPages);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <nav
      aria-label="Pagination"
      className="mt-8 flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        aria-label="Go to previous page"
        disabled={isFirstPage}
        onClick={() => onPageChange(currentPage - 1)}
        className={`${cellBase} ${
          isFirstPage
            ? "cursor-not-allowed bg-gray-100 text-gray-300"
            : "border border-gray-200 bg-white text-gray-900 hover:bg-gray-50"
        }`}>
        <ChevronLeft />
      </button>

      {pages.map((page, index) =>
        page === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            aria-hidden="true"
            className={`${cellBase} border border-gray-200 bg-white text-gray-500`}>
            ...
          </span>
        ) : (
          <button
            key={page}
            type="button"
            aria-label={`Go to page ${page}`}
            aria-current={page === currentPage ? "page" : undefined}
            onClick={() => onPageChange(page)}
            className={`${cellBase} ${
              page === currentPage
                ? "border border-violet-600 bg-white font-semibold text-violet-600"
                : "border border-gray-200 bg-white text-gray-900 hover:bg-gray-50"
            }`}>
            {page}
          </button>
        ),
      )}

      <button
        type="button"
        aria-label="Go to next page"
        disabled={isLastPage}
        onClick={() => onPageChange(currentPage + 1)}
        className={`${cellBase} ${
          isLastPage
            ? "cursor-not-allowed bg-gray-100 text-gray-300"
            : "border border-gray-200 bg-white text-gray-900 hover:bg-gray-50"
        }`}>
        <ChevronRight />
      </button>
    </nav>
  );
}
