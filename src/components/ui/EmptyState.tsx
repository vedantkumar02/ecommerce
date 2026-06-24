import NoProductsIllustration from "@/components/ui/illustrations/NoProductsIllustration";
import type { EmptyStateProps } from "@/components/ui/types";

export default function EmptyState({
  title,
  description,
  children,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <NoProductsIllustration />
      <h2 className="mt-6 text-lg font-medium text-gray-900">{title}</h2>
      {description && (
        <p className="mt-2 max-w-sm text-sm text-gray-500">{description}</p>
      )}
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
}
