import { createContext } from "react";
import type { FilterPanelContextValue } from "@/context/types";

export const FilterPanelContext =
  createContext<FilterPanelContextValue | null>(null);
