import { useContext } from "react";
import { FilterPanelContext } from "@/context/filterPanelContext";

export default function useFilterPanel() {
  const context = useContext(FilterPanelContext);
  if (!context) {
    throw new Error("useFilterPanel must be used within FilterPanelProvider");
  }
  return context;
}
