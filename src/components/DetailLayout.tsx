import { Outlet } from "react-router-dom";
import Header from "@/components/Header";

export default function DetailLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}
