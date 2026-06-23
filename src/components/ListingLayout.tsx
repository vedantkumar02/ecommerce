import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import { FilterPanelProvider } from "@/context/FilterPanelProvider";
import { ProductFiltersProvider } from "@/context/ProductFiltersProvider";

export default function ListingLayout() {
  return (
    <FilterPanelProvider>
      <ProductFiltersProvider>
        <Header />
        <main>
          <Outlet />
        </main>
      </ProductFiltersProvider>
    </FilterPanelProvider>
  );
}
