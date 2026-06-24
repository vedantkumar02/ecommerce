export type FilterPanelContextValue = {
  isMobileOpen: boolean;
  isDesktopExpanded: boolean;
  closeMobile: () => void;
  toggleFilters: () => void;
};
