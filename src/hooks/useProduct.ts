import { useEffect, useState } from "react";
import { getProductById } from "@/services/httpServices";
import type { ProductState, UseProductResult } from "@/hooks/types";

export default function useProduct(id: string | undefined): UseProductResult {
  const [state, setState] = useState<ProductState>({
    id: "",
    product: null,
    error: null,
  });

  const loading = Boolean(id) && state.id !== id;

  useEffect(() => {
    if (!id) {
      return;
    }

    let cancelled = false;

    getProductById(id)
      .then((data) => {
        if (!cancelled) {
          setState({ id, product: data, error: null });
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setState({
            id,
            product: null,
            error:
              err instanceof Error ? err.message : "Failed to fetch product",
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  return {
    product: state.id === id ? state.product : null,
    loading,
    error: state.id === id ? state.error : null,
  };
}
