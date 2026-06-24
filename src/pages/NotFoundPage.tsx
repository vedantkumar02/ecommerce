import { Link } from "react-router-dom";
import EmptyState from "@/components/ui/EmptyState";

type NotFoundPageProps = {
  title?: string;
  description?: string;
};

const pageShell =
  "flex min-h-[calc(100dvh-60px)] flex-col items-center justify-center bg-gray-50 px-4 py-6";

export default function NotFoundPage({
  title = "Page not found",
  description = "The page you are looking for does not exist or may have been moved.",
}: NotFoundPageProps) {
  return (
    <div className={pageShell}>
      <EmptyState title={title} description={description}>
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
          Back to home
        </Link>
      </EmptyState>
    </div>
  );
}
