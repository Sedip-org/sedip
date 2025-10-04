"use client";

import { usePathname } from "next/navigation";
import Navbar from "./compoents/navbar/navbar";
import Footer from "./compoents/footer/Footer";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideNavbarFooter =
    pathname === "/login" ||
    pathname === "/signin" ||
    pathname === "/resetPassword" ||
    pathname === "/admin" ||
    pathname === "/adminLogin";

  return (
    <>
      {!hideNavbarFooter && <Navbar />}
      <div className="wrapper">{children}</div>
      {!hideNavbarFooter && <Footer />}
    </>
  );
}