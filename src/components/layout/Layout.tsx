import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/layout/Header";

type LayoutProps = {
  children?: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header />
      <main>{children ?? <Outlet />}</main>
    </div>
  );
}
