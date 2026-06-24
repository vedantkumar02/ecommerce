import { Link } from "react-router-dom";
import Icon from "@/components/ui/Icon";
import type { BackButtonProps } from "@/components/product-detail/types";

export default function BackButton({ to }: BackButtonProps) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
      <Icon name="chevronLeft" />
      Back
    </Link>
  );
}
