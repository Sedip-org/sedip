"use client"; // əgər layout-un client component olmasını istəyirsənsə

import "./global.css";
import Navbar from "./compoents/navbar/navbar";
import { Manrope } from "next/font/google";
import LayoutClient from "../app/LayoutClient";
import Footer from "./compoents/footer/Footer";
import { usePathname } from "next/navigation";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hideNavbarFooter =
    pathname === "/login" ||
    pathname === "/signin" ||
    pathname === "/resetPassword";

  return (
    <html lang="en">
      <body className={`container ${manrope.className}`}>
        <LayoutClient>
          {!hideNavbarFooter && <Navbar />}
          <div className="wrapper">{children}</div>
          {!hideNavbarFooter && <Footer />}
        </LayoutClient>
      </body>
    </html>
  );
}
