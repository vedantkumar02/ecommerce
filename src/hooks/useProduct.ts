import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/services/httpServices";
import { queryKeys } from "@/lib/queryKeys";
import {
  API_MAINTENANCE_MESSAGE,
  isNotFoundError,
} from "@/utils/httpError";
import type { UseProductResult } from "@/hooks/types";

export default function useProduct(id: string | undefined): UseProductResult {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: queryKeys.products.detail(id ?? ""),
    queryFn: () => getProductById(id!),
    enabled: Boolean(id),
  });

  const notFound = Boolean(error && isNotFoundError(error));

  return {
    product: data ?? null,
    loading: isPending,
    error: error && !notFound ? API_MAINTENANCE_MESSAGE : null,
    notFound,
    refetch: () => {
      void refetch();
    },
  };
}
