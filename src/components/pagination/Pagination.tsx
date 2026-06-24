import PaginationControls from "@/components/pagination/PaginationControls";
import type { PaginationProps } from "@/components/pagination/types";

export default function Pagination(props: PaginationProps) {
  return (
    <PaginationControls
      {...props}
      variant="listing"
      className="mt-8"
    />
  );
}
