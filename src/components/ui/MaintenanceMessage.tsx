import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { API_MAINTENANCE_MESSAGE } from "@/utils/httpError";

type MaintenanceMessageProps = {
  onRetry?: () => void;
  className?: string;
  compact?: boolean;
};

export default function MaintenanceMessage({
  onRetry,
  className = "",
  compact = false,
}: MaintenanceMessageProps) {
  return (
    <div
      role="status"
      className={`flex w-full flex-col items-center rounded-lg border border-gray-200 bg-gray-50 text-center ${
        compact ? "p-4" : "max-w-lg px-6 py-10"
      } ${className}`}>
      <Icon
        name="clock"
        className={compact ? "h-8 w-8 text-gray-400" : "h-10 w-10 text-gray-400"}
      />
      <p
        className={`mt-3 font-medium text-gray-900 ${
          compact ? "text-sm" : "text-base"
        }`}>
        {API_MAINTENANCE_MESSAGE}
      </p>
      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          className="mt-4"
          onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
