import type { ImageGalleryPaginationProps } from "@/components/product-detail/types";

const cellBase =
  "inline-flex items-center justify-center rounded-md border text-xs font-medium transition-colors sm:text-sm";

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

export default function ImageGalleryPagination({
  currentPage,
  totalPages,
  onPageChange,
}: ImageGalleryPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <nav
      aria-label="Product image pagination"
      className="flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        aria-label="Go to previous image"
        disabled={isFirstPage}
        onClick={() => onPageChange(currentPage - 1)}
        className={`${cellBase} gap-1 px-2 py-1 sm:px-3 sm:py-1.5 ${
          isFirstPage
            ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-300"
            : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50"
        }`}>
        <ChevronLeft />
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <button
            key={page}
            type="button"
            aria-label={`Go to image ${page}`}
            aria-current={page === currentPage ? "page" : undefined}
            onClick={() => onPageChange(page)}
            className={`${cellBase} size-8 sm:size-9 ${
              page === currentPage
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50"
            }`}>
            {page}
          </button>
        ),
      )}

      <button
        type="button"
        aria-label="Go to next image"
        disabled={isLastPage}
        onClick={() => onPageChange(currentPage + 1)}
        className={`${cellBase} gap-1 px-2 py-1 sm:px-3 sm:py-1.5 ${
          isLastPage
            ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-300"
            : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50"
        }`}>
        Next
        <ChevronRight />
      </button>
    </nav>
  );
}
