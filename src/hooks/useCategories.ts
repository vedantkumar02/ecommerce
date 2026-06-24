import { useEffect, useState } from "react";
import { getCategories } from "@/services/httpServices";
import type { CategoriesState, UseCategoriesResult } from "@/hooks/types";

export default function useCategories(): UseCategoriesResult {
  const [state, setState] = useState<CategoriesState>({
    loaded: false,
    categories: [],
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    getCategories()
      .then((data) => {
        if (!cancelled) {
          setState({
            loaded: true,
            categories: data,
            error: null,
          });
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setState({
            loaded: true,
            categories: [],
            error:
              err instanceof Error ? err.message : "Failed to fetch categories",
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    categories: state.categories,
    loading: !state.loaded,
    error: state.error,
  };
}
