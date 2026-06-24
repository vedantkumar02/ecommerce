import { useQuery } from "@tanstack/react-query";
import { fetchProductList } from "@/services/httpServices/fetchProductList";
import { queryKeys } from "@/lib/queryKeys";
import { API_MAINTENANCE_MESSAGE } from "@/utils/httpError";
import type {
  UseProductsOptions,
  UseProductsResult,
} from "@/hooks/types";

export default function useProducts(
  options: UseProductsOptions,
): UseProductsResult {
  const { data, isFetching, error, refetch, isPending } = useQuery({
    queryKey: queryKeys.products.list(options),
    queryFn: ({ signal }) => fetchProductList(options, signal),
    placeholderData: (previousData) => previousData,
  });

  return {
    products: data?.products ?? [],
    total: data?.total ?? 0,
    loading: isPending || (isFetching && !data),
    error: error ? API_MAINTENANCE_MESSAGE : null,
    refetch: () => {
      void refetch();
    },
  };
}
