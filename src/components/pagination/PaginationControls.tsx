import Icon from "@/components/ui/Icon";
import { getPaginationRange } from "@/components/pagination/getPaginationRange";
import type { PaginationControlsProps } from "@/components/pagination/types";

const listingCellBase =
  "inline-flex size-9 items-center justify-center rounded-md text-sm font-medium transition-colors";

const galleryCellBase =
  "inline-flex items-center justify-center rounded-md border text-xs font-medium transition-colors sm:text-sm";

function listingNavClass(disabled: boolean) {
  return `${listingCellBase} ${
    disabled
      ? "cursor-not-allowed bg-gray-100 text-gray-300"
      : "border border-gray-200 bg-white text-gray-900 hover:bg-gray-50"
  }`;
}

function galleryNavClass(disabled: boolean, withLabel = false) {
  return `${galleryCellBase} ${withLabel ? "gap-1 px-2 py-1 sm:px-3 sm:py-1.5" : "size-8 sm:size-9"} ${
    disabled
      ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-300"
      : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50"
  }`;
}

function ListingPagination({
  currentPage,
  totalPages,
  onPageChange,
  ariaLabel,
  className,
}: PaginationControlsProps) {
  const pages = getPaginationRange(currentPage, totalPages);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <nav
      aria-label={ariaLabel ?? "Pagination"}
      className={`flex flex-wrap items-center justify-center gap-2 ${className ?? ""}`}>
      <button
        type="button"
        aria-label="Go to previous page"
        disabled={isFirstPage}
        onClick={() => onPageChange(currentPage - 1)}
        className={listingNavClass(isFirstPage)}>
        <Icon name="chevronLeft" />
      </button>

      {pages.map((page, index) =>
        page === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            aria-hidden="true"
            className={`${listingCellBase} border border-gray-200 bg-white text-gray-500`}>
            ...
          </span>
        ) : (
          <button
            key={page}
            type="button"
            aria-label={`Go to page ${page}`}
            aria-current={page === currentPage ? "page" : undefined}
            onClick={() => onPageChange(page)}
            className={`${listingCellBase} ${
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
        className={listingNavClass(isLastPage)}>
        <Icon name="chevronRight" />
      </button>
    </nav>
  );
}

function GalleryPagination({
  currentPage,
  totalPages,
  onPageChange,
  ariaLabel,
  className,
}: PaginationControlsProps) {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <nav
      aria-label={ariaLabel ?? "Product image pagination"}
      className={`flex flex-wrap items-center justify-center gap-2 ${className ?? ""}`}>
      <button
        type="button"
        aria-label="Go to previous image"
        disabled={isFirstPage}
        onClick={() => onPageChange(currentPage - 1)}
        className={galleryNavClass(isFirstPage, true)}>
        <Icon name="chevronLeft" />
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
            className={`${galleryNavClass(false)} ${
              page === currentPage
                ? "border-blue-600 bg-blue-600 text-white"
                : ""
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
        className={galleryNavClass(isLastPage, true)}>
        Next
        <Icon name="chevronRight" />
      </button>
    </nav>
  );
}

export default function PaginationControls({
  variant = "listing",
  hideWhenSinglePage = false,
  totalPages,
  ...props
}: PaginationControlsProps) {
  if (hideWhenSinglePage && totalPages <= 1) {
    return null;
  }

  if (variant === "gallery") {
    return <GalleryPagination totalPages={totalPages} {...props} />;
  }

  return <ListingPagination totalPages={totalPages} {...props} />;
}
