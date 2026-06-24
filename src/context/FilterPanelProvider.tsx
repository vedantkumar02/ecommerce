import { useCallback, useMemo, useState, type ReactNode } from "react";
import { FilterPanelContext } from "@/context/filterPanelContext";

export function FilterPanelProvider({ children }: { children: ReactNode }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktopExpanded, setIsDesktopExpanded] = useState(true);

  const closeMobile = useCallback(() => setIsMobileOpen(false), []);

  const toggleFilters = useCallback(() => {
    if (window.matchMedia("(min-width: 1024px)").matches) {
      setIsDesktopExpanded((prev) => !prev);
    } else {
      setIsMobileOpen((prev) => !prev);
    }
  }, []);

  const value = useMemo(
    () => ({
      isMobileOpen,
      isDesktopExpanded,
      closeMobile,
      toggleFilters,
    }),
    [isMobileOpen, isDesktopExpanded, closeMobile, toggleFilters],
  );

  return (
    <FilterPanelContext.Provider value={value}>
      {children}
    </FilterPanelContext.Provider>
  );
}
