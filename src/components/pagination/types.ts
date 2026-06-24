export type PaginationVariant = "listing" | "gallery";

export type PaginationControlsProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  variant?: PaginationVariant;
  ariaLabel?: string;
  className?: string;
  hideWhenSinglePage?: boolean;
};

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export type PageItem = number | "ellipsis";
