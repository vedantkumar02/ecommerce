import { isRouteErrorResponse, Link, Navigate, useRouteError } from "react-router-dom";
import MaintenanceMessage from "@/components/ui/MaintenanceMessage";
import Button from "@/components/ui/Button";

const pageShell =
  "flex min-h-[calc(100dvh-60px)] flex-col items-center justify-center bg-gray-50 px-4 py-6";

export default function RouteErrorFallback() {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={pageShell}>
      <MaintenanceMessage onRetry={() => window.location.reload()} />
      <Link to="/" className="mt-4">
        <Button variant="outline">Back to home</Button>
      </Link>
    </div>
  );
}
