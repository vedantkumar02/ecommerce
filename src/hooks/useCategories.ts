import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/httpServices";
import { queryKeys } from "@/lib/queryKeys";
import { API_MAINTENANCE_MESSAGE } from "@/utils/httpError";
import type { UseCategoriesResult } from "@/hooks/types";

export default function useCategories(): UseCategoriesResult {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: queryKeys.categories.all,
    queryFn: () => getCategories(),
    staleTime: 5 * 60_000,
  });

  return {
    categories: data ?? [],
    loading: isPending,
    error: error ? API_MAINTENANCE_MESSAGE : null,
    refetch: () => {
      void refetch();
    },
  };
}
