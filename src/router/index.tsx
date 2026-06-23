import { createBrowserRouter } from "react-router-dom";
import Layout from "@/components/Layout";
import ProductListingPage from "@/pages/ProductListingPage";
import ProductDetailPage from "@/pages/ProductDetailPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <ProductListingPage /> },
      { path: "product/:id", element: <ProductDetailPage /> },
      { path: "*", element: <ProductListingPage /> },
    ],
  },
]);
