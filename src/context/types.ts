import type { ReactNode } from "react";

export type ProviderProps = {
  children: ReactNode;
};

export type FilterPanelContextValue = {
  isMobileOpen: boolean;
  isDesktopExpanded: boolean;
  closeMobile: () => void;
  toggleFilters: () => void;
};
