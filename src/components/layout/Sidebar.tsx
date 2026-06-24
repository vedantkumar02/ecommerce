import { Outlet } from "react-router-dom";
import FilterSidebar from "@/components/filters/FilterSidebar";
import { useCategories, useFilterPanel, useProductBrands } from "@/hooks";

export default function Sidebar() {
  const { isMobileOpen, isDesktopExpanded, closeMobile } = useFilterPanel();
  const { categories } = useCategories();
  const { brands } = useProductBrands();

  return (
    <div className="flex">
      <FilterSidebar
        categories={categories}
        brands={brands}
        collapsed={!isDesktopExpanded}
        className="hidden lg:block"
      />

      {isMobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            onClick={closeMobile}
            aria-hidden="true"
          />
          <FilterSidebar
            categories={categories}
            brands={brands}
            className="fixed inset-y-0 left-0 z-50 h-full overflow-y-auto lg:hidden"
            showCloseButton
            onClose={closeMobile}
          />
        </>
      )}

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
