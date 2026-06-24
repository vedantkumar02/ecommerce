import { createBrowserRouter } from "react-router-dom";
import Layout from "@/components/Layout";
import ListingLayout from "@/components/ListingLayout";
import DetailLayout from "@/components/DetailLayout";
import ProductListingPage from "@/pages/ProductListingPage";
import ProductDetailPage from "@/pages/ProductDetailPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        element: <ListingLayout />,
        children: [
          { index: true, element: <ProductListingPage /> },
          { path: "*", element: <ProductListingPage /> },
        ],
      },
      {
        element: <DetailLayout />,
        children: [{ path: "product/:id", element: <ProductDetailPage /> }],
      },
    ],
  },
]);
