import { createBrowserRouter } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import Layout from "@/components/layout/Layout";
import { FilterPanelProvider } from "@/context/FilterPanelProvider";
import { ProductFiltersProvider } from "@/context/ProductFiltersProvider";
import Home from "@/pages/Home";
import ProductDetailPage from "@/pages/ProductDetailPage";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        element: (
          <FilterPanelProvider>
            <ProductFiltersProvider>
              <Layout />
            </ProductFiltersProvider>
          </FilterPanelProvider>
        ),
        children: [
          {
            element: <Sidebar />,
            children: [{ index: true, element: <Home /> }],
          },
        ],
      },
      {
        element: <Layout />,
        children: [{ path: "product/:id", element: <ProductDetailPage /> }],
      },
    ],
  },
]);
